import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ShoppingCart, ShoppingBag, Heart, User } from "lucide-react";
import Logo from "../assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white rounded-t-3xl w-[95%] mx-auto mt-20">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-14">

        {/* === Top Shop Section === */}
        <section className="py-12 text-white text-center border-b border-gray-800">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-wide">
            Shop With Jajis
          </h2>

          <p className="text-gray-400 max-w-xl mx-auto mb-8 text-sm md:text-base">
            Your one-stop destination for premium beauty, lifestyle, and
            fashion products.
          </p>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-5">
            <Link
              to="/products"
              className="flex flex-col items-center justify-center gap-2 
                         bg-white text-black border border-white
                         w-full sm:w-auto px-5 py-3 rounded-xl 
                         shadow hover:bg-gray-100 transition"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase">Shop</span>
            </Link>

            <Link
              to="/myorders"
              className="flex flex-col items-center justify-center gap-2 
                         bg-black text-white border border-white
                         w-full sm:w-auto px-5 py-3 rounded-xl 
                         shadow hover:bg-gray-800 transition"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase">Orders</span>
            </Link>

            <Link
              to="/wishlist"
              className="flex flex-col items-center justify-center gap-2 
                         bg-red-700 text-white 
                         w-full sm:w-auto px-5 py-3 rounded-xl 
                         shadow hover:bg-red-600 transition"
            >
              <Heart className="w-5 h-5" fill="currentColor" />
              <span className="text-xs font-semibold uppercase">
                Wishlist
              </span>
            </Link>

            <Link
              to="/profile"
              className="flex flex-col items-center justify-center gap-2 
                         bg-gray-700 text-white 
                         w-full sm:w-auto px-5 py-3 rounded-xl 
                         shadow hover:bg-gray-600 transition"
            >
              <User className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase">Profile</span>
            </Link>
          </div>
        </section>

        {/* === Main Footer Content === */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mt-12">

          {/* Logo & Description */}
          <div className="md:col-span-2">
            <img
              src={Logo}
              alt="Jajis Logo"
              className="h-28 w-auto mb-4 filter brightness-0 invert"
            />
            <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-lg">
              Experience{" "}
              <span className="text-white font-semibold">beauty</span>,{" "}
              <span className="text-white font-semibold">lifestyle</span>, and{" "}
              <span className="text-white font-semibold">entertainment</span>{" "}
              like never before. Jajis brings everything under one luxurious
              brand.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                ["Salons", "/salons"],
                ["Cosmetics", "/cosmetics"],
                ["Event Hall", "/event-hall"],
                ["Food Court", "/food-court"],
                ["Academy", "/academy"],
                ["Franchise", "/franchise"],
                ["Management", "/management"],
                ["About Us", "/about-us"],
                ["Contact", "/contact"],
              ].map(([label, path]) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="hover:text-white transition hover:pl-1"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">
              Follow Us
            </h4>
            <div className="flex space-x-5">
              <a href="#" className="hover:text-red-500 transition">
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-red-500 transition">
                <FaXTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-red-500 transition">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-red-500 transition">
                <FaLinkedinIn className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-red-500 transition">
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* === Bottom Section === */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-medium">Jajis</span>. All rights
            reserved.
          </p>

          <p className="text-sm text-gray-300 hover:text-white transition">
            <a href="https://www.inspirezesttechnologies.com/">
              Developed by InspireZest Technologies Pvt Ltd
            </a>
          </p>

          <div className="flex space-x-6">
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
