import { createBotService, getBotsService, updateBotService, deleteBotService } from "../services/bot.service.js"


const createBotController = async (req, res) => {
  try {
    const businessId = req.user  // from checkUser middleware
    const { name, systemPrompt, widgetSettings,questions } = req.body

    const bot = await createBotService({ businessId, name, systemPrompt, widgetSettings,questions })

    res.status(201).json({
      success: true,
      bot: bot
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}


const getBotsController = async (req, res) => {
  try {
    const businessId = req.user

    const bots = await getBotsService({ businessId })

    res.status(200).json({
      success: true,
      data: bots
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}


const updateBotController = async (req, res) => {
  try {
    const businessId = req.user
    const botId = req.params.id
    const updates = req.body

    const bot = await updateBotService({ botId, businessId, updates })

    res.status(200).json({
      success: true,
      data: bot
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}


const deleteBotController = async (req, res) => {
  try {
    const businessId = req.user
    const botId = req.params.id

    await deleteBotService({ botId, businessId })

    res.status(200).json({
      success: true,
      message: "Bot deleted successfully"
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

export {
  createBotController,
  getBotsController,
  updateBotController,
  deleteBotController
}