import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import Login from './pages/Login/Login';
import Home from './pages/Home/Home';

import { AuthProvider, AuthContext } from './context/auth';


const AppRoutes = () => {

  const PrivateRoutes = ({ children }) => {
    const { authenticated } = useContext(AuthContext);

    if (!authenticated) {
      return (
        <Navigate to="/login" />
      );
    }

    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="login" element={<Login />} />
          <Route
            exact path="/"
            element={
              <PrivateRoutes>
                <Home />
              </PrivateRoutes>}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default AppRoutes;