import React, { useState, createContext, useEffect } from 'react';

import { useNavigate } from 'react-router';

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

  const login = (email, password) => {

    const loggedUser = {
      email,
      id: 1,
    };

    localStorage.setItem('user', JSON.stringify(loggedUser));

    if (password === '123') {

      setUser(loggedUser);
      navigate('/');
    }
    // setUser({ email, password });
  };

  const logout = () => {
    console.log('logout');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}