import mongoose  from "mongoose";



const chatSchema = new mongoose.Schema({
     botId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bot",
    required: true
  },
    businessId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    sessionId: {
    type: String,
    required: true,
    index: true  
  },
   title: {
    type: String,
    default: "New Conversation"
  }
}, {timestamps: true})


const chatModel = mongoose.model("chat" , chatSchema)

export default chatModel