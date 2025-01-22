import Notification from '../models/NotificationModel.js';
import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';
dotenv.config();

const kafka = new Kafka({
    clientId: 'notification-service',
    brokers: ['localhost:9093']
});

const producer = kafka.producer();

const initializeKafka = async () => {
    try {
        await producer.connect();
        console.log('service producer connected');
    } catch (error) {
        console.error('Error connecting to Kafka:', error);
    }
}

initializeKafka();






const publishEvent = async (topic, event, email) => {
    try {
        const message = {
            ...event,
            email, // Add the email directly into the event object
        };

        const result = await producer.send({
            topic,
            messages: [
                {
                    key: (event.userId || event._id).toString(),
                    value: JSON.stringify(message),
                },
            ],
        });
        console.log(`Message sent:`, result);
    } catch (error) {
        console.error(`Error publishing to ${topic}:`, error);
    }
};
const createNotification = async (req, res) => {
    const { userId, type, email, content } = req.body;
    // console.log(userId);
    // console.log(type);
    // console.log(content);
    // console.log('Creating notification');
    
    
    const notification = new Notification({
        userId,
        type,
        content
    });

    // console.log(notification);
    try {
        await notification.save();
        publishEvent('notification-created', notification , email);
        res.status(201).send(notification.content);
    } catch (error) {
        console.log('Error creating notification:');
        // break;
        res.status(500).send('Internal Server Error');
    }

};

const getNotifications = async (req, res) => {
    const { userId } = req.query;
    try {
        const notifications = await Notification.find({ userId });
        res.send(notifications);
    }
    catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).send('Internal Server Error');
    }
}

const MarkAsRead = async (req, res) => {
    const { id } = req.params;
    try {
        const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
        res.send(notification);
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).send('Internal Server Error');
    }
}

export default {
    createNotification,
    getNotifications,
    MarkAsRead
};