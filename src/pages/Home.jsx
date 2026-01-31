import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../config/api";

import {
  ShoppingCart,
  Package,
  User,
  Scissors,
  Palette,
  Building,
  Utensils,
  Heart,
  GraduationCap,
  Award,
  Star,
  ArrowRight,
  BookOpen,
  ShoppingBag,
} from "lucide-react";

import cosmeticsImg from "../assets/images/cosmatics.png";
import cosmetics_bg from "../assets/images/cos-bg.jpg";
import LOGO from "../assets/images/logo.png";



function Counter({ value }) {
  const numericValue = parseInt(value);
  const suffix = value.replace(numericValue, "");

  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.4 } // 40% visible
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const duration = 1500;
    const step = Math.ceil(numericValue / (duration / 14));

    const timer = setInterval(() => {
      start += step;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [hasStarted, numericValue]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}


export default function JajisHomepage() {
  const stats = [
    { number: "10+", label: "Years Experience" },
    { number: "5000+", label: "Happy Customers" },
    { number: "75+", label: "Expert Staff" },
    { number: "7", label: "Business Verticals" },
  ];

  const [data, setData] = useState({ video: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Business sections data
  const businesses = [
    {
      id: "salons",
      title: "Salons",
      description:
        "Experience luxury and elegance at our premium salon services. From haircuts to spa treatments, we offer comprehensive beauty solutions with expert professionals.",
      icon: <Scissors className="w-8 h-8" />,
      link: "/salons",
      layout: "left",
      bgImage:
        "https://png.pngtree.com/thumb_back/fh260/background/20230425/pngtree-salon-service-salon-design-hd-image_2512958.jpg",
      cardImage:
        "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=2069&q=80",
    },
    {
      id: "cosmetics",
      title: "Cosmetics",
      description:
        "Discover our wide range of premium cosmetics designed to bring out the best in you. Quality products for every skin type and occasion.",
      icon: <Palette className="w-8 h-8" />,
      link: "/cosmetics",
      layout: "right",
      bgImage: cosmetics_bg,
      cardImage: cosmeticsImg,
    },
    {
      id: "event-hall",
      title: "Event Hall",
      description:
        "Make your special occasions unforgettable with our elegant event hall. Perfect for weddings, corporate events, and celebrations of all kinds.",
      icon: <Building className="w-8 h-8" />,
      link: "/event-hall",
      layout: "left",
      bgImage:
        "https://assets.simplotel.com/simplotel/image/upload/x_0,y_100,w_1920,h_1080,r_0,c_crop,q_80,fl_progressive/w_900,f_auto,c_fit/jenneys-residency-coimbatore/diamond_banquet_hall_with_seating_arrangement_for_conference_and_weddings4_wq7t1z",
      cardImage:
        "https://www.princehotels.com/shinyokohama/wp-content/uploads/sites/8/2019/06/Z7T7769%E5%B0%8F.jpg",
    },
    {
      id: "food-court",
      title: "Food Court",
      description:
        "Savor delicious cuisines from around the world at our vibrant food court. Fresh ingredients, authentic flavors, and memorable dining experiences.",
      icon: <Utensils className="w-8 h-8" />,
      link: "/food-court",
      layout: "right",
      bgImage:
        "https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=2074&q=80",
      cardImage:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: "designing-stitching",
      title: "Designing & Stitching",
      description:
        "Create custom fashion pieces with our expert designing and stitching services. From traditional wear to contemporary fashion, we bring your vision to life.",
      icon: <Heart className="w-8 h-8" />,
      link: "/designing-stitching",
      layout: "left",
      bgImage:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=2074&q=80",
      cardImage:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=2071&q=80",
    },
    {
      id: "academy",
      title: "Academy",
      description:
        "Learn from the best with our comprehensive training programs. Develop your skills in beauty, fashion, and hospitality with expert guidance and certification.",
      icon: <GraduationCap className="w-8 h-8" />,
      link: "/academy",
      layout: "right",
      bgImage:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2070&q=80",
      cardImage:
        "https://media.istockphoto.com/id/1440040207/photo/stylish-students-walking-in-city.jpg?s=612x612&w=0&k=20&c=XzJGLxO0IwmI8LHpdbf4LQlf8Pgye-Lx5ycpvUb8KBk=",
    },
    {
      id: "franchise",
      title: "Franchise",
      description:
        "Join the Jajis family and start your own successful business venture. We provide complete support, training, and resources for franchise partners.",
      icon: <Award className="w-8 h-8" />,
      link: "/franchise",
      layout: "left",
      bgImage: "https://nucleoniitjeekota.com/img/Franchisee.jpg",
      cardImage:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2071&q=80",
    },
  ];

  // Fetch banner image from Django backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Django home view is mapped to path '' under /api/, so this hits /api/
        const response = await API.get("");
        setData(response.data);
      } catch (err) {
        setError(err.message || "Failed to load home page");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        {/* Logo */}
        <img
          src={LOGO}
          alt="Jajis Lifestyle"
          className="h-24 w-auto mb-6 animate-pulse"
        />

        {/* Spinner */}
        <div className="h-7 w-7 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
      </div>
    );
  }

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

  // Resolve banner image URL (if backend provides one)
  const heroImageRaw = data.video?.image || data.video?.image_url || null;
  const getFullUrl = (u) => {
    if (!u) return null;
    // If backend sends absolute URL, use it directly. If it's a relative path
    // like "/media/...", prefix with current origin so it works on both dev and prod.
    return u.startsWith("http") ? u : `${window.location.origin}${u}`;
  };
  const heroImage = getFullUrl(heroImageRaw);

  const BusinessSection = ({ business }) => {
    const isLeft = business.layout === "left";

    return (
      <section
        className="relative w-full min-h-screen bg-fixed bg-center bg-cover bg-no-repeat flex items-center"
        style={{
          backgroundImage: `url(${business.bgImage})`,
        }}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 ${
            isLeft
              ? "bg-gradient-to-r from-black/85 via-black/60 to-black/10"
              : "bg-gradient-to-l from-black/85 via-black/60 to-black/10"
          }`}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 py-20">
          <div
            className={`flex flex-col md:flex-row items-center ${
              !isLeft ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* TEXT */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-6">
                <div className="p-4 bg-white text-black rounded-full shadow-xl">
                  {business.icon}
                </div>
              </div>

              <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                {business.title}
              </h2>

              <p className="text-base sm:text-lg md:text-xl mb-10 leading-relaxed text-gray-200 max-w-xl mx-auto md:mx-0">
                {business.description}
              </p>

              <Link
                to={business.link}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold shadow-lg hover:bg-gray-200 hover:scale-105 transition-all duration-300"
              >
                Explore {business.title}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* IMAGE CARD */}
            <div className="w-full md:w-1/2 mt-12 md:mt-0">
              <div
                className={`relative h-80 md:h-[520px] rounded-3xl overflow-hidden shadow-2xl ${
                  !isLeft ? "md:mr-12" : "md:ml-12"
                }`}
              >
                <img data-aos="zoom-in"
                  src={business.cardImage}
                  alt={`${business.title} showcase`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section
        id="home"
        className="relative h-[100vh] overflow-hidden bg-fixed bg-center bg-cover" data-aos="fade-in"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-20 flex items-center justify-center h-full">
          <div className="max-w-5xl px-6 md:px-12 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight animate-slideUp uppercase">
              Step into Jaji’s
            </h1>

            <p className="mt-6 text-gray-100 text-xl md:text-3xl animate-fadeIn delay-300">
              where beauty isn’t just experienced—it's created
            </p>

            <p className="mt-4 text-md md:text-base text-gray-200 max-w-3xl mx-auto">
              From our salons and cafés to our exclusive Jaji’s cosmetics line,
              we bring skin, hair, and self-care essentials right to your
              fingertips. Discover Jaji’s online store and embrace your
              signature lifestyle
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-5 justify-center animate-fadeIn delay-500">
              <Link
                to="/products"
                className="relative px-6 py-4 border border-white text-white hover:bg-white hover:text-black font-semibold flex items-center justify-center uppercase hover:scale-105 transition-transform duration-300"
              >
                Shop Online
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-black text-white">
        <div className="pb-8 text-center px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-wide">
            Shop With Jajis
          </h2>

          <p className="text-gray-400 max-w-xl mx-auto mb-6 text-sm md:text-base">
            Your one-stop destination for premium beauty, lifestyle, and fashion
            products.
          </p>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-4" data-aos="zoom-in">
            <Link
              to="/products"
              className="flex flex-col items-center justify-center gap-2 
                   bg-white text-black border border-white
                   w-full sm:w-auto px-4 py-3 rounded-xl 
                   shadow hover:bg-gray-100 transition"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase">Shop</span>
            </Link>

            <Link
              to="/myorders"
              className="flex flex-col items-center justify-center gap-2 
                   bg-black text-white border border-white
                   w-full sm:w-auto px-4 py-3 rounded-xl 
                   shadow hover:bg-gray-800 transition"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase">Orders</span>
            </Link>

            <Link
              to="/wishlist"
              className="flex flex-col items-center justify-center gap-2 
                   bg-red-700 text-white 
                   w-full sm:w-auto px-4 py-3 rounded-xl 
                   shadow hover:bg-red-600 transition"
            >
              <Heart className="w-5 h-5" fill="currentColor" />
              <span className="text-xs font-semibold uppercase">Wishlist</span>
            </Link>

            <Link
              to="/profile"
              className="flex flex-col items-center justify-center gap-2 
                   bg-gray-700 text-white 
                   w-full sm:w-auto px-4 py-3 rounded-xl 
                   shadow hover:bg-gray-600 transition"
            >
              <User className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase">Profile</span>
            </Link>
          </div>
        </div>

        {/* STATS */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition"
              >
                <div className="text-2xl md:text-3xl font-extrabold mb-1">
                  <Counter value={stat.number} />
                </div>

                <div className="text-xs md:text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Sections */}
      {businesses.map((business) => (
        <BusinessSection key={business.id} business={business} />
      ))}

      {/* Call to Action Section */}
      <section className="py-20 bg-white text-black text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience Excellence?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Jajis Lifestyle for
            all their needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition duration-300"
            >
              Get in Touch
            </Link>
            <Link
              to="/about-us"
              className="border-2 border-black text-black px-8 py-4 rounded-full font-semibold hover:bg-black hover:text-white transition duration-300"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
