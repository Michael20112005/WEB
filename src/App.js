import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Catalog from "./components/Catalog/Catalog";
import ProductDetail from "./components/Product/ProductDetail";
import ShoppingCart from "./components/Cart/ShoppingCart";
import Checkout from "./components/Checkout/Checkout"; // Новий компонент
import Success from "./components/Success/Success"; // Новий компонент
import "./App.css";

const App = () => (
  <Router>
    <Header />
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} /> {/* Новий маршрут */}
        <Route path="/success" element={<Success />} /> {/* Новий маршрут */}
      </Routes>
    </main>
    <Footer />
  </Router>
);

export default App;
