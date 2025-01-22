import express from 'express';
const app = express();
import connectDB from './database/connection.js';
connectDB();
import runConsumer from './scheduler/userScheduler.js';
import notificationRoute from './routes/notifiactionRoute.js'
import dotenv from 'dotenv';
dotenv.config();
import fetchAndNotifyOrderUpdates from './scheduler/orderScheduler.js';
import fetchAndNotifyPromotions from './scheduler/promotionScheduler.js';
import fetchAndNotifyRecommendations from './scheduler/recommendations.js';
app.use(express.json());
app.use('/notifications' , notificationRoute);
app.get('/' , (req , res) => {
    res.send("Notification Service");
});

// runConsumer();
fetchAndNotifyOrderUpdates();
// fetchAndNotifyPromotions();
// fetchAndNotifyRecommendations();

app.listen(3001 , () => {
    console.log("Notification service running on port 3001");
});



