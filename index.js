const express = require("express");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter }  = require("./routes/admin");

 app.use(express.json());

const app = express();


app.use("/api/v1/user" , userRouter);
app.use("/api/v1/course" , courseRouter);
app.use("/api/v1/admin" ,adminRouter);

require('dotenv').config();
console.log("Loaded URI:", process.env.MONGO_URI); // Debugging line



async function main() {
    
        await mongoose.connect(process.env.MONGO_URI);
       
        app.listen(3000);
}

main();


