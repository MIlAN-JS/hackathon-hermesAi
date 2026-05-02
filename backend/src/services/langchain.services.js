  import { ChatMistralAI } from "@langchain/mistralai";
  import config from '../config/config.js';



  const mistralModel = new ChatMistralAI({
    model : "mistral-small-latest", 
    apiKey : config.MISTRAL_API_KEY,
  })


  const chatWithAi = async (messages)=>{
    try{

      const response = await mistralModel.invoke(messages)
      return response.content

    }catch(err){
      console.log(err)
      next(err)
    }
  }


  export {

    chatWithAi

  }