import { HumanMessage } from "@langchain/core/messages"
import { chatWithAi } from "../services/langchain.services.js"



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

export {
    chatController
}