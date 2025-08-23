//const express = require ("express");
//const Router = express.Router;

const {Router } = require ("express");
const userRouter = Router();
const {userModel, purchaseModel, courseModel} = require("../db");
const { z }  = require("zod");
const bcrypt = require("bcrypt");
const jwt    = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middleware/user");



const userSchema = z.object({

    email    : z.string().email(),
    password : z.string().min(6) ,
    firstName: z.string().min(1),
    lastName : z.string().min(1)
})


userRouter.post("/signup" , async function (req,res){

    try {
    const { email , password , firstName , lastName } = userSchema.parse(req.body); //todo : Add Zod validation

    //todo : hash the password so plaintext pw is not stored in the db
    const hashedPassword = await bcrypt.hash(password,10);

    await userModel.create({      // internally call the save()
        email     : email         , 
        password  : hashedPassword , 
        firstName : firstName   , 
        lastName  : lastName
    });

    //await newUser.save();


    res.json({
        message : "signup success"
    })
    }
    catch(e){
        console.error("Error during signup:", e);
        res.status(400).json({
            message : "Error during signup",
            error: e.message
        });
    }

});


userRouter.post("/signIn" , async function (req,res){

    const { email , password } = req.body ;

    const user = await userModel.findOne({
        email : email ,
        password : password 
    })

    if(user){
        const token = jwt.sign({
            id : user._id,
            email : user.email
    },JWT_USER_PASSWORD);

    //if needed Do cookie logic here 


        res.json({
            token : token 
        })
    }else{
        res.status(403).json({
            message : "Invalid credentials"
        })
    }

});

userRouter.get("/purchases" ,userMiddleware,async function (req,res){
    const userId = req.userId ;

   const purchases =  await purchaseModel.find({
        userId : userId,
    
    })


    let purchasesCourseIds = [];

    for(let i = 0 ; i < purchases.length; i++){
        purchasesCourseIds.push(purchases[i].courseId);
    }



    const courseData = await courseModel.find({
        _id : { $in : purchasesCourseIds}
    })

    res.json({
        purchases , 
        courseData
    })
});

module.exports = {
    userRouter : userRouter
}