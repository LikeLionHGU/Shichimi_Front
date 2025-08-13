import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StoreDetail from './pages/StoreDetail';
import MainLayout from './Layouts/MainLayout';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<MainLayout/>}> 
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<StoreDetail />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}
