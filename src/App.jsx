import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

import AOS from "aos";
import "aos/dist/aos.css";

// Pages
import Home from "./pages/Home";
import Salons from "./pages/Salons";
import SalonDetails from "./pages/salon_details";
import Cosmetics from "./pages/Cosmetics";
import EventHall from "./pages/EventHall";
import FoodCourt from "./pages/FoodCourt";
import DesigningStitching from "./pages/DesigningStitching";
import Academy from "./pages/Academy";
import Franchise from "./pages/Franchise";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";

// Auth
import Login from "./pages/E-Login";
import Register from "./pages/E-Register";
import ForgotPassword from "./pages/E-forgot-password";

// E-commerce
import Product from "./pages/E-product_list";
import ProductDetails from "./pages/E-product_details";
import Cart from "./pages/E-cart";
import WishList from "./pages/E-wishlist";
import MyOrders from "./pages/E-myorders";
import UserProfile from "./pages/E-user_profile";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />

      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>

            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/salons" element={<Salons />} />
            <Route path="/salons/:id" element={<SalonDetails />} />
            <Route path="/cosmetics" element={<Cosmetics />} />
            <Route path="/event-hall" element={<EventHall />} />
            <Route path="/food-court" element={<FoodCourt />} />
            <Route
              path="/designing-stitching"
              element={<DesigningStitching />}
            />
            <Route path="/academy" element={<Academy />} />
            <Route path="/franchise" element={<Franchise />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* E-Commerce */}
            <Route path="/products" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myorders"
              element={
                <ProtectedRoute>
                  <MyOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <WishList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />

          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
