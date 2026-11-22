import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCurrentUser, loginUser as apiLogin, registerUser as apiRegister } from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem('santa_token');
      if (token) {
        try {
          const userData = await fetchCurrentUser();
          setUser(userData);
        } catch (err) {
          console.error('Failed to authenticate stored token:', err);
          localStorage.removeItem('santa_token');
        }
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  const login = async (username, password) => {
    const res = await apiLogin({ username, password });
    localStorage.setItem('santa_token', res.token);
    setUser(res.user);
    return res.user;
  };

  const register = async (formData) => {
    const res = await apiRegister(formData);
    localStorage.setItem('santa_token', res.token);
    setUser(res.user);
    return res.user;
  };

  const logout = () => {
    localStorage.removeItem('santa_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
