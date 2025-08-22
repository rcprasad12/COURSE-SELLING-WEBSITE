//const express = require ("express");
//const Router = express.Router;

const {Router } = require ("express");
const userRouter = Router();
const {userModel} = require("../db");
const { z }  = require("zod");
const bcrypt = require("bcrypt");


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


userRouter.post("/signIn" , function (req,res){
    res.json({
        message : "signIn endoint"
    })
})

userRouter.get("/purchases" , function (req,res){
    res.json({
        message : "Purchases endpoint"
    })
})

module.exports = {
    userRouter : userRouter
}