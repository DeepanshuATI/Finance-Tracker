import React, { createContext, useState, useEffect } from "react";


export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);
    
    // Initialize user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        
        if (storedUser && token) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Failed to parse stored user data:", error);
                localStorage.removeItem("user");
            }
        }
        
        setIsInitialized(true);
    }, []);
    
    const updateUser = (userData) => {
        setUser(userData);
        
        // Persist user data to localStorage
        if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
        }
    };

    const clearUser = () => {
        setUser(null);
        
        // Remove user data and token from localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider
            value={{
                user,
                updateUser,
                clearUser,
                isInitialized,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
