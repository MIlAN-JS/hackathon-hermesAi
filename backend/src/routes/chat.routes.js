import {Router} from "express"
import { chatController, initSessionController } from "../controllers/chat.controller.js"


const chatRouter = Router()


chatRouter.post("/", chatController)
chatRouter.post("/init", initSessionController)

export default chatRouter

