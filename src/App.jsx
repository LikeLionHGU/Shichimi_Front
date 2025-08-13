import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StoreDetail from './pages/StoreDetail';
import MainLayout from './Layouts/MainLayout';
import AddTmi from "./pages/AddTmi"; 

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<MainLayout/>}> 
            <Route path="/" element={<Home />} />
            <Route path="/store/:id" element={<StoreDetail />} />
            <Route path="/add" element={<AddTmi />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}
