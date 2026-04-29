import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Error parsing stored user data:", error);
        }
    }, []);

    const loginAuth = (username) => {
        setUser(username);
        localStorage.setItem('user', JSON.stringify(username));
    };

    const clearAuth = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const logout = () => {
        clearAuth();
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, loginAuth, logout, clearAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
