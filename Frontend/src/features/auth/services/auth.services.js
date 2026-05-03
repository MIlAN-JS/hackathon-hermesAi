import axios from "axios"


const api = axios.create({
    baseURL: "http://localhost:3000/auth", 
    withCredentials: true
});



const registerUserService = async ({ name, email, password }) => {

  try {
      const response = await api.post("/register", { name, email, password })
    return response.data

  } catch (error) {
    console.log(error)
    return error
    
  }
    
}

const loginUserService = async ({ email, password }) => {

  try {
      const response = await api.post("/login", { email, password })
    return response.data

  } catch (error) {
    console.log(error)
    return error
    
  }
    
}

const logoutUserService = async () =>{
  try {
    const response = await api.post("/logout")
    return response.data
  } catch (error) {
    console.log(error)
    return error
  }
}

 const googleLogin =  ()=>{
    window.location.href = "http://localhost:3000/auth/google";
}


const getUserService = async (id)=>{
    try {
        const response = await api.get("/get-user")
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}



export {
    registerUserService, 
    loginUserService,
    getUserService, 
    googleLogin, 
    logoutUserService
}