import React, { createContext, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {API_LOGIN} from '../utilities/constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const login = async (userData) => {
        try {
            const response = await fetch(API_LOGIN, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            setIsAuthenticated(true);
            setUser(data.user);

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("name", data.name);
            localStorage.setItem("email", data.email);
            localStorage.setItem("avatar", data.avatar);
            localStorage.setItem("manager", data.manager);

            console.log({data}, data, "DATA");
            if (!response.ok) {
                new Error('Login failed');
            }
        } catch (error) {
            console.log(error);
            logout(userData);
        }

            setTimeout(() => {
                console.log(`Should be "redirected" to profile page`);
                navigate(`/profile/${localStorage.getItem("name")}`);
            }, 1200);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

/*
Use the AuthContext in components by
importing it and using the useContext hook.

const LoginButton = () => {
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    // Call an API or perform some other login logic
    const userData = { name: 'John Doe', email: 'john.doe@example.com' };
    login(userData);
  };

  return <button onClick={handleLogin}>Login</button>;
};
 */