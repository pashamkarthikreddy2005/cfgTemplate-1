const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    phoneNumber:String,
    role:{
        type:String,
        enum:['USER','ADMIN']
    }
})

module.exports=mongoose.model("User",userSchema)