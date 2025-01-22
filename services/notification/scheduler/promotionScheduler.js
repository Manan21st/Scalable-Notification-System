import cron from 'node-cron';
import promotions from '../data/promotionOrder.js';
import axios from 'axios';
import Users from '../data/UserData.js';

async function fetchAndNotifyPromotions() {
    // console.log(promotions);
    // console.log(Users);
    for (let user of Users) {
        if (user.preferences.includes('promotions')) {
            try {
                promotions.forEach(async (promotion) => {
                    const notification = {
                        userId: user._id,
                        type: 'promotion',
                        email: user.email,
                        content: `Fantastic Offers: ${promotion.description}`,
                    };
                    console.log(notification);
                    const response = await axios.post(`http://localhost:3001/notifications/`, notification);
                    console.log(`Notification created for user ${promotion.userId} regarding promotion #${promotion.promotionId}`)
                });
            }
            catch (error) {
                console.error('Error fetching and notifying promotions:', error);
            }
        }
    }
}


// this cron job will run every day at 5 PM
cron.schedule('* 17 * * *', fetchAndNotifyPromotions);

export default fetchAndNotifyPromotions;

