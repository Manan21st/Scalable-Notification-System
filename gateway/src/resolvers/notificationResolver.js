import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();


import authenticateJWT from '../middlewares/authenticate.js';




export default  {
  Query: {
    getNotifications: async (_, { userId }) => {
      // authenticateJWT();
      console.log('Getting all notifications');
      try {
        const response = await axios.get(`${process.env.NOTIFICATION_SERVICE_URL}/notifications?userId=${userId}`);
        let notifications = response.data.map(notification => {
          return {
            id: notification._id,
            userId: notification.userId,
            message: notification.content,
            read: notification.read,
          };
        });
        // console.log(response.data); 
        console.log(notifications);
        return notifications;
      } catch (error) {
        console.error("Error fetching notifications:", error);
        throw new Error("Failed to fetch notifications");
      }
    },
  },

  Mutation: {
    
    

    markNotificationAsRead: async (_, { id }) => {
      authenticateJWT();
      try {
        const response = await axios.put(`${NOTIFICATION_SERVICE_URL}/notifications/${id}`, { read: true });
        return response.data;
      } catch (error) {
        console.error("Error marking notification as read:", error);
        throw new Error("Failed to mark notification as read");
      }
    },
  },
};
