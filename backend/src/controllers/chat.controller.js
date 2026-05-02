
import { getAiResponseService } from "../services/chat.services.js";
import { chatWithAi } from "../services/langchain.services.js"
import {v4 as uuidv4} from "uuid"


const chatController = async(req , res, next)=>{
    try {
        
        // const businessId = req.user.id;
        
        const { userMessage , chatId} = req.body;
        const sessionId = req.cookies.sessionId;
        
        const {aiResponse , chat} = await getAiResponseService({userMessage , chatId  , sessionId})
    
       
        res.status(200).json({
            success : "true",
            data : aiResponse,
            chatId : chat
        })
        
    } catch (error) {
console.log(error)
        next(error)
        
    }
}

const initSessionController = (req , res , next)=>{

    let sessionId = req.cookies.sessionId

    if(!sessionId){
        sessionId = uuidv4()
        res.cookie("sessionId" , sessionId , {
            httpOnly: true,
         maxAge: 20 * 24 * 60 * 60 * 1000
        })
    }

    res.status(200).json({
        success : "true", 
        "message" : "sessionId successfully created"
    })
    
}


export {
    chatController, 
    initSessionController
}