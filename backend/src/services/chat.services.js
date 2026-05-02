// services/chat.service.js
import { v4 as uuidv4 } from "uuid"
import botModel from "../models/bot.model.js"
import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js"
import { chatWithAi } from "./langchain.services.js"
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages"

const initChatService = async ({ embedToken }) => {
  const bot = await botModel.findOne({ embedToken })
  if (!bot) throw new Error("Invalid embed token")

  const sessionId = uuidv4()

  const chat = await chatModel.create({
    botId: bot._id,
    businessId: bot.businessId,
    sessionId
  })

  return { sessionId: chat.sessionId }
}

const sendMessageService = async ({ sessionId, message }) => {

  // step 1 - find chat by sessionId
  const chat = await chatModel.findOne({ sessionId })
  if (!chat) throw new Error("Chat not found")

  // step 2 - fetch bot to get systemPrompt
  const bot = await botModel.findById(chat.botId)
  if (!bot) throw new Error("Bot not found")

  // step 3 - save user message
  await messageModel.create({
    chatId: chat._id,
    role: "human",
    content: message
  })

  // step 4 - fetch message history
  const history = await messageModel
    .find({ chatId: chat._id })
    .sort({ createdAt: 1 })

  // step 5 - format for AI
  const formattedMessages = [
    new SystemMessage(bot.systemPrompt),  // ← personality of the bot
    ...history.map((msg) =>
      msg.role === "human"
        ? new HumanMessage(msg.content)
        : new AIMessage(msg.content)
    )
  ]

  // step 6 - call AI
  const aiResponse = await chatWithAi(formattedMessages)

  // step 7 - save AI response
  await messageModel.create({
    chatId: chat._id,
    role: "ai",
    content: aiResponse
  })

  // step 8 - return response
  return { aiResponse }
}

export { initChatService, sendMessageService }