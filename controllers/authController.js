const mongoose=require('mongoose')
const generateHash=require('../utils/generateHash')
const generateToken=require('../utils/generateToken');
const userModel = require('../models/userModel');
const cookieParser=require('cookie-parser')
const bcrypt = require('bcrypt');


const register=async (req,res)=>{
    try {
        let {email,username,password,role, phoneNumber}=req.body;
        let checkUser = await userModel.findOne({ email });
        if (checkUser) {
            throw new Error("A user with this Email already exists");
        }

        let hash=await generateHash(password);
        let contact="+91"+phoneNumber

        let createdUser=await userModel.create({
            email,
            password:hash,
            username,
            phoneNumber:contact,
            role
        })
        let token= generateToken(email,createdUser._id)

        res.cookie("token",token)
        let user = { email, username, phoneNumber:contact, role }

        res.status(200).json({
            message:"User Created Successfully",
            user,
            success:true,
        })
    } catch (err) {
        res.status(400).json({
            message:"Failed to register user",
            reason:err.message,
            success:false
        })
    }
}


const login=async (req,res)=>{
    try {
        let {email, password}=req.body;
        let checkUser=await userModel.findOne({
            email
        })
        if(!checkUser)
            throw new Error("Check you Email or Password")

        let isMatch = await bcrypt.compare(password, checkUser.password);
        if (!isMatch)
            throw new Error("Check your Email or Password");

        
        let token=generateToken(email,checkUser._id)
        let user={email, userName:checkUser.username, phoneNumber:checkUser.phoneNumber, role:checkUser.role}

        res.cookie("token",token)
        res.status(200).json({
            message:"Login Successfull",
            success:true,
            user,
            token
        })
    } catch (error) {
        res.status(400).json({
            message:"Failed to Login",
            reason:error.message
        })
    }
}


const logout=async (req,res)=>{
    try{
        let token =req.cookies.token
        if(!token)
            throw new Error("Something went wrong")
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });

        res.status(200).json({
            message:"logout Successfull",
            success:true
        })
    }
    catch(err){
        res.status(400).json({
            message:"Failed to logout",
            reason:err.message,
            success:false
        })
    }
}

const deleteUser = async (req, res) => {
  try {
    let { email } = req.body;

    let checkUser = await userModel.findOne({ email });
    if (!checkUser) throw new Error("Cannot find User");

    await userModel.findOneAndDelete({ email });

    res.status(200).json({
      message: "Deletion Successful",
      success: true
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to delete user",
      reason: err.message,
      success: false
    });
  }
};


module.exports={register,login,logout, deleteUser}