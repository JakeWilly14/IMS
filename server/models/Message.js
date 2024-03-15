const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messageContent:{
    type: String,
    required: true,
  }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;