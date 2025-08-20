const { Router } = require("express");
const courseRouter = Router();


courseRouter.post("/course/purchase" , function (req,res){
    res.json({
        message : "Course purchase endoint"
    })
})


courseRouter.get("/course/preview" , function (req,res){
    res.json({
        message : "All the courses endoint"
    })
})

module.exports = {
    courseRouter : courseRouter 
}