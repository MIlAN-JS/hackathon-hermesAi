import botModel from "../models/bot.model.js";



const createBotService = async ({ businessId, name, systemPrompt, widgetSettings }) => {
  const bot = await botModel.create({
    businessId,
    name,
    systemPrompt,
    widgetSettings
    // embedToken is auto generated in the model
  })
  return bot
}


const getBotsService = async ({ businessId }) => {
  const bots = await botModel.find({ businessId })
  return bots
}


const updateBotService = async ({ botId, businessId, updates }) => {
  // find bot and make sure it belongs to this business
  const bot = await botModel.findOneAndUpdate(
    { _id: botId, businessId },  // ← security check
    updates,
    { new: true }  // ← return updated doc
  )
  if (!bot) throw new Error("Bot not found or unauthorized")
  return bot
}


const deleteBotService = async ({ botId, businessId }) => {
  const bot = await botModel.findOneAndDelete({ _id: botId, businessId })
  if (!bot) throw new Error("Bot not found or unauthorized")
  return bot
}


export {
  createBotService,
  getBotsService,
  updateBotService,
  deleteBotService
}