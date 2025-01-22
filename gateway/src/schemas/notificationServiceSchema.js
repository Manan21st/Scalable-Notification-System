// src/schemas/notificationServiceSchema.js
import { gql } from 'apollo-server';

const notificationServiceSchema = gql`
  type Notification {
    id: ID!
    message: String!
    userId: ID!
    read: Boolean!
  }

  type Query {
    getNotifications(userId: ID!): [Notification]
  }

  type Mutation {
    markNotificationAsRead(id: ID!): Notification
  }
`;

export default notificationServiceSchema;
