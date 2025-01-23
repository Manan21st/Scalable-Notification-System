# Notification Service

## Overview
The Notification Service is responsible for managing and sending notifications based on user preferences. Notifications are generated for:

1. **Order Updates**
2. **Promotions**
3. **Recommendations**

The service uses mock data for products, promotions, orders, users, and user history, and schedules notifications based on predefined rules.

---

## Features

1. **User Preferences-Based Notifications**: Notifications are sent based on the preferences set by the user (e.g., promotion updates, order updates).
2. **Scheduler**: 
   - **Order Updates**: Sent every hour.
   - **Promotions** and **Recommendations**: Sent once daily.
   - **User Updates**: Sent immediately after activity.
3. **Recommendation Engine**: Generates product recommendations based on the user's search and order history.
4. **Mock Data**: Stores mock data in JSON format for testing and simulation.

---

## Data Types

### 1. **Product Data**
Stores information about the products available in the system.

```json
{
  "productId": "601c1a1e810c19729de860eb",
  "name": "Bluetooth Headphones",
  "category": "electronics",
  "price": 199.99,
  "priceRange": "mid"
}
```

### 2. **Promotion Data**
Stores promotion details for specific products.

```json
{
  "promotionId": "promo-001",
  "productId": "product-123",
  "productName": "Wireless Headphones",
  "productCategory": "electronics",
  "discountType": "percentage",
  "discountValue": 20,
  "promotionStart": "2025-01-15T00:00:00Z",
  "promotionEnd": "2025-01-30T23:59:59Z",
  "description": "Get 20% off on Wireless Headphones! Limited time offer."
}
```

### 3. **Updated Order Data**
Stores information about updated orders.

```json
{
  "orderId": "order_002",
  "userId": "607c191e810c19729de860eb",
  "orderStatus": "Ready for Shipping",
  "previousStatus": "Received Successfully",
  "isUpdated": true,
  "updateType": "order_ready_for_shipping",
  "timestamp": "2025-01-18T11:00:00Z"
}
```

### 4. **User Data**
Stores user information, including preferences.

```json
{
  "_id": "607c191e810c19729de860eb",
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "password": "$2b$10$abc123hashedpasswordexample2",
  "preferences": ["promotion", "order_updates"],
  "createdAt": "2025-01-02T15:30:00.000Z",
  "updatedAt": "2025-01-02T15:30:00.000Z"
}
```

### 5. **User History Data**
Stores the user's search and order history.

```json
{
  "userId": "607c191e810c19729de860ea",
  "searchHistory": [
    "601c1a1e810c19729de860ea",
    "601c1a1e810c19729de860f4",
    "601c1a1e810c19729de860f2"
  ],
  "orderHistory": [
    "601c1a1e810c19729de860ea",
    "601c1a1e810c19729de860ec",
    "601c1a1e810c19729de860eb"
  ]
}
```

---

## Notification Rules

1. **Order Updates**: Sent every hour to users who opt for `order_updates`.
2. **Promotions**: Sent daily to users who opt for `promotion` notifications.
3. **Recommendations**: Sent daily, generated based on user search and order history.
4. **User Updates**: Sent immediately after user activity.

---

## Folder Structure

```
notification-service/
├── mock-data/
│   ├── products.json
│   ├── promotions.json
│   ├── orders.json
│   ├── users.json
│   └── user-history.json
├── scheduler/
│   └── notificationScheduler.js
├── services/
│   ├── notificationService.js
│   ├── recommendationEngine.js
│   ├── promotionService.js
│   └── orderUpdateService.js
└── README.md
```

---

## How It Works

1. **Mock Data**: Stores data for products, promotions, orders, users, and user history in the `mock-data` folder.
2. **Scheduler**: Runs periodic tasks to send notifications based on predefined rules.
3. **Notification Service**:
   - Reads user preferences.
   - Fetches the relevant data (e.g., order updates, promotions, recommendations).
   - Sends notifications to users.
4. **Recommendation Engine**:
   - Uses search and order history to recommend products to users.

---

## Getting Started

### Prerequisites
- Node.js
- npm or yarn

### Setup
1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the service:

   ```bash
   npm start
   ```

### Configuration
- Update the mock data files in the `mock-data` folder as needed.
- Customize notification rules in `notificationScheduler.js`.

---

## Contributing
Feel free to contribute to the project by creating a pull request or reporting issues.

---

## License
This project is licensed under the MIT License.
