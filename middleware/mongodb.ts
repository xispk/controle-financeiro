import mongoose from 'mongoose';
import getConfig from 'next/config';

const { mongo_uri } = getConfig().serverRuntimeConfig;

export const connectDB = async () => {
  // Use current db connection
  if (mongoose.connections[0].readyState) return;

  // Use new db connection
  await mongoose.connect(mongo_uri);
};
