const express = require("express");

const app = express();


app.post("/user/signup" , function (req,res){
    res.json({
        message : "signup endoint"
    })
})










app.listen(3000);

