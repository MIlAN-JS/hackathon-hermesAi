// routes/bot.routes.js
import { Router } from "express"
import { createBotController, getBotsController, updateBotController, deleteBotController } from "../controllers/bot.controller.js"
import { checkUser } from "../middlewares/auth.middleware.js"

const botRouter = Router()

// all bot routes are protected
botRouter.use(checkUser)  // ← applies checkUser to all routes below

botRouter.post("/create", createBotController)
botRouter.get("/get-bot", getBotsController)
botRouter.put("/:id", updateBotController)
botRouter.delete("/:id", deleteBotController)



export default botRouter