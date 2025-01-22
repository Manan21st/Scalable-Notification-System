import express from 'express';
const app = express();
import connectDB from './database/connection.js';
connectDB();
import userRoute from './routes/userRoute.js';
app.use(express.json());
app.use('/users', userRoute);

app.get('/', (req, res) => {
    res.send('User Service');
});

app.listen(3000, () => {
    console.log('User Service is running');
});
