import cron from 'node-cron';
import updated_orders from '../data/UpdatedOrder.js';
import axios from 'axios';
import Users from '../data/UserData.js';
// Fetch and notify users about order updates
async function fetchAndNotifyOrderUpdates() {
    // console.log(updated_orders);
  try {
   
        updated_orders.forEach(async (update) => {
          // console.log(update);
          const user = Users.find(user => user._id === update.userId);
          console.log(user);
          if(user.preferences.includes('order_updates')){
              const notification = {
              userId: update.userId,
              type: 'order_update',
              email:user.email,
              content: `Your order is ${update.orderStatus}`,
            };

            // Create notification (for example, storing it in DB)
            const response = await axios.post(`http://localhost:3001/notifications/`, notification);
            console.log(`Notification created for user ${update.userId} regarding order #${update.orderId}`)
          }
      });
      
    
  } catch (error) {
    console.error('Error fetching and notifying order updates:', error);
  }
}

// this cron job will run every hour
cron.schedule('0 * * * *', fetchAndNotifyOrderUpdates);

export default fetchAndNotifyOrderUpdates;