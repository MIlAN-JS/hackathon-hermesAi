import {Router} from "express"
import  { getCurrentUserController, registerUserController , googleCallbackController, logoutController} from "../controllers/auth.controllers.js"
import { checkUser } from "../middlewares/auth.middleware.js"
import passport from "../config/passport.js"

const authRouter = Router()


authRouter.post("/register" ,  registerUserController)
authRouter.get("/get-user" , checkUser , getCurrentUserController)


// Google OAuth routes
authRouter.get("/google",
    passport.authenticate("google", { scope: [ "profile", "email" ] })
);

authRouter.get('/google/callback',passport.authenticate("google",{
    session: false,
    failureRedirect: '/'
}), googleCallbackController)

authRouter.get('/logout', checkUser , logoutController);

export default authRouter
