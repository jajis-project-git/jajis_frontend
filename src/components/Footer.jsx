import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ShoppingCart, Package, Heart, User } from "lucide-react";
import Logo from "../assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* === Top Shop Section === */}
        <div className="border-b border-gray-700 pb-10 mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6 tracking-wide">
            Shop With Jajis
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8 text-sm md:text-base">
            Your one-stop destination for premium beauty, lifestyle, and fashion products.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {/* 🛍️ Shop Online */}
            <Link
              to="/products"
              className="flex items-center gap-2 bg-black border border-white text-white px-6 py-2.5 rounded-full shadow-lg hover:bg-red-600 hover:border-red-600 transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase">Shop Now</span>
            </Link>

            {/* 📦 My Orders */}
            <Link
              to="/myorders"
              className="flex items-center gap-2 bg-white text-black border border-black px-6 py-2.5 rounded-full shadow-md hover:bg-gray-100 transition-all"
            >
              <Package className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase">My Orders</span>
            </Link>

            {/* ❤️ Wishlist */}
            <Link
              to="/wishlist"
              className="flex items-center gap-2 bg-red-600 border border-red-600 text-white px-6 py-2.5 rounded-full shadow-lg hover:bg-red-700 transition-all"
            >
              <Heart className="w-5 h-5" fill="currentColor" />
              <span className="text-sm font-semibold uppercase">Wishlist</span>
            </Link>

            {/* 👤 Profile */}
            <Link
              to="/profile"
              className="flex items-center gap-2 bg-gray-800 border border-gray-600 text-white px-6 py-2.5 rounded-full shadow-lg hover:bg-gray-700 transition-all"
            >
              <User className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase">Profile</span>
            </Link>
          </div>
        </div>

        {/* === Main Footer Content === */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={Logo}
                alt="Jajis Logo"
                className="h-28 w-auto object-contain filter brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Experience <span className="text-white font-semibold">beauty</span>,{" "}
              <span className="text-white font-semibold">lifestyle</span>, and{" "}
              <span className="text-white font-semibold">entertainment</span> like never before.
              Jajis brings everything under one luxurious brand.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/salons" className="hover:text-white transition">Salons</Link></li>
              <li><Link to="/cosmetics" className="hover:text-white transition">Cosmetics</Link></li>
              <li><Link to="/event-hall" className="hover:text-white transition">Event Hall</Link></li>
              <li><Link to="/food-court" className="hover:text-white transition">Food Court</Link></li>
              <li><Link to="/academy" className="hover:text-white transition">Academy</Link></li>
              <li><Link to="/franchise" className="hover:text-white transition">Franchise</Link></li>
              <li><Link to="/management" className="hover:text-white transition">Management</Link></li>
              <li><Link to="/about-us" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">
              Follow Us
            </h4>
            <div className="flex space-x-5">
              <a href="#" className="hover:text-red-500 transition"><FaFacebookF className="h-5 w-5" /></a>
              <a href="#" className="hover:text-red-500 transition"><FaXTwitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-red-500 transition"><FaInstagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-red-500 transition"><FaLinkedinIn className="h-5 w-5" /></a>
              <a href="#" className="hover:text-red-500 transition"><FaYoutube className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        {/* === Bottom Section === */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} <span className="text-white font-medium">Jajis</span>. All rights reserved.
          </p>
          <p className="text-sm text-gray-200 hover:text-white transition mt-4 md:mt-0">
            <a href="https://www.inspirezesttechnologies.com/">Developed by InspireZesttechnologies Pvt Ltd</a>
          </p>
          <div className="flex space-x-6 mt-4 mb-20 md:mb-0 md:mt-0">
            <Link to="/privacy" className="hover:text-white text-sm transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white text-sm transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
