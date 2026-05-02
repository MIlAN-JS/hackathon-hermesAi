import mongoose from "mongoose";

// models/message.model.js"

const messageSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
    index: true  // we query by this a lot so  we must index it yay
  },
  role: {
    type: String,
    required: true,
    enum: ["human", "ai"]
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true })

const messageModel = mongoose.model("Message", messageSchema)

export default messageModel
