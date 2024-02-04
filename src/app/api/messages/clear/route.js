import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import Message from "@/models/Message";
import getTokenFromHeaders from "@/helpers/getTokenFromHeaders";

export async function DELETE(request) {
  // Get the token from the request headers
  const token = await getTokenFromHeaders(request);

  try {
    if (token === null) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    try {
      await connectDB();

      const user = await User.findOne({ _id: decodedToken._id });

      if (!user) {
        return NextResponse.json(
          { success: false, message: "User not found" },
          { status: 401 }
        );
      }

      const messages = await Message.deleteMany({ user_id: user._id });

      return Response.json({
        success: true,
        message: "Messages cleared successfully",
        user: {
          name: user.name,
          email: user.email,
          updated_at: user.updated_at,
          created_at: user.created_at,
        },
        response: {
          deletedCount: messages.deletedCount,
        },
      });
    } catch (error) {
      return Response.json({ success: false, message: error.message });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 401 }
    );
  }
}
