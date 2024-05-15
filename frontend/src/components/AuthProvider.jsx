import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwt-token'));
  const [isAuthenticated, setIsAuthenticated] = useState( token ? true : false );
  const [admin, setAdmin] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    axios.post('http://localhost:8000/auth', { jwt: token })
            .then((response) => {
                if (response.status == 200) {
                    setAdmin(response.data.isAdmin);
                    setUserId(response.data.id);
                }
            })
            .catch((error) => {
              logout();
            });
  })

  const login = (token) => {
    setToken(token);
    setIsAuthenticated(true);
    localStorage.setItem('jwt-token', token);
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('jwt-token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token, admin, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider }; // Eksportējam AuthProvider kā norādes funkciju (arrow function)

export const useAuth = () => useContext(AuthContext);
