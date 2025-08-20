const express = require("express");

const app = express();


app.post("/user/signup" , function (req,res){
    res.json({
        message : "signup endoint"
    })
})


app.post("/user/signIn" , function (req,res){
    res.json({
        message : "signIn endoint"
    })
})



app.get("/user/purchases" , function (req,res){
    res.json({
        message : "Purchases endpoint"
    })
})

app.post("/course/purchase" , function (req,res){
    res.json({
        message : "Course purchase endoint"
    })
})


app.get("/courses" , function (req,res){
    res.json({
        message : "All the courses endoint"
    })
})







app.listen(3000);

