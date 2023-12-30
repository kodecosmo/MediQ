import connectDB from '@/utils/db';
import User from '@/models/User';

export async function POST(request) {
  
  const data = await request.json();
  
  const name = data.name || null;
  const email = data.email || null;
  const password = data.password || null;

  if (!name || name == '') {
      return Response.json({ success: false, message: 'name is required' });
  }

  if (!email || email == '') {
      return Response.json({ success: false, message: 'email is required' });
  }

  if (!password || password == '') {
      return Response.json({ success: false, message: 'password is required' });
  }

  try {
    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json({ success: false, message: 'email allready taken' });
    }

    const user = new User({
      name,
      email,
      password,
      updated_at: new Date(),
      created_at: new Date(),
    });

    await user.save();

    return Response.json({
      success: true,
      message: 'User created successfully',
      user: {
          name: user.name,
          email: user.email,
          token: user.generateAuthToken(),
          updated_at: user.updated_at,
          created_at: user.created_at,
      },
    });
  } catch (error) {
    return Response.json({ success: false, message: error.message });
  }
}
