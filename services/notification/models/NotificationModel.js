import mongoose from 'mongoose';

// Define the Notification Schema
const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['promotion', 'order_update', 'recommendation', 'user_update'],
    required: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed, 
    required: true
  },
  sentAt: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });


const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;