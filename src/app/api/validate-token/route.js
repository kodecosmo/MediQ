import { headers } from 'next/headers';
import connectDB from '@/utils/db';
import User from '@/models/User';

export async function GET(request) {

    const headersList = headers();
    const token = headersList.get('token');

    try {
        await connectDB();
    } catch (error) {
        return Response.json({ success: false, message: error })
    }
    
    try {
        const user = await User.findOne({ token });

        if (!user) {
        return Response.json({ success: false, message: 'invalid token' });
        }

        return Response.json({
        success: true,
        message: 'User logged in successfully',
        user,
        });
    } catch (error) {
        return Response.json({ success: false, message: error });
    }
}