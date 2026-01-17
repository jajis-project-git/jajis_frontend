import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../config/api";

import AboutImg from "../assets/images/cosmatics.png";

// Import required icons
import {
  FaRegSmile,
  FaEye,
  FaKissWinkHeart,
  FaSpa,
  FaPaintBrush,
  FaSprayCan,
  FaSun,
  FaTint,
  FaHandSparkles,
} from "react-icons/fa";

export default function Cosmetics() {
  const categories = [
    {
      title: "Face Cream",
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
      price: "₹899",
      icon: <FaHandSparkles className="text-pink-400 text-4xl mx-auto" />,
      description:
        "Moisturizing creams, anti-aging serums, and face treatments",
    },
    {
      title: "Shampoo",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2025/8/534793762/DK/AX/ME/42061417/ghkghk-500x500.jpeg",
      price: "₹549",
      icon: <FaSpa className="text-pink-400 text-4xl mx-auto" />,
      description: "Gentle cleansing shampoos for all hair types",
    },
    {
      title: "Lipstick",
      image:
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
      price: "₹699",
      icon: <FaKissWinkHeart className="text-pink-400 text-4xl mx-auto" />,
      description: "Bold and beautiful lip colors in matte and glossy finishes",
    },
    {
      title: "Foundation",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
      price: "₹1299",
      icon: <FaTint className="text-pink-400 text-4xl mx-auto" />,
      description: "Full coverage liquid foundation for flawless complexion",
    },
  ];

  const [data, setData] = useState({ content: "", page: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await API.get("cosmetics/"); // /api/cosmetics/
        setData(response.data);
      } catch (err) {
        console.error("Error fetching cosmetics data:", err);
        setError("Failed to load cosmetics page data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-black">
  //       <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-white"></div>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Oops!</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      {/* Hero Banner Section with Fixed Background */}
      <div
        className="relative h-[100vh] w-full bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29zbWV0aWN8ZW58MHx8MHx8fDA%3D")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent">
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <h1
              className="text-5xl md:text-7xl font-bold mb-2 text-white"
              data-aos="fade-down"
            >
              Cosmetics
            </h1>
            <p
              className="text-xl md:text-2xl max-w-3xl mb-6 text-gray-300"
              data-aos="fade-up"
            >
              Where Beauty Meets Excellence - Professional Services Since 2011
            </p>
            <div
              className="flex flex-wrap gap-4 justify-center"
              data-aos="fade-up"
            >
              <a
                href="/products"
                className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transform hover:-translate-y-1 transition-all"
              >
                Buy Products
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-32 px-4 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* IMAGE FIRST ON MOBILE */}
            <div className="relative order-1 lg:order-2">
              <div className="aspect-square  overflow-hidden">
                <img
                  src={AboutImg}
                  alt="About our brand"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* TEXT SECOND ON MOBILE */}
            <div className="order-2 lg:order-1">
              <h2 className="text-5xl font-thin mb-8 tracking-wide">
                About Our Brand
              </h2>
              <div className="w-24 h-px bg-black mb-8"></div>
              <p className="text-lg leading-relaxed mb-6 text-gray-700">
                For over two decades, we have been at the forefront of beauty
                innovation, crafting products that enhance natural beauty while
                maintaining the highest standards of quality and luxury.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                Our commitment to excellence drives us to source the finest
                ingredients and work with renowned beauty experts to create
                products that deliver exceptional results.
              </p>
              <button className="border border-black px-8 py-3 text-sm tracking-widest hover:bg-black hover:text-white transition-all duration-300">
                OUR STORY
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cosmetics Products Section with Fixed Background */}
      <section
        className="py-28 bg-fixed bg-cover bg-center relative"
        style={{
          backgroundImage: `
          linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)),
          url("https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80")
        `,
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light text-white mb-4 tracking-wide">
              Jaji's Products
            </h2>
            <div className="w-20 h-1 bg-white mx-auto rounded-full"></div>
          </div>

          {/* Cards */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
            data-aos="fade-up"
          >
            {categories.map((category, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-white/20 hover:bg-white/20 transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white text-black text-xs px-3 py-1 rounded-full shadow-md">
                    {category.price}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-2xl text-white font-light text-center mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-300 text-center text-sm mb-6">
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* View More Button */}
        <div className="text-center mt-12">
          <a
            href=""
            className="px-6 py-3 bg-transparent text-white text-sm font-semibold uppercase tracking-wide border border-white hover:bg-white hover:text-black hover:shadow-md transition-all duration-300"
          >
            Buy Now
          </a>
        </div>
      </section>

      {/* Call to Action Section */}
      <div className="py-32 bg-black">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl font-thin mb-8 tracking-wide">
            Embrace Your Beauty
          </h2>
          <div className="w-32 h-px bg-white mx-auto mb-12"></div>
          <p className="text-xl font-light mb-12 opacity-80 leading-relaxed">
            Transform your daily routine with our premium collection of beauty
            essentials
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href=""
              className="border border-white px-12 py-4 text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-500"
            >
              SHOP COLLECTION
            </a>
            <a
              href="/salons"
              className="bg-white text-black px-12 py-4 text-sm tracking-widest hover:bg-gray-100 transition-all duration-300"
            >
              Salon
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
