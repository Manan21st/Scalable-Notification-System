import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.NOTIFICATION_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Notification Service Database Connected');
    } catch (err) {
        console.error('Notification DB Connection Failed:', err.message);
    }
};
export default connectDB;