import { useDispatch } from "react-redux";
import { authStart , authSuccess , authFailure , logout , clearError } from "../state/authSlice.js";
import { registerUserService , loginUserService , getUserService , logoutUserService} from "../services/auth.services.js";


const useAuth = ()=>{

 const dispatch = useDispatch()


   // registerUser
      const handleRegisterUser = async ({ name, email, password }) => {

        try {
            dispatch(authStart())
            const response = await registerUserService({ name, email, password })
            dispatch(authSuccess(response.user))
  
        } catch (error) {
          console.log(error)
          dispatch(authFailure(error.message))
          
          
        }
      }

      // login user
      const handleLoginUser = async ({ email, password }) => {

        try {
            dispatch(authStart())
            const response = await loginUserService({ email, password })
            dispatch(authSuccess(response))
  
        } catch (error) {
          console.log(error)
          dispatch(authFailure(error.message))
          
          
        }
      }

      const handleGetUser = async()=>{

        try {
            dispatch(authStart())
            const response = await getUserService()
            
          response ? dispatch(authSuccess(response)) : dispatch(logout())
        } catch (error) {
          console.log(error)
          dispatch(authFailure(error.message))
          
          
        }
      }

      const handleLogoutUser = async()=>{


        try {
            dispatch(authStart())
            const response = await logoutUserService()
            dispatch(logout())
            dispatch(clearError())
            console.log("logout hook")
  
        } catch (error) {
          console.log(error)
          dispatch(authFailure(error.message))
          
        }
      }



return {
    handleRegisterUser,
    handleLoginUser, 
    handleGetUser, 
    handleLogoutUser
}

}


export default useAuth