// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/account/login';
import DataProvider from './context/DataProvider';
import Header from './components/header/Header';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/home/Home';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = sessionStorage.getItem('isAuthenticated');
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  const logoutUser = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    sessionStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <DataProvider>
      <BrowserRouter>
        <Header isAuthenticated={isAuthenticated} logoutUser={logoutUser} />
        <div style={{ paddingTop: '10px' }}>
          <Routes>
            <Route path='/login' element={<Login isUserAuthenticated={setIsAuthenticated} />} />
            <Route
              path='/'
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Outlet />
                </PrivateRoute>
              }
            >
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
