


import { useDispatch } from "react-redux";
import { createBotService,getBotsService } from "../services/bot.services";
import { botStart, botSuccess, botFailure,clearError } from "../state/botSlice";

const useBot = ()=>{

 const dispatch = useDispatch()


   

      const handleCreateBot = async ({ name,systemPrompt , widgetSettings,questions  }) => {

        try {
            dispatch(botStart())
            const response = await createBotService({ name,systemPrompt , widgetSettings,questions  })
            dispatch(botSuccess(response.bots))
            dispatch(clearError())
        } catch (error) {
          console.log(error)
          dispatch(botFailure(error.message))
          
          
        }
      }

      const handleGetBots = async()=>{

        try {
            dispatch(botStart())
            const response = await getBotsService()
            dispatch(botSuccess(response.bots))
            dispatch(clearError())
        } catch (error) {
          console.log(error)
          dispatch(botFailure(error.message))
          
          
        }
      }
     



return {
    handleCreateBot,
    handleGetBots
}

}


export default useBot