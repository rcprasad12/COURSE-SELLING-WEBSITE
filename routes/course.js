const { Router } = require("express");
const courseRouter = Router();
const { courseModel } = require("../db");



courseRouter.post("/purchase" , function (req,res){
    res.json({
        message : "Course purchase endoint"
    })
})


courseRouter.get("/preview" , function (req,res){
    res.json({
        message : "All the courses endoint"
    })
})

module.exports = {
    courseRouter : courseRouter 
}