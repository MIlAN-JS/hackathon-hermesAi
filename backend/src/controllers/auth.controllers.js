import userModel from "../models/user.model.js"
import { generateToken, registerUserService } from "../services/auth.services.js"




const registerUserController = async(req , res ,next)=>{
    try {

        const {email , password} = req.body
       
        //check if email already exist

       
        const response = await registerUserService({email , password})

        
        res.cookie("token", response.token)
        
        res.status(200).json({
            message : "user created successfully",
            user : {
               id :  response._id,
            email : response.email
            }
        })


        
    } catch (error) {
        console.log(error)
        next(error)
        
    }
}

export {
    registerUserController
}