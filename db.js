//Skeleton of database of mongo is represented

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Ramesh:u0akvQfq1cyeqpMW@cluster0.rphfeul.mongodb.net/coursera-app");
const Schema   = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({

    email     : {type : String , unique : True} ,
    password  : String , 
    firstName : String , 
    lastName  : String

});



const adminSchema  = new Schema({

    email     : {type : String , unique : True} ,
    password  : String , 
    firstName : String , 
    lastName  : String

});



const courseSchema = new Schema({

    title       : String , 
    description : String ,
    price       : Number ,
    imageURL    : String ,
    creatorID   : ObjectId ,

});



const purchaseSchema = new Schema({
    userId : ObjectId , 
    courseId : ObjectId ,

});





const userModel = mongoose.model("user" , userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course" , courseSchema);
const purchaseModel = mongoose.model("purchase" , purchaseSchema);


model.export = {
     userModel , 
     adminModel , 
     courseModel ,
     purchaseModel,
}

