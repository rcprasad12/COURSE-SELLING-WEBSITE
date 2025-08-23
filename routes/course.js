const { Router } = require("express");
const courseRouter = Router();
const { courseModel } = require("../db");
const { purchaseModel } = require("../db");



courseRouter.post("/purchase" ,userMiddleware , async function (req,res){

    const userId = req.userId ;
    const courseId = req.body.courseId ;

    await purchaseModel.create({
        userId : userId ,
        courseId : courseId
    })

    res.json({
        message : "u have successfully purchased the course"
    })
})


courseRouter.get("/preview" ,async function (req,res){

    const courses = await courseModel.find({});


    res.json({
        courses
    })
})

module.exports = {
    courseRouter : courseRouter 
}