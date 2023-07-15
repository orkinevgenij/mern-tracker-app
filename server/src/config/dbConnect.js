import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log(`DB connected Successfully`);
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
};

export default dbConnect;
