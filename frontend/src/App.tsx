import React from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';
import Login from './pages/login';
import NotFound from './pages/notFount';
import Home from './pages/home';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/404" element={ <NotFound /> } />
      <Route path="*" element={ <Navigate to="/404" /> } />
    </Routes>
  );
}

export default App;
