
import jwt from "jsonwebtoken"
import config from "../config/config.js"

const checkUser = (req ,res, next)=>{
    try {
        const token = req.cookies.token
    if(!token){
        const err = new Error("Not authorized")
        err.statusCode = 401
        throw err
    }

    const decoded = jwt.verify(token , config.JWT_SECRET)
    req.user = decoded
    
    next()
        
    } catch (error) {

        console.log(error)
        next(error)
        
    }
}



export  {
    checkUser
}