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

chatSchema.index({ businessId: 1, sessionId: 1 }, { unique: true });

const chatModel = mongoose.model("Chat", chatSchema)

export default chatModel;
