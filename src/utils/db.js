import { mongoose } from "mongoose";

const connectDB = async () => {

  const username = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;
  const host = process.env.MONGODB_HOST;
  const port = process.env.MONGODB_PORT;
  const database = process.env.MONGODB_DB;

  const encodedUsername = encodeURIComponent(username);
  const encodedPassword = encodeURIComponent(password);

  const connectionString = `mongodb://${encodedUsername}:${encodedPassword}@${host}:${port}/${database}`;
    
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

};

export default connectDB;