import express from 'express';
const notificationRoute = express.Router();
// import notificationModel from '../models/notificationModel.js';
import NotificationController from '../controllers/notificationController.js';
const { createNotification, getNotifications, MarkAsRead } = NotificationController;
// GET /notifications
notificationRoute.get('/', getNotifications);

// POST /notifications
notificationRoute.post('/', createNotification);

// PUT /notifications/:id
notificationRoute.put('/:id', MarkAsRead);

export default notificationRoute;