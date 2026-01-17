import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../config/api";

// React Icons
import {
  FaSpa,
  FaShoppingBag,
  FaGlassCheers,
  FaUtensils,
  FaSketch,
  FaSchool,
  FaChartLine,
  FaTrophy,
  FaChalkboardTeacher,
  FaBullhorn,
  FaHandshake,
  FaStar,
  FaLaptopCode,
  FaRocket,
} from "react-icons/fa";

export default function Franchise() {
  const [data, setData] = useState({ content: "", page: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await API.get("franchise/"); // /api/franchise/
        setData(response.data);
      } catch (err) {
        console.error("Error fetching franchise data:", err);
        setError("Failed to load franchise page data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-black">
  //       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
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
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section
        className="relative bg-fixed bg-center bg-cover h-screen text-white flex items-center justify-center border-b border-white"
        style={{
          backgroundImage:
            "url('https://www.causeway.com/hs-fs/hubfs/iStock-1225020118-1-scaled.webp?width=1600&height=1000&name=iStock-1225020118-1-scaled.webp')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Centered Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold  leading-tight">
            {data.page || "Franchise"}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-8">
            Join our successful franchise network
          </p>

          {/* CTA Button */}
          <a
            href="#view"
            className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transform hover:-translate-y-1 transition-all inline-block"
          >
            View More
          </a>
        </div>
      </section>

      {/* Franchise Opportunities */}
      <section
        className="relative bg-fixed bg-center bg-cover"
        id="view"
        style={{
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/previews/026/793/730/large_2x/double-exposure-of-a-business-man-using-laptop-on-his-desk-front-view-office-background-realistic-image-ultra-hd-high-design-very-detailed-photo.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          {/* Section Title */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-16">
            Franchise Opportunities
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "Beauty Salon",
                icon: <FaSpa />,
                investment: "$50K - $100K",
                description: "Complete beauty salon franchise",
                benefits: [
                  "Brand Recognition",
                  "Training Support",
                  "Marketing Materials",
                  "Equipment",
                ],
              },
              {
                title: "Cosmetics Store",
                icon: <FaShoppingBag />,
                investment: "$30K - $80K",
                description: "Premium cosmetics retail franchise",
                benefits: [
                  "Product Supply",
                  "Store Design",
                  "Staff Training",
                  "Inventory Management",
                ],
              },
              {
                title: "Event Hall",
                icon: <FaGlassCheers />,
                investment: "$100K - $200K",
                description: "Event venue and catering franchise",
                benefits: [
                  "Venue Setup",
                  "Catering Services",
                  "Event Planning",
                  "Staff Support",
                ],
              },
              {
                title: "Food Court",
                icon: <FaUtensils />,
                investment: "$80K - $150K",
                description: "Multi-cuisine food court franchise",
                benefits: [
                  "Kitchen Setup",
                  "Menu Planning",
                  "Staff Training",
                  "Quality Control",
                ],
              },
              {
                title: "Designing Studio",
                icon: <FaSketch />,
                investment: "$40K - $90K",
                description: "Fashion design and tailoring franchise",
                benefits: [
                  "Design Software",
                  "Equipment",
                  "Fabric Supply",
                  "Training",
                ],
              },
              {
                title: "Academy",
                icon: <FaSchool />,
                investment: "$60K - $120K",
                description: "Beauty and fashion training academy",
                benefits: [
                  "Curriculum",
                  "Teaching Materials",
                  "Certification",
                  "Placement Support",
                ],
              },
            ].map((franchise, index) => (
              <div
                key={index}
                className="bg-white/20 border border-gray-700 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
              >
                {/* Icon */}
                <div className="text-5xl mb-6 flex justify-center text-white">
                  {franchise.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl text-white font-semibold text-center mb-3">
                  {franchise.title}
                </h3>

                {/* Investment Badge */}
                <div className="text-center mb-5">
                  <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                    {franchise.investment}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-6 text-center text-sm leading-relaxed">
                  {franchise.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-2">
                  {franchise.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-center text-sm text-gray-300"
                    >
                      <span className="text-white mr-2">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Franchise With Us */}
      <section
        className="relative bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://tse4.mm.bing.net/th/id/OIP._zSQqhjfOh_s0PlukCF0cAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3')",
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-white">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Franchise With Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Proven Success",
                icon: <FaChartLine />,
                description: "Established business model",
              },
              {
                name: "Brand Recognition",
                icon: <FaTrophy />,
                description: "Well-known brand name",
              },
              {
                name: "Training Support",
                icon: <FaChalkboardTeacher />,
                description: "Comprehensive training programs",
              },
              {
                name: "Marketing Support",
                icon: <FaBullhorn />,
                description: "Marketing and advertising help",
              },
              {
                name: "Ongoing Support",
                icon: <FaHandshake />,
                description: "Continuous business support",
              },
              {
                name: "Quality Products",
                icon: <FaStar />,
                description: "Premium products and services",
              },
              {
                name: "Technology",
                icon: <FaLaptopCode />,
                description: "Modern business systems",
              },
              {
                name: "Growth Potential",
                icon: <FaRocket />,
                description: "Expansion opportunities",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md p-8 rounded-lg hover:bg-white/20 transition-colors text-center"
              >
                <div className="text-4xl mb-4 mx-auto">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.name}</h3>
                <p className="text-sm text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="relative bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://tse4.mm.bing.net/th/id/OIP._zSQqhjfOh_s0PlukCF0cAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3')",
        }}
      >
        <div className="absolute inset-0 bg-white/90"></div>
        <div className="relative max-w-4xl mx-auto text-center px-6 py-20">
          <h2 className="text-4xl font-bold text-black mb-6">
            Ready to Own Your Business?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Join our franchise network and start your entrepreneurial journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors">
              Apply Now
            </button>
            <button className="border-2 border-black text-black px-8 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition-colors">
              Download Brochure
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
