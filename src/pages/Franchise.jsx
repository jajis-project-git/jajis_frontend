import { useEffect, useState } from "react";
import { API } from "../config/api";
import {
  FaSpa,
  FaChartLine,
  FaTrophy,
  FaChalkboardTeacher,
  FaBullhorn,
  FaHandshake,
  FaStar,
  FaLaptopCode,
  FaRocket,
  FaBuilding,
} from "react-icons/fa";

export default function Franchise() {
  const [data, setData] = useState({ page: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get("franchise/")
      .then((res) => setData(res.data))
      .catch(() => setError("Failed to load franchise page data"));
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans">
      {/* HERO */}
      <section
        className="relative bg-fixed bg-center bg-cover h-screen text-white flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://www.causeway.com/hs-fs/hubfs/iStock-1225020118-1-scaled.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold">
            {data.page || "Jaji’s Beauty Saloon Franchise"}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mt-4">
            Own a premium beauty brand and build your success with Jaji’s.
          </p>

          <a
            href="#view"
            className="mt-8 inline-block px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition"
          >
            View Opportunity
          </a>
        </div>
      </section>

      {/* FRANCHISE OPPORTUNITY */}
      <section
        id="view"
        className="relative bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/previews/026/793/730/large_2x/double-exposure-of-a-business-man-using-laptop-on-his-desk-front-view-office-background-realistic-image-ultra-hd-high-design-very-detailed-photo.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-extrabold text-center text-white mb-12">
            Beauty Saloon Franchise
          </h2>

          <div className="bg-white/20 backdrop-blur-md border border-gray-600 rounded-2xl p-10 text-white text-center shadow-xl">
            <div className="text-5xl mb-6 flex justify-center">
              <FaSpa />
            </div>

            <h3 className="text-3xl font-bold mb-4">
              Jaji’s Premium Beauty Salon
            </h3>

            <p className="text-gray-200 leading-relaxed mb-6 text-justify">
              Partner with Jaji’s and bring a trusted beauty and wellness brand
              to your region. Our salon franchise combines professional
              expertise, premium services, and a proven operational model to
              deliver consistent customer satisfaction and strong business
              growth.
            </p>

            <ul className="space-y-2 text-left max-w-md mx-auto">
              <li>✓ Professional training & skill development</li>
              <li>✓ Complete salon setup & interior guidance</li>
              <li>✓ Brand & marketing support</li>
              <li>✓ Product supply & service protocols</li>
              <li>✓ Ongoing business mentoring</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ABOUT JAJIS */}
      <section className="bg-white text-black">
        <div className="relative max-w-7xl mx-auto px-6 py-32">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* LEFT */}
            <div className="space-y-8">
              <span className="text-sm font-bold tracking-widest text-gray-600 uppercase">
                Our Journey
              </span>

              <h2 className="text-5xl font-extrabold leading-tight">
                Crafting Excellence Since Day One
              </h2>

              <div className="w-24 h-1 bg-black"></div>

              <p className="text-lg text-gray-800 leading-relaxed text-justify">
                Founded with a vision to provide exceptional beauty and
                lifestyle services, Jajis has grown from a small local business
                into a trusted brand serving communities with professionalism
                and care.
              </p>

              <p className="text-lg text-gray-800 leading-relaxed text-justify">
                Our mission is to make beauty and wellness accessible to
                everyone while maintaining the highest standards of quality,
                hygiene, and customer satisfaction.
              </p>

              <div className="grid grid-cols-2 gap-8 mt-10">
                <div className="bg-gray-100 p-6 rounded-2xl text-center">
                  <div className="text-5xl font-extrabold">10+</div>
                  <div className="text-gray-600 text-sm uppercase">
                    Years Experience
                  </div>
                </div>
                <div className="bg-gray-100 p-6 rounded-2xl text-center">
                  <div className="text-5xl font-extrabold">50+</div>
                  <div className="text-gray-600 text-sm uppercase">
                    Team Members
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-10">
              <div className="bg-white p-10 rounded-2xl shadow-lg border">
                <div className="text-4xl mb-4">
                  <FaBuilding />
                </div>
                <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To deliver innovative, high-quality beauty and lifestyle
                  services that enhance confidence and well-being, ensuring
                  every client feels valued and beautiful.
                </p>
              </div>

              <div className="bg-white p-10 rounded-2xl shadow-lg border">
                <div className="text-4xl mb-4">
                  <FaStar />
                </div>
                <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To be a leading beauty & lifestyle brand known for excellence,
                  innovation, and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY FRANCHISE */}
      <section className="bg-black text-white py-24 relative overflow-hidden">
        {/* subtle gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Why Partner With Jaji’s?
            </h2>
            <p className="text-gray-400 text-lg">
              A proven beauty brand with strong support, modern systems, and
              growth-focused opportunities.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FaChartLine />, text: "Proven Business Model" },
              { icon: <FaTrophy />, text: "Strong Brand Trust" },
              { icon: <FaChalkboardTeacher />, text: "Professional Training" },
              { icon: <FaBullhorn />, text: "Marketing Support" },
              { icon: <FaHandshake />, text: "Continuous Guidance" },
              { icon: <FaStar />, text: "Premium Services" },
              { icon: <FaLaptopCode />, text: "Modern Systems" },
              { icon: <FaRocket />, text: "Growth Opportunities" },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-2xl 
          transition-all duration-300 hover:bg-white hover:text-black hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 text-white 
                          group-hover:bg-black group-hover:text-white transition-all duration-300 text-2xl mb-6 mx-auto"
                >
                  {item.icon}
                </div>

                {/* Text */}
                <p className="text-center font-semibold tracking-wide">
                  {item.text}
                </p>

                {/* hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition 
                          bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
