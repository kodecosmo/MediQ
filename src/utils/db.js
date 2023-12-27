import { mongoose } from "mongoose";

const connectDB = async () => {

  const platform = process.env.MONGODB_PLATFORM;

  const connectionString = (platform == "docker") ? generateDockerConnectionString() :  (platform == "atlas") ? generateAtlasConnectionString() : connError();

  await mongoose.connect(connectionString, {
    w: 'majority',
  });

};

const generateDockerConnectionString = () => {

  const username = process.env.MONGODB_DOCKER_USERNAME;
  const password = process.env.MONGODB_DOCKER_PASSWORD;
  const host = process.env.MONGODB_DOCKER_HOST;
  const port = process.env.MONGODB_DOCKER_PORT;
  const database = process.env.MONGODB_DOCKER_DB;

  const encodedUsername = encodeURIComponent(username);
  const encodedPassword = encodeURIComponent(password);

  const localConnectionString = 'mongodb://' + encodedUsername + ':' + encodedPassword + '@' + host + ':' + port + '/' + database;

  return localConnectionString;
}

const generateAtlasConnectionString = () => {

  const username = process.env.MONGODB_ATLAS_USERNAME;
  const password = process.env.MONGODB_ATLAS_PASSWORD;
  const database = process.env.MONGODB_ATLAS_DB;

  const encodedUsername = encodeURIComponent(username);
  const encodedPassword = encodeURIComponent(password);

  const remoteConnectionString = 'mongodb+srv://' + encodedUsername + ':' + encodedPassword + '@cluster0.qwkwfxt.mongodb.net/' + database;

  return remoteConnectionString;
}

const connError = () => {
  throw new Error("Define a `MONGODB_PLATFORM` in the .env file. It should be either `docker` or `atlas`");
}

export default connectDB;