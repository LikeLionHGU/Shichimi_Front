import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StoreDetail from './pages/StoreDetail';
import MainLayout from './Layouts/MainLayout';
import AddTmi from "./pages/AddTmi"; 
import { GlobalStyle } from './assets/styles/StyledComponents';


export default function App() {
  return (
    <>
      <GlobalStyle/>
      <BrowserRouter>
          <Routes>
            <Route element={<MainLayout/>}> 
              <Route path="/" element={<Home />} />
              <Route path="/info/:marketId" element={<StoreDetail />} />
              <Route path="/add" element={<AddTmi />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </>
  );
}
