const express = require("express");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter }  = require("./routes/admin");

 

const app = express();

app.use(express.json());


app.use("/api/v1/user" , userRouter);
app.use("/api/v1/course" , courseRouter);
app.use("/api/v1/admin" ,adminRouter);

require('dotenv').config();
console.log("Loaded URI:", process.env.MONGO_URI); // Debugging line



async function main() {
        
        try{
        await mongoose.connect(process.env.MONGO_URI);
       
        app.listen(3000 , () =>{
                console.log("Server running on http://localhost:3000");
        });
        }
        catch(error){
                console.log("MongoDB connection error : " , error);
        }
}

main();


