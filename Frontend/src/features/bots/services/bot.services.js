import axios from "axios"


const api = axios.create({
    baseURL: "http://localhost:3000/api/bot", 
    withCredentials: true
});



const createBotService = async ({ name,systemPrompt , widgetSettings,questions  }) => {

  try {
      const response = await api.post("/create", { name , systemPrompt , widgetSettings,questions })

    return response.data

    console.log(name , questions )

  } catch (error) {
    console.log(error)
    return error
    
  }
    
}



const getBotsService = async () => {  
  try {
      const response = await api.get("/get-bot")
    return response.data
  } catch (error) {
    console.log(error)
    return error
  }
}






export {
  createBotService,
  getBotsService
}