import { HumanMessage } from "@langchain/core/messages"
import { chatWithAi } from "../services/langchain.services.js"
import {v4 as uuidv4} from "uuid"
import { initChatService, sendMessageService } from "../services/chat.services.js"

const chatController = async(req , res, next)=>{
    try {

        const {userMessage} = req.body
        const message = [new HumanMessage(userMessage)]
        const response = await chatWithAi(message)
        res.status(200).json({response})
        
    } catch (error) {

        next(error)
        
    }
}

// const initSessionController = (req , res , next)=>{

//     let sessionId = req.cookies.sessionId

//     if(!sessionId){
//         sessionId = uuidv4()
//         res.cookie("sessionId" , sessionId , {
//             httpOnly: true,
//          maxAge: 20 * 24 * 60 * 60 * 1000
//         })
//     }

//     res.status(200).json({
//         success : "true", 
//         "message" : "sessionId successfully created"
//     })
    
// }


// controllers/chat.controller.js


const initChatController = async (req, res) => {
  try {
    const { embedToken } = req.body

    if (!embedToken) {
      return res.status(400).json({
        success: false,
        message: "embedToken is required"
      })
    }

    const data = await initChatService({ embedToken })

    res.status(201).json({
      success: true,
      data  // { sessionId: "uuid-xyz" }
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

const sendMessageController = async (req, res) => {
  try {
    const { sessionId, message } = req.body

    if (!sessionId || !message) {
      return res.status(400).json({
        success: false,
        message: "sessionId and message are required"
      })
    }

    const data = await sendMessageService({ sessionId, message })

    res.status(200).json({
      success: true,
      data  // { aiResponse }
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

export {
    chatController, 
    initChatController, 
    sendMessageController
}