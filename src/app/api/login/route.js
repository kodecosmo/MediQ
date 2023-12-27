import connectDB from '@/utils/db';
import User from '@/models/User';

export async function POST(request) {
  
  const data = await request.json();
  
  const email = data.email;
  const password = data.password;

  try {
    await connectDB();
  } catch (error) {
    return Response.json({ success: false, message: error })
  }
  
  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return Response.json({ success: false, message: 'user credentials do not match' });
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
