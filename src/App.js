import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Catalog from "./components/Catalog/Catalog";
import ProductDetail from "./components/Catalog/Product/ProductDetail";
import CatalogProvider from "./components/Catalog/Context/CatalogContext";

import "./App.css";
const App = () => (
  <CatalogProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </Router>
  </CatalogProvider>
);

export default App;
