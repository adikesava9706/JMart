import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../components/Header/Header";
import SearchBar from "../components/Header/SearchBar";
import Footer from "../components/Footer/Footer";
import LandingPage from "./pages/LandingPage";
import CheckoutPage from "./pages/CheckoutPage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SearchResult from "./pages/SearchResult";
import AllProducts from "./pages/AllProducts";
import ContactUs from "./pages/ContactUs";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
