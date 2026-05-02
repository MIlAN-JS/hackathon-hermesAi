import {Router} from "express"
import { chatController, initChatController, sendMessageController } from "../controllers/chat.controller.js"


const chatRouter = Router()


chatRouter.post("/", chatController)

chatRouter.post("/init", initChatController)
chatRouter.post("/message", sendMessageController)

export default chatRouter

