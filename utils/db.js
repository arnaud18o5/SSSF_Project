import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connected successfully');
  } catch (e) {
    console.error('Connection to db failed: ', e);
  }
})();

export default mongoose.connection;
