import userModel from "../models/user.model.js"
import {  registerUserService } from "../services/auth.services.js"
// import asyncHandler from "express-async-handler";
import { findOrCreateUser } from "../services/auth.services.js";
import generateToken from "../utils/generateToken.utils.js";




const registerUserController = async(req , res ,next)=>{
    try {

        const {name , email , password} = req.body
          
        const response = await registerUserService({email , password ,name})
 
        res.cookie("token", response.token)
        
        res.status(200).json({
            message : "user created successfully",
            user : {
               id :  response._id,
            email : response.email, 
            name : response.name
            }
        })


        
    } catch (error) {
        console.log(error)
        next(error)
        
    }
}



 const getCurrentUserController = async (req, res) => {
  try {
    const userId= req.user;
    console.log(userId)
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error cannot fetch user" });
  }
};


const logoutController = async(req , res ,next)=>{
    try {

      console.log("logout check")
        
        const userId = req.user

        // check if user exist 
        const user = await userModel.findById(userId)
        if(!user){
            return res.status(400).json({
                message : "Cannot find user", 
                success : false
            })
        }

        // fetch the token 

        const token = req.cookies.token

      res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });


        res.status(200).json({
            message : "logout success", 
            success : true
        })
        


    } catch (error) {
         console.log(error , "logout error ")
        next(error)
       
        
    }
}



 const googleCallbackController = async (req, res, next) => {

  try {

    const userData = req.user;

  if (!userData) {
    return res.redirect("http://localhost:5173/login");
  }

  const user = await findOrCreateUser(userData);

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // 🔥 set true in production (HTTPS)
    sameSite: "lax",
  });

  return res.redirect("http://localhost:5173/dashboard"); // changed from login to your route
    
  } catch (error) {

    console.log(error)
    next(error)
    
  }
};
 const githubCallbackController = async (req, res, next) => {

  try {

    const userData = req.user;

  if (!userData) {
    return res.redirect("http://localhost:5173/login");
  }

  const user = await findOrCreateUser(userData);

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // 🔥 set true in production (HTTPS)
    sameSite: "lax",
  });

  return res.redirect("http://localhost:5173/dashboard"); // changed from login to your route
    
  } catch (error) {

    console.log(error)
    next(error)
    
  }
};

export {
    registerUserController,
    getCurrentUserController, 
    googleCallbackController, 
    logoutController, 
    githubCallbackController
}