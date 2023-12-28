import mongoose from 'mongoose';

let Message;

try {
  // Try to retrieve the existing model
  Message = mongoose.model('Message');
} catch (e) {
  
  const messageSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    request: { type: String, required: true, },
    response: { type: String, required: false, },
    is_error: { type: Boolean, default: false, },
    updated_at: { type: Date, required: true, },
    created_at: { type: Date, required: true, },
  });

  Message = mongoose.model('Message', messageSchema);
}

export default Message;
