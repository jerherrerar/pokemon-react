import axios from "axios";

const API_BASE_URL = "https://api.example.com";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const login = async (userData) => {
  // if (userData.username === "admin" && userData.password === "admin") {
  if (userData.username && userData.password) {
    return {
      auth_token: "some_jwt_token"
    };
  }
  return {
    error_description: "Invalid username or password."
  };
  //   try {
  //     const response = await apiClient.post("/login", userData);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error logging in:", error);
  //     throw error;
  //   }
};

export const getUsers = async () => {
  try {
    const response = await apiClient.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Re-throw to allow component-level error handling
  }
};

// export const createUser = async (userData) => {
//   try {
//     const response = await apiClient.post("/users", userData);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating user:", error);
//     throw error;
//   }
// };
