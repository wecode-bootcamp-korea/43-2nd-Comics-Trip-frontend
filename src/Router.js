import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import BookCase from './pages/BookCase/BookCase';
import KakaoAuth from './components/Login/KakaoAuth';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/productdetail/:id" element={<ProductDetail />} />
        <Route path="/bookcase" element={<BookCase />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
