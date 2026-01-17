import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../config/api";

// React Icons
import {
  FaChurch,
  FaBuilding,
  FaBirthdayCake,
  FaSuitcase,
  FaTheaterMasks,
  FaStoreAlt,
  FaUtensils,
  FaWifi,
  FaCar,
  FaPaintBrush,
  FaUsers,
  FaSnowflake,
  FaLock,
  FaMusic,
  FaCheck,
  FaCalendarCheck,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function EventHall() {
  const [data, setData] = useState({ content: "", page: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await API.get("event-hall/"); // /api/event-hall/
        setData(response.data);
      } catch (err) {
        console.error("Error fetching event hall data:", err);
        setError("Failed to load event hall page data");
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
      {/* Hero Section */}
      <div
        className="relative h-[100vh] w-full bg-fixed bg-cover bg-center border-b border-white"
        style={{
          backgroundImage: `url("https://www.daiwikhotels.com/wp-content/uploads/2024/07/varta-2.jpg")`,
        }}
      >
        <div className="absolute inset-0 bg-black/60">
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-2 text-white">
              {data.page}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mb-6 text-gray-300">
              Celebrate life’s most important moments in style.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#event"
                className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transform hover:-translate-y-1 transition-all"
              >
                View More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Venue Types */}
      <section
        id="event"
        className="relative bg-fixed bg-center bg-cover py-20"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/empty-dark-luxury-stage-ceremonial-celebrations_956920-59174.jpg')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Section Title */}
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Our Premium Event Venues
          </h2>

          {/* Venues Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AC Conference Halls",
                image:
                  "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
                description:
                  "Modern air-conditioned conference halls equipped with latest technology for professional meetings and corporate events.",
                capacity: "50-300 attendees",
              },
              {
                title: "Auditoriums",
                image:
                  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
                description:
                  "Spacious auditoriums with premium acoustics and seating arrangements perfect for presentations and seminars.",
                capacity: "300-800 attendees",
              },
              {
                title: "Banquet Halls",
                image:
                  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
                description:
                  "Luxurious banquet halls with elegant decor and fine dining facilities for special celebrations and gatherings.",
                capacity: "100-500 guests",
              },
              {
                title: "Convention Halls",
                image:
                  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
                description:
                  "Large-scale convention halls designed for exhibitions, trade shows, and major business events with flexible layouts.",
                capacity: "500-2000 visitors",
              },
              {
                title: "Kalyana Mandapams",
                image:
                  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=800&q=80",
                description:
                  "Traditional wedding halls with beautiful mandap decorations and cultural ambiance for memorable wedding ceremonies.",
                capacity: "200-800 guests",
              },
              {
                title: "Reception Hall",
                image:
                  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
                description:
                  "Elegant reception halls perfect for wedding receptions, anniversaries, and milestone celebrations with premium amenities.",
                capacity: "150-600 guests",
              },
            ].map((venue, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={venue.image}
                    alt={venue.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    <FaUsers className="inline mr-1" />
                    {venue.capacity}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {venue.title}
                  </h3>
                  <p className="text-gray-200 mb-6 text-sm leading-relaxed">
                    {venue.description}
                  </p>

                  {/* Book Now Button */}
                  <a
                    href="tel:"
                    className="w-full bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <FaCalendarCheck />
                    Book Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
            {/* CTA Section */}
      <section className="bg-black py-8 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Plan Your Event?</h2>
       
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:" className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 hover:text-black transition">
              Contact Us
            </a>
         
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section
        className="bg-fixed bg-center bg-cover relative"
        style={{
          backgroundImage:
            "url('https://mir-s3-cdn-cf.behance.net/project_modules/1400/cb314b79011255.5cb606d8c8401.jpg')",
        }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          {/* Section Title */}
          <h2 className="text-4xl font-bold text-center text-white mb-6">
            Venue Amenities
          </h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
            Explore our premium amenities designed to make your events seamless,
            stylish, and unforgettable.
          </p>

          {/* Amenities Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Catering Services", icon: <FaUtensils /> },
              { name: "Audio/Visual Equipment", icon: <FaMusic /> },
              { name: "Free WiFi", icon: <FaWifi /> },
              { name: "Parking Space", icon: <FaCar /> },
              { name: "Decoration Services", icon: <FaPaintBrush /> },
              { name: "Professional Staff", icon: <FaUsers /> },
              { name: "Climate Control", icon: <FaSnowflake /> },
              { name: "Security Services", icon: <FaLock /> },
            ].map((amenity, index) => (
              <div
                key={index}
                className="group text-center p-6 bg-gray-900/80 rounded-2xl shadow-lg hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-3 text-white text-4xl transition-colors duration-300 transform group-hover:scale-110">
                  {amenity.icon}
                </div>
                <p className="text-white text-sm font-medium transition-colors">
                  {amenity.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
