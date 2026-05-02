import jwt from "jsonwebtoken"
import config from "../config/config.js";
import userModel from "../models/user.model.js";
import generateToken from "../utils/generateToken.utils.js";




// token generation
//  const generateToken = (id) => {
//   try {

//       const token  = jwt.sign({
//         id : id
//     } , config.JWT_SECRET , {
//         expiresIn : config.JWT_EXPIRE
//     })
//     return token
    
//   } catch (error) {
//     console.log(error)
//     return error
//   }
// };

const registerUserService = async({email, password})=>{

const existingUser = await userModel.findOne({ email })
  if (existingUser) {
    throw new Error("Email already registered")
  }

  // create new business
  const user = await userModel.create({ email, password })

  return {
    _id: user._id,
    email: user.email,
    token: generateToken(user._id)
  }



}


export { 
    generateToken, 
    registerUserService
}