import userModel from "../models/user.model.js"
import { generateToken } from "../services/auth.services.js"




const registerUserController = async(req , res , next)=>{
    try {

        const {email , password} = req.body
        const id = req.user.id
        console.log(id)
        //check if email already exist

        const user = await userModel.findOne({email})
        if(user){
            const err = new Error("Email already exist")
            err.statusCode = 400
            throw err;
            return
        }


        const newUser = await userModel.create({email , password})

        const token = generateToken(newUser._id);
        res.cookie("token", token)
        
        res.status(200).json({
            message : "user created successfully",
            user : newUser
        })


        
    } catch (error) {
        console.log(error)
        next(error)
        
    }
}

export {
    registerUserController
}