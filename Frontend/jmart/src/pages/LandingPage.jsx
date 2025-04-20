import React from "react";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/Header/SearchBar";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Footer from "../../components/Footer/Footer";
import TrendingProducts from "../../components/TrendingProducts/TrendingProducts";

function LandingPage() {
  return (
    <>
      <TrendingProducts />
      <ProductGrid />
    </>
  );
}

export default LandingPage;
