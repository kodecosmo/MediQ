import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

let User;

try {
  // Try to retrieve the existing model
  User = mongoose.model("User");
} catch (e) {
  // Define the model if it doesn't exist
  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    updated_at: { type: Date, required: true },
    created_at: { type: Date, required: true },
  });

  // Create a JWT token for the user
  userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
    return token;
  };

  userSchema.pre("save", async function (next) {
    const user = this;

    // Only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();

    try {
      
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(user.password, salt);

      // Override the plaintext password with the hashed one
      user.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });

  User = mongoose.model("User", userSchema);
}

export default User;
