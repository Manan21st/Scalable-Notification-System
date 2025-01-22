import { Router } from 'express';
import mongoose from 'mongoose';
const userRoute = Router();

import userController from '../controllers/userController.js';
// import authenticate from '../middlewares/authenticate.js';

const { registerUser, login, updateUserpreferences, getUserDetails } = userController;

// POST /users/register
userRoute.post('/register', registerUser);

// POST /users/login
userRoute.post('/login', login);

// PUT /users/preferences
userRoute.put('/preferences' , updateUserpreferences);

// GET /users/details
userRoute.get('/details/:id', getUserDetails);

export default userRoute;