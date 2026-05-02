import {Router} from "express"
import { chatController, initSessionController } from "../controllers/chat.controller.js"
import { checkUser } from "../middlewares/auth.middleware.js"


const chatRouter = Router()


chatRouter.post("/",checkUser, chatController)
chatRouter.post("/init", initSessionController)

export default chatRouter

