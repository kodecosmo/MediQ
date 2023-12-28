import { NextResponse } from 'next/server';
import connectDB from '@/utils/db';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import getTokenFromHeaders from '@/helpers/getTokenFromHeaders';

export async function GET(request) {

    // Get the token from the request headers
    const token = await getTokenFromHeaders(request);

    try {

        await connectDB();

        if (!token) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findOne({ _id: decodedToken._id });

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 401 });
        }

        return Response.json({
            success: true,
            message: 'User logged in successfully',
            user: {
                name: user.name,
                email: user.email,
                updated_at: user.updated_at,
                created_at: user.created_at,
                token: user.token,
            },
        });
    } catch (error) {
        return Response.json({ success: false, message: error });
    }
}