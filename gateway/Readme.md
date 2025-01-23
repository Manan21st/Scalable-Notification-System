# User Service

## Overview
The User Service is responsible for managing user-related operations and handling user updates. It pushes user updates to Kafka topics, which are then consumed by the Notification Service to send relevant notifications.

---

## Features

1. **User Management**:
   - Handles user-related data such as creation, updates, and preferences.
2. **Kafka Integration**:
   - Pushes user updates to Kafka topics for seamless communication with other services.
3. **Preference Management**:
   - Updates user preferences for notifications (e.g., promotions, order updates).
4. **Real-Time Updates**:
   - Ensures real-time user update propagation via Kafka.

---

## Kafka Topics
The User Service pushes updates to the following Kafka topics:

1. **`user.updated`**: Contains information about general user updates.
2. **`user.preferences.updated`**: Handles updates related to user notification preferences.

---

## Folder Structure

```
user-service/
├── src/
│   ├── config/
│   │   └── kafkaConfig.js
│   ├── controllers/
│   │   └── userController.js
│   ├── models/
│   │   └── userModel.js
│   ├── services/
│   │   ├── kafkaProducer.js
│   │   └── userService.js
│   └── utils/
│       └── validation.js
├── mock-data/
│   └── users.json
├── README.md
└── package.json
```

---

## Key Components

### 1. **Kafka Producer**
Responsible for producing messages to Kafka topics. It ensures the messages are properly formatted and pushed to the correct topic.

#### Example: Producing a Message
```javascript
const kafkaProducer = require('../services/kafkaProducer');

const userUpdateMessage = {
  userId: '607c191e810c19729de860eb',
  updateType: 'profile_updated',
  timestamp: new Date().toISOString(),
};

kafkaProducer.sendMessage('user.updated', userUpdateMessage);
```

### 2. **User Controller**
Handles API routes for user operations like creating, updating, and managing preferences.

### 3. **User Model**
Defines the structure of user data in the system.

### 4. **Mock Data**
Stores sample user data for testing purposes in `mock-data/users.json`.

---

## API Endpoints

### 1. **Create User**
**Endpoint**: `/api/users`
**Method**: POST
**Description**: Creates a new user.

**Request Body**:
```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "preferences": ["promotion", "order_updates"]
}
```

### 2. **Update User**
**Endpoint**: `/api/users/:userId`
**Method**: PUT
**Description**: Updates user details and preferences.

**Request Body**:
```json
{
  "preferences": ["promotion"]
}
```

### 3. **Get User**
**Endpoint**: `/api/users/:userId`
**Method**: GET
**Description**: Retrieves user details.

---

## Kafka Integration

### Configuration
Kafka configuration is stored in `config/kafkaConfig.js`.

#### Example Configuration
```javascript
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'user-service',
  brokers: ['localhost:9092'],
});

module.exports = kafka;
```

### Producing Messages
The `kafkaProducer.js` service handles sending messages to Kafka topics.

#### Example Usage
```javascript
const kafkaProducer = kafka.producer();

const sendMessage = async (topic, message) => {
  await kafkaProducer.connect();
  await kafkaProducer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
  await kafkaProducer.disconnect();
};

module.exports = { sendMessage };
```

---

## Getting Started

### Prerequisites
- Node.js
- Kafka
- npm or yarn

### Setup
1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start Kafka (e.g., using Docker Compose):

   ```yaml
   version: '3.8'
   services:
     zookeeper:
       image: confluentinc/cp-zookeeper
       ports:
         - '2181:2181'
     kafka:
       image: confluentinc/cp-kafka
       ports:
         - '9092:9092'
       environment:
         KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
         KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
   ```

4. Start the service:

   ```bash
   npm start
   ```

### Environment Variables
- `KAFKA_BROKER`: The Kafka broker URL (e.g., `localhost:9092`).

---

## Contributing
Feel free to contribute by submitting issues or creating pull requests.

---

## License
This project is licensed under the MIT License.
