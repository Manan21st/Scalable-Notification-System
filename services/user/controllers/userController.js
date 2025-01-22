import { Kafka } from 'kafkajs';
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
// Initialize Kafka producer
const kafka = new Kafka({
    clientId: 'user-service',
    brokers: ['localhost:9093'] 
});

const producer = kafka.producer();

// Connect producer on startup
const initializeKafka = async () => {
    try {
        await producer.connect();
        console.log('Kafka producer connected');
    } catch (error) {
        console.error('Error connecting to Kafka:', error);
    }
};

initializeKafka();


const publishEvent = async (topic, event) => {
    try {
        await producer.send({
            topic,
            messages: [
                { 
                    key: event.userId || event.id,
                    value: JSON.stringify(event)
                }
            ]
        });
        console.log(`Event published to topic ${topic}`);
    } catch (error) {
        console.error(`Error publishing to ${topic}:`, error);
    }
};

const registerUser = async function(req, res) {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        console.log(name);
        console.log(email);
        console.log(password);
        
        if (!name || !email) {
            console.log('Missing name or email');
            return res.status(400).send('Missing name or email');
        }


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            await publishEvent('user.alreadyexists', {
                eventType: 'USER_ALREADY_EXISTS',
            });
            console.log('User already exists');
            return res.status(400).send('User already exists');
        }

        const user = new User({ name, email , password});
        await user.save();
        
        // Publish user creation event
        await publishEvent('user.created', {
            eventType: 'USER_CREATED',
            userId: user._id.toString(),
            name: user.name,
            email: user.email,
            timestamp: new Date().toISOString()
        });

        console.log(user);
        res.status(201).send('User created successfully');
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).send('Internal Server Error');
    }
};

const login = async function(req, res) {
    try {
        const { email, password } = req.body;
        // console.log(email);
        // console.log(password);
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Invalid credentials');
        }
        console.log(user);


        if (user.password !== password) {
            return res.status(401).send('Invalid credentials');
        }

        await publishEvent('user.login', {
            eventType: 'USER_LOGGED_IN',
            userId: user._id.toString(),
            email: user.email,
            timestamp: new Date().toISOString()
        });
        // console.log(Event);
        

        // console.log('User logged in:', user._id);
        jwt.sign({
            userId: user._id 
        }, process.env.SECRET_KEY , { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.error('Error generating token:', err);
                return res.status(500).send('Internal Server Error');
            }
            res.status(200).json({ token });
        });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).send('Internal Server Error');
    }
};

const updateUserpreferences = async function(req, res) {
    try {
        const { userId, preferences } = req.body;
        const user = await User.findByIdAndUpdate(userId, { preferences }, { new: true });
        
        if (!user) {
            console.log('User not found');
            return res.status(404).send('User not found');
        }

        // Publish preferences update event
        await publishEvent('user.preferences.updated', {
            eventType: 'USER_PREFERENCES_UPDATED',
            userId: user._id.toString(),
            preferences,
            email: user.email,
            timestamp: new Date().toISOString()
        });

        res.json(user);
    } catch (error) {
        console.error('Error in updateUserpreferences:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getUserDetails = async function(req, res){
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        
        if (!user) {
            console.log('User not found');
            return res.status(404).send('User not found');
        }

        // Publish user details accessed event
        await publishEvent('user.details.accessed', {
            eventType: 'USER_DETAILS_ACCESSED',
            userId: user._id.toString(),
            email: user.email,
            timestamp: new Date().toISOString()
        });

        res.json(user);
    } catch (error) {
        console.error('Error in getUserDetails:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Graceful shutdown function
const gracefulShutdown = async () => {
    try {
        await producer.disconnect();
        console.log('Kafka producer disconnected');
    } catch (error) {
        console.error('Error disconnecting Kafka producer:', error);
    }
};

// Handle process termination
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

export default { registerUser, login, updateUserpreferences, getUserDetails };
