import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

let User;

try {
  // Try to retrieve the existing model
  User = mongoose.model('User');
} catch (e) {
  // Define the model if it doesn't exist
  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    token: String,
    updated_at: Date,
    created_at: Date,
  });

  // Create a JWT token for the user
  userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
    return token;
  };

  User = mongoose.model('User', userSchema);
}

export default User;
