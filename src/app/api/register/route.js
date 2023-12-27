import connectDB from '@/utils/db'; // Update the path based on your project structure
import User from '@/models/User'; // Update the path based on your project structure

export async function POST(request) {
  
  const formData = await request.formData()
  
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    await connectDB();
  } catch (error) {
    return Response.json({ success: false, error: error })
  }

  // const existingUser = await User.findOne({ email: email }).exec();

  try {
    const existingUser = await User.findOne({ email });

    return Response.json(existingUser)
  
    if (existingUser) {
      // User already exists, handle accordingly (e.g., send an error response)
      return res.status(400).json({ error: 'User with this email already exists' });
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

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: { user },
    });
  } catch (error) {
    console.error('Error creating user', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
