import history from '../data/userHistory.js';
import users from '../data/UserData.js';
import products from '../data/productData.js';
import axios from 'axios';
import cron from 'node-cron';

const fetchAndNotifyRecommendations = async () => {
    // console.log('Fetching recommendations');
    for (let user of users) {
        // console.log(user);
        if (user.preferences.includes('recommendations')) {
            
            const userHistory = history.find(event => user._id === event.userId);
            // console.log(userHistory);
            const recommendation = [];
            let map = new Map();
            for (let event of userHistory.searchHistory) {
                if (map.has(event)) {
                    map.set(event, map.get(event) + 1);
                } else {
                    map.set(event, 1);
                }
            }
            for( let events of userHistory.orderHistory){
                if (map.has(events)) {
                    map.set(events, map.get(events) + 1);
                } else {
                    map.set(events, 1);
                }
            }
            let max = 0;
            let secondMax = 0;
            for(let [key, value] of map){
                if (value >= max) {
                    max = value;
                    recommendation[1] = recommendation[0];
                    recommendation[0] = key;
                }
                else if (value >= secondMax) {
                    secondMax = value;
                    recommendation[1] = key;
                }
            }
            // console.log(recommendation);
            const product = products.find(product => product.productId === recommendation[0]);
            const product2 = products.find(product => product.productId === recommendation[1]);
            const recommendedCategory = product.category;
            const recommendedpriceRange = product.priceRange;
            const recommendedCategory2 = product2.category;
            const recommendedpriceRange2 = product2.priceRange;
            for (let product of products) {
                if (product.category === recommendedCategory && product.priceRange === recommendedpriceRange) {
                    const notification = {
                        userId: user._id,
                        type: 'recommendation',
                        email:user.email,
                        content: `We recommend ${product.name} from ${product.category} category.`
                    };
                    console.log(notification.content);
                    const response = await axios.post(`http://localhost:3001/notifications/`, notification);
                    // console.log(`Notification created for user ${user._id} regarding recommendation #${product.productId}`)
                }
                if (product.category === recommendedCategory2 && product.priceRange === recommendedpriceRange2) {
                    const notification = {
                        userId: user._id,
                        type: 'recommendation',
                        content: `We recommend ${product.name} from ${product.category} category.`
                    };
                    console.log(notification.content);
                    const response = await axios.post(`http://localhost:3001/notifications/`, notification);
                    // console.log(`Notification created for user ${user._id} regarding recommendation #${product.productId}`)
                }
            }
            
        }
    }
}

// this cron job will run every day at 5 PM
cron.schedule('* 13 * * *', fetchAndNotifyRecommendations);

export default fetchAndNotifyRecommendations;