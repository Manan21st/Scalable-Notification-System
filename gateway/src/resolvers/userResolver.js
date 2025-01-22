import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const { USER_SERVICE_URL } = process.env;

export default {
  Query: {
        getUser: async (_, { id }) => {
      try {
          const response = await axios.get(`${USER_SERVICE_URL}/users/details/${id}`);
          const user = {
              id: response.data._id,
            name: response.data.name,
              password: response.data.password,
                email: response.data.email,
              preferences: response.data.preferences
          };
          return user;
        
      } catch (error) {
        console.error("Error fetching user details:", error);
        throw new Error("Failed to fetch user details");
      }
    },
  },

  Mutation: {
    registerUser: async (_, { name, email, password }) => {
          try {
        //   console.log(name, email);
        const response = await axios.post(`${USER_SERVICE_URL}/users/register`, { name, email, password });
            
        
        return response.data;
          } catch (error) {
            
        console.error("Error registering user:", error);
        throw new Error(error.response.data);
      }
    },

      updateUserPreferences: async (_, { id, preferences }) => {
          console.log(id);
          
      try {
        const response = await axios.put(`${USER_SERVICE_URL}/users/preferences`, {
          userId: id,
          preferences,
        });
        // console.log(response.data);
          const user = {
              id: response.data._id,
              name: response.data.name,
              password: response.data.password,
              email: response.data.email,
              preferences: response.data.preferences
          };
        return user;
      } catch (error) {
        console.error("Error updating user preferences:", error);
        throw new Error( error.response.data);
      }
    },
    login: async (_, { email, password }) => {
      try {
        const response = await axios.post(`${USER_SERVICE_URL}/users/login`, { email, password });
        return response.data.token;
      } catch (error) {
        console.error("Error logging in:", error);
        throw new Error("Failed to log in");
      }
    }
  },
};
