
import { Kafka } from 'kafkajs';
import axios from 'axios';
import users from '../data/UserData.js';
import dotenv from 'dotenv';
dotenv.config();

const kafka = new Kafka({
    clientId: 'user-service',
	brokers: [process.env.KAFKA_BROKER],
});

const consumer = kafka.consumer({ groupId: 'notification-group' });


const handleUserCreated = async (event) => {
    for (let user of users) {
        if (user.preferences.includes('user_update')) {
            try {
                const { userId, name, email } = event;
                console.log('Processing USER_CREATED event:', event);
                const response = await axios.post(`http://localhost:3001/notifications/`, {
                    userId: userId,
                    type: 'user_update',
                    email: email,
                    content: `User ${name} created with email ${email}`
                });

                // Optionally, update or log user creation in another system here
            } catch (error) {
                console.error('Error processing USER_CREATED event:');
            }
        }
    }
};

// Process user login event
const handleUserLoggedIn = async (event) => {
    try {
        const { userId , email } = event;
        console.log('Processing USER_LOGGED_IN event:', event);
        const response = await axios.post(`http://localhost:3001/notifications/`, {
            userId: userId,
            type: 'user_update',
            email: email,
            content: 'User logged in'
        });

        console.log('Notification sent:', response.data);

    } catch (error) {
        console.error('Error processing USER_LOGGED_IN event:', error);
    }
};


const handleUserPreferencesUpdated = async (event) => {
    console.log(event);
    try {
        const { userId, preferences , email } = event;
        console.log('Processing USER_PREFERENCES_UPDATED event:', event);
        const response = await axios.post(`http://localhost:3001/notifications/`, {
            userId: userId,
            email: email,
            type: 'user_update',
            content: 'User preferences updated'
        });
        

        console.log('User preferences updated in the database');
    } catch (error) {
        console.error('Error processing USER_PREFERENCES_UPDATED event:', error);
    }
};


const handleUserDetailsAccessed = async (event) => {
    try {
        const { userId } = event;
        console.log('Processing USER_DETAILS_ACCESSED event:', event);

    } catch (error) {
        console.error('Error processing USER_DETAILS_ACCESSED event:', error);
    }
};




const runConsumer = async () => {
    try {
        await consumer.connect();
        console.log('Kafka consumer connected');
        await consumer.subscribe({ topic: 'user.created', fromBeginning: true });
        await consumer.subscribe({ topic: 'user.login', fromBeginning: true });
        await consumer.subscribe({ topic: 'user.preferences.updated', fromBeginning: true });
        await consumer.subscribe({ topic: 'user.details.accessed', fromBeginning: true });
        

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const event = JSON.parse(message.value.toString());
                console.log('Received event:', topic, event);
                switch (topic) {
                    case 'user.created':
                        await handleUserCreated(event);
                        break;
                    case 'user.login':
                        await handleUserLoggedIn(event);
                        break;
                    case 'user.preferences.updated':
                        await handleUserPreferencesUpdated(event);
                        break;
                    case 'user.details.accessed':
                        await handleUserDetailsAccessed(event);
                        break;
                    default:
                        console.warn('Unknown topic:', topic);
                }
            }
        });
    } catch (error) {
        console.error('Error running Kafka consumer:', error);
    }
};

// Graceful shutdown function
const gracefulShutdown = async () => {
    try {
        await consumer.disconnect();
        console.log('Kafka consumer disconnected');
    } catch (error) {
        console.error('Error disconnecting Kafka consumer:', error);
    }
};

// Handle process termination
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

export default runConsumer;
