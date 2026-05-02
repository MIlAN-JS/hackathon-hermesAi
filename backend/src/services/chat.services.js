  import chatModel from "../models/chat.model.js"
  import messageModel from "../models/message.model.js"
  import { chatWithAi } from "./langchain.services.js"
  import { HumanMessage , AIMessage } from "@langchain/core/messages"


  const getAiResponseService = async({userMessage , chatId , businessId, sessionId})=>{
      try {
        console.log(userMessage)

      let chat= null;

      //check if chatId exist
      if(!chatId){  
          chat = await chatModel.findOne( {sessionId : sessionId})

          if(!chat){
              chat = await chatModel.create({ sessionId : sessionId})
          }

      }

      if (!chat) {
        return res.status(404).json({
          success: false,
          message: "Chat not found",
        });
      }

      console.log(userMessage)
  // saving user message in db
      await messageModel.create({
        chatId: chat._id || chatId,
        role: "human",
        message: userMessage,
      });

  // FETCH messages
      const messages = await messageModel
        .find({ chatId: chat._id || chatId })
        .sort({ createdAt: 1 });


        // FORMAT for AI
      const formattedMessages = messages.map((msg) =>
        msg.role === "ai"
          ? new AIMessage(msg.message)
          : new HumanMessage(msg.message)
      );
      console.log(formattedMessages)

      // AI response
      const aiResponse = await chatWithAi(formattedMessages);
      
      // saving AI response in db
      await messageModel.create({
        chatId: chat._id || chatId,
        role: "ai",
        message: aiResponse,
      });

      return {
          aiResponse : aiResponse , 
          chat : chat._id || chatId
      }

      }

      catch (error) {
          console.log(error)
          throw error
      }
  }

  export {
      getAiResponseService
  }