import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import Message from "@/models/Message";
import fetch from "node-fetch";
import getTokenFromHeaders from "@/helpers/getTokenFromHeaders";

export async function GET(request) {
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

      const messages = await Message.find({ user_id: user._id });

      return Response.json({
        success: true,
        message: "Messages loaded successfull",
        user: {
          name: user.name,
          email: user.email,
          updated_at: user.updated_at,
          created_at: user.created_at,
        },
        messages,
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

export async function POST(request) {
  const data = await request.json();

  const customPrompts =
    "Allways give firstaids for the question as steps only.";

  const question = data.request || null;

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

      const apiKey = process.env.GEMINI_API_KEY; // Replace with your actual API key

      const url = `${process.env.GEMINI_REQUEST_URL}?key=${apiKey}`;

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `${customPrompts} ${question}`,
              },
            ],
          },
        ],
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const message = new Message({
          user_id: user._id,
          request: question,
          response: JSON.stringify(data.candidates[0].content.parts),
          is_error: false,
          updated_at: new Date(),
          created_at: new Date(),
        });

        await message.save();

        return Response.json({
          success: true,
          message: "Message send successfully",
          isGenerated: true,
          genMessage: "Message processed successfully",
          response: message,
        });
      } catch (error) {
        const message = new Message({
          user_id: user._id,
          request: question,
          response: null,
          is_error: true,
          updated_at: new Date(),
          created_at: new Date(),
        });

        await message.save();

        return Response.json({
          success: true,
          message: `Message send successfully. Response error : ${error.message}`,
          isGenerated: false,
          genMessage: error,
          response: message,
        });
      }
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
