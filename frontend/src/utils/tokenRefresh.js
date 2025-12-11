import axios from "axios";
import { Base_URL } from "./apiPaths";

/**
 * Refreshes the access token using the refresh token stored in cookies
 * @returns {Promise<{success: boolean, accessToken?: string}>}
 */
export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${Base_URL}/api/v1/users/refresh-token`,
      {},
      {
        withCredentials: true, // Important: Send cookies with the request
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data && response.data.data && response.data.data.accessToken) {
      const { accessToken } = response.data.data;
      
      // Store the new access token in localStorage
      localStorage.setItem("token", accessToken);
      
      return {
        success: true,
        accessToken,
      };
    }

    return {
      success: false,
    };
  } catch (error) {
    console.error("Token refresh failed:", error.response?.data || error.message);
    return {
      success: false,
    };
  }
};

/**
 * Clears all authentication data from storage
 */
export const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
