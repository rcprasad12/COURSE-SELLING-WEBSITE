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

    const { email , password , firstName , lastName } = userSchema.parse(req.body); //todo : Add Zod validation

    //todo : hash the password so plaintext pw is not stored in the db
    const hashedPassword = await bcrypt.hash(password,7);

    const newUser = new userModel({
        email , 
        password : hashedPassword , 
        firstName , 
        lastName 
    });

    await newUser.save();


    res.json({
        message : "signup endoint"
    })
})


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