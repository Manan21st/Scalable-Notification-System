import { Kafka, logLevel } from 'kafkajs';
import sendEmail from './mailer.js';

const kafka = new Kafka({
    clientId: 'notification-service',
    brokers: ['kafka:9092'], 
    // logLevel: logLevel.DEBUG,
});


const consumer = kafka.consumer({ groupId: 'notification-group' });

const runConsumer = async () => {
    try {
        console.log('Connecting to Kafka consumer...');
        await consumer.connect();
        console.log('Connected.');
        
        console.log('Subscribing to topic: notification-created...');
        await consumer.subscribe({ topic: 'notification-created', fromBeginning: true });
        console.log('Subscribed successfully.');

        console.log('Starting consumer...');
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(`Received message from topic "${topic}", partition ${partition}`);
                // console.log(`Message: ${message.value.toString()}`);
                
                try {
                    const event = JSON.parse(message.value.toString());
                    // console.log('Event received:', event);
                    console.log(event._doc);
                    const mailOptions = {
						from: process.env.SMTP_USER, // Sender's email
						to: event.email, // Recipient's email
                        subject: event._doc.type, // Email subject
                        text: event._doc.content, // Plain text body
                       
                    };
                    if (event._doc.userId && event._doc.type && event._doc.content) {
                        console.log(`Notification for User ${event._doc.userId}: ${event._doc.content}`);
                        if (event.email) {
                            console.log('Sending email notification...');
                            // await sendEmail(mailOptions);
                        }
                    } else {
                        console.warn('Invalid event structure:', event);
                    }
                } catch (parseError) {
                    console.error('Failed to parse message:', parseError);
                }
            },
        });
    } catch (consumerError) {
        console.error('Consumer failed:', consumerError);
    }
};

runConsumer();
