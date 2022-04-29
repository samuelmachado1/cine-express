import React, { useState, createContext, useEffect } from 'react';

import { useNavigate } from 'react-router';

import { api, createSession } from '../../src/services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user');
    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await createSession(email, password);

    console.log('done', response);
    const token = response.token;
    const loggedUser = response.id;


    localStorage.setItem('user', JSON.stringify(loggedUser));
    localStorage.setItem('token', token);

    api.defaults.headers.Authorization = `Bearer ${token}`;

    setUser(loggedUser);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    api.defaults.headers.Authorization = null;

    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}