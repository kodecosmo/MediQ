import connectDB from '@/utils/db';
import User from '@/models/User';

export async function POST(request) {
  
  const data = await request.json();
  
  const email = data.email || null;
  const password = data.password || null;

  if (!email || email == '') {
      return Response.json({ success: false, message: 'email is required' });
  }

  if (!password || password == '') {
      return Response.json({ success: false, message: 'password is required' });
  }
  
  try {
    await connectDB();

    const user = await User.findOne({ email, password });

    if (!user) {
      return Response.json({ success: false, message: 'user credentials do not match' });
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
    return Response.json({ success: false, message: error.message });
  }
}
