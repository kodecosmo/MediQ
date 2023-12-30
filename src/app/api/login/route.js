import connectDB from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(request) {
  const data = await request.json();

  const email = data.email || null;
  const password = data.password || null;

  if (!email || email == "") {
    return Response.json({ success: false, message: "email is required" });
  }

  if (!password || password == "") {
    return Response.json({ success: false, message: "password is required" });
  }

  try {
    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json({
        success: false,
        message: "user not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Passwords match, user is authenticated
      return Response.json({
        success: true,
        message: "User logged in successfully",
        user: {
          name: user.name,
          email: user.email,
          token: user.generateAuthToken(),
          updated_at: user.updated_at,
          created_at: user.created_at,
        },
      });
    } else {
      // Passwords do not match
      return Response.json({
        success: false,
        message: "invalid password",
      });
    }
  } catch (error) {
    return Response.json({ success: false, message: error.message });
  }
}
