import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  request: String,
  response: String,
  is_error: Boolean,
  updated_at: Date,
  created_at: Date,
});

const Message = mongoose.model('Message', messageSchema);

export default Message
