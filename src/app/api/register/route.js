import connectDB from '@/utils/db';
import User from '@/models/User';

export async function POST(request) {
  
  const data = await request.json();
  
  const name = data.name;
  const email = data.email;
  const password = data.password;

  try {
    await connectDB();
  } catch (error) {
    return Response.json({ success: false, message: error })
  }
  
  try {
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

    // Generate a token
    user.token = user.generateAuthToken();
    await user.save();

    return Response.json({
      success: true,
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    return Response.json({ success: false, message: error });
  }
}
