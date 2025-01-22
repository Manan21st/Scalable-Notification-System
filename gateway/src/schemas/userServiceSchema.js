// src/schemas/userServiceSchema.js
import { gql } from 'apollo-server';

const userServiceSchema = gql`
  type User {
    id: ID!
    name: String!
    password: String!
    email: String!
    preferences: [String]
  }

  type Query {
    getUser(id: ID!): User
  }

  type Mutation {
    registerUser(name: String!, email: String! , password: String!): String!
    updateUserPreferences(id : ID!, preferences: [String]!): User
    login(email: String!, password: String!): String!
  }
`;

export default userServiceSchema;
