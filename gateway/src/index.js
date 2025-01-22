
import { ApolloServer, gql } from 'apollo-server';
import express from 'express';
import dotenv from 'dotenv';
import authenticateJWT from './middlewares/authenticate.js';
import notificationResolver from './resolvers/notificationResolver.js';
const {
  createNotification,
  getNotifications,
  markNotificationAsRead
}
  = notificationResolver;


// Load environment variables
dotenv.config();

// Import the schemas
import userServiceSchema from './schemas/userServiceSchema.js';
import notificationServiceSchema from './schemas/notificationServiceSchema.js';

// Import the resolvers
import userResolvers from './resolvers/userResolver.js';
import notificationResolvers from './resolvers/notificationResolver.js';

// Combine schemas
const typeDefs = gql`
  ${userServiceSchema}
  ${notificationServiceSchema}
`;



// Create the Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      ...userResolvers.Query,
      ...notificationResolvers.Query
    },
    Mutation: {
      ...userResolvers.Mutation,
      ...notificationResolvers.Mutation
    }
  }
});

// app.use(authenticateJWT);

// Start the server
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`GraphQL Gateway running at ${url}`);
});
