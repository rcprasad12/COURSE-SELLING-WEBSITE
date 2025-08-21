const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter }  = require("./routes/admin");



const app = express();


app.use("/api/vi/user" , userRouter);
app.use("/api/v1/course" , courseRouter);
app.use("/api/v1/admin" ,adminRouter);


app.use(express.json());




app.listen(3000);

