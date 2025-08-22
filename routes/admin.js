const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");

//bcrypt , zod , jsonwebtoken 
adminRouter.post("/signup" , function (req,res){
    res.json({
        message : "signup endoint"
    })
})


adminRouter.post("/signIn" , function (req,res){
    res.json({
        message : "signIn endoint"
    })
})

adminRouter.post("/course" , function (req,res){
    res.json({
        message : "To create a course"
    })
})

adminRouter.put("/course" , function (req,res){
    res.json({
        message : "To ADD a course"
    })
})


adminRouter.get("/course/bulk" , function(req,res){
    res.json({
        mesaage : "Sifnn endpoint"
    })
})


module.exports = {
    adminRouter : adminRouter
}