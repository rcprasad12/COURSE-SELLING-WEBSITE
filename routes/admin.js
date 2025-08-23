const { Router } = require("express");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const { adminModel, courseModel } = require("../db");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { z } = require("zod");
const  bcrypt  = require("bcrypt");
const { adminMiddleware } = require("../middleware/admin");


const userSchema = z.object({

    email    : z.string().email(),
    password : z.string().min(6) ,
    firstName: z.string().min(1),
    lastName : z.string().min(1)
});

//bcrypt , zod , jsonwebtoken 
adminRouter.post("/signup" , async function (req,res){

    try {
    const { email , password , firstName ,  lastName } = userSchema.parse(req.body); //todo : Add Zod validation

    //todo : hash the password so plaintext pw is not stored in the db
    const hashedPassword = await bcrypt.hash(password,10);

    await adminModel.create({      // internally call the save()
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


adminRouter.post("/signin" ,async function (req,res){

    const { email , password } = req.body ;

    const admin = await adminModel.findOne({
        email : email ,
        
    })
        // compare plain password with hashed password in DB
    const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(403).json({ message: "Invalid credentials" });
        }

    if(admin){
        const token = jwt.sign({
            id : admin._id,
            email : admin.email
    },JWT_ADMIN_PASSWORD);

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

adminRouter.post("/course" ,adminMiddleware,  async function (req,res){

    const adminId = req.userId ;

    const { title , description , imageURL , price , courseId } = req.body ;

    const course =  await courseModel.create({
        title : title  , 
        description : description ,
        imageURL : imageURL ,
        price : price  ,
        creatorId : adminId 

    });


    res.json({
        message : "Course created" ,
        creatorId : course._id 
    })
})

adminRouter.put("/course" ,adminMiddleware , async function (req,res){

        await courseModel.updateOne({
            _id : courseId ,   //even if one admin is trying to get access of other admin curse details so in order to prevent it add adminID in it 
            creatorId : adminId ,

        },{
            title : title  , 
            description : description ,
            imageURL : imageURL ,
            price : price
        })


    res.json({
        message : "Course updated" ,
        courseId : course._id 
    })
});


adminRouter.get("/course/bulk",adminMiddleware , async function(req,res){

        const adminID = req.userId ;
       const courses =  await courseModel.find({

            creatorId : adminId 

        });


    res.json({
        message : "Course updated" ,
        courses 
    })

});


module.exports = {
    adminRouter : adminRouter
};