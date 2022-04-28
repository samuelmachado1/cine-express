import React, { useState, createContext } from 'react';

import { useNavigate } from 'react-router';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    if (password === '123') {

      setUser({ email, password });
      navigate('/');
    }
    // setUser({ email, password });
  };

  const logout = () => {
    console.log('logout');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}