import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
console.log('User DB URL:', process.env.USER_DB_URL);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.USER_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('User Service Database Connected');
    } catch (err) {
        console.error('User DB Connection Failed:', err.message);
    }
};
export default connectDB;