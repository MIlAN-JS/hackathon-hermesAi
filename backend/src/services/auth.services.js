import jwt from "jsonwebtoken"
import config from "../config/config.js";





// token generation
 const generateToken = (id) => {
  try {

      const token  = jwt.sign({
        id : id
    } , config.JWT_SECRET , {
        expiresIn : config.JWT_EXPIRE
    })
    return token
    
  } catch (error) {
    console.log(error)
    return error
  }
};



export { 
    generateToken
}