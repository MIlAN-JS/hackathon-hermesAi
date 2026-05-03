import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    botId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bot",
      required: true,
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // FAQ question
    questions : {
      type : Array, 
      required : true
    },


    // enable/disable without deleting
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const questionModel = mongoose.model("question", questionSchema);

export default questionModel;