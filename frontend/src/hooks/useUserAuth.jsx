import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const useUserAuth = () => {
  const { user, updateUser, clearUser, isInitialized } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Wait for context to initialize from localStorage
    if (!isInitialized) return;

    // If user is already loaded, no need to fetch
    if (user) return;

    // Check if token exists
    const token = localStorage.getItem("token");
    if (!token) {
      // No token, redirect to login
      navigate("/login");
      return;
    }

    let isMounted = true;

    const fetchUserInfo = async () => {
      setIsLoading(true);
      
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

        if (isMounted && response?.data?.data) {
          console.log("Fetched user info:", response.data.data);
          updateUser(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user info:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });

        // Don't redirect here - let axios interceptor handle token refresh
        // Only clear user if it's not a 401 (which will be handled by interceptor)
        if (isMounted && error.response?.status !== 401) {
          clearUser();
          navigate("/login");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate, isInitialized]);

  return { user, updateUser, clearUser, isLoading };
};
