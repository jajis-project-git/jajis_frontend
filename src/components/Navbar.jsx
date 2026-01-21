import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  Package,
  Heart,
  User,
  Home,
  Store,
} from "lucide-react";
import logo from "../assets/images/logo.png";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/salons", label: "Salons" },
    { path: "/cosmetics", label: "Cosmetics" },
    { path: "/event-hall", label: "Event Hall" },
    { path: "/food-court", label: "Food Court" },
    { path: "/designing-stitching", label: "Designing & Stitching" },
    { path: "/academy", label: "Academy" },
    { path: "/franchise", label: "Franchise" },
    { path: "/management", label: "Management" },
    { path: "/about-us", label: "About Us" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* ================= TOP NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b border-gray-100">
        <div className="flex justify-between items-center px-6 lg:px-12 h-24 relative">
          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="text-black hover:opacity-70 transition"
          >
            <Menu className="w-10 h-auto text-red-500" />
          </button>

          {/* Logo */}
          <Link
            to="/products"
            className="absolute left-1/2 transform -translate-x-1/2"
          >
            <img src={logo} alt="Logo" className="h-20 w-auto" />
          </Link>

          {/* Right */}
          <div className="flex items-center gap-3">
            <Link
              to="/products"
              className="hidden md:block me-6 border border-black font-semibold px-4 py-2 bg-black text-white transition animate-colorChange"
            >
              SHOP ONLINE
            </Link>

            <Link
              to={isAuthenticated ? "/profile" : "/login"}
              className="flex items-center justify-center p-2 border border-gray-900 rounded-full hover:bg-gray-200 transition"
            >
              <User className="w-6 h-6 text-gray-800" />
              {!isAuthenticated && <span className="ml-2 text-lg">Login</span>}
            </Link>
          </div>
        </div>
      </nav>

      {/* ================= FULLSCREEN MENU ================= */}
      <div
        className={`fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center transition-all duration-700 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-8 right-8"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="absolute top-8 left-8">
          <img src={logo} alt="Logo" className="h-12" />
        </div>

        <div className="flex flex-col space-y-4 text-center">
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`text-3xl md:text-4xl font-extrabold uppercase ${
                location.pathname === item.path
                  ? "text-red-600"
                  : "text-black hover:text-red-400"
              }`}
              style={{
                animation: `slideIn 0.5s ease-out ${index * 0.05}s both`,
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="absolute bottom-12 right-12 hidden lg:flex flex-col gap-4">
          <FaInstagram className="text-xl hover:text-purple-600" />
          <FaFacebookF className="text-xl hover:text-purple-600" />
          <FaYoutube className="text-xl hover:text-purple-600" />
        </div>
      </div>

      {/* ================= FLOATING ACTION BUTTONS ================= */}
      <div className="fixed bottom-4 right-6 z-[90] hidden md:flex flex-col gap-3">
        <Link
          to="/cart"
          className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-full shadow-lg"
        >
          <ShoppingCart className="w-5 h-5" />
          Cart
        </Link>

        <Link
          to="/myorders"
          className="flex items-center gap-2 bg-white border px-4 py-2.5 rounded-full"
        >
          <Package className="w-5 h-5" />
          Orders
        </Link>

        <Link
          to="/wishlist"
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2.5 rounded-full"
        >
          <Heart className="w-5 h-5" />
          Wishlist
        </Link>
      </div>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <div className="fixed bottom-0 left-0 right-0 z-[95] bg-white border-t shadow-md md:hidden">
        <div className="grid grid-cols-5 h-16">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center text-xs ${
              location.pathname === "/" ? "text-red-600" : "text-gray-600"
            }`}
          >
            <Home className="w-5 h-5" />
            Home
          </Link>

          <Link
            to="/products"
            className={`flex flex-col items-center justify-center text-xs ${
              location.pathname.startsWith("/products")
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            <Store className="w-5 h-5" />
            Shop
          </Link>

          <Link
            to="/cart"
            className={`flex flex-col items-center justify-center text-xs ${
              location.pathname === "/cart" ? "text-red-600" : "text-gray-600"
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            Cart
          </Link>

          <Link
            to="/wishlist"
            className={`flex flex-col items-center justify-center text-xs ${
              location.pathname === "/wishlist"
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            <Heart className="w-5 h-5" />
            Wishlist
          </Link>

          <Link
            to={isAuthenticated ? "/profile" : "/login"}
            className={`flex flex-col items-center justify-center text-xs ${
              location.pathname === "/profile" || location.pathname === "/login"
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            <User className="w-5 h-5" />
            {isAuthenticated ? "Profile" : "Login"}
          </Link>
        </div>
      </div>

      {/* ================= ANIMATION ================= */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
