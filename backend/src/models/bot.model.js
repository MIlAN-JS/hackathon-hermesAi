import mongoose, { mongo } from "mongoose";
import crypto from "crypto"

const botSchema = new mongoose.Schema({

    businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }, 
  name: {
    type: String,
    required: true
  },
  systemPrompt: {
    type: String,
    required: true
  },
  embedToken: {
    type: String,
    unique: true,
    default: () => crypto.randomBytes(32).toString("hex") ,// auto generated
  },
   widgetSettings: {
    color: {
      type: String,
      default: "#6366f1"
    }
},

greetingMessage: {
      type: String,
      default: "Hi! How can I help you today?"
    }
}, {timestamps:true})



const botModel = mongoose.model(
    "bot" , botSchema
)


export default botModel