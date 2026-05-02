import mongoose  from "mongoose";



const chatSchema = new mongoose.Schema({
  businessId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true, 
  }, 
  title : {
    type : String , 
    default : "Hermes Customer Support"

  }, 
  sessionId : {
    type : String , 
    required : true,
  }
    
})



const chatModel = mongoose.model("Chat", chatSchema)

export default chatModel;
