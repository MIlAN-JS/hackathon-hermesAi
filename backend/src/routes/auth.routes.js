import {Router} from "express"
import  { registerUserController } from "../controllers/auth.controllers.js"
import { checkUser } from "../middlewares/auth.middleware.js"


const authRouter = Router()


authRouter.post("/register",checkUser ,  registerUserController)


export default authRouter
