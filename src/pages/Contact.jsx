import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../config/api";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Contact() {
  const [data, setData] = useState({ content: "", page: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await API.get("contact/"); // /api/contact/
        setData(response.data);
      } catch (err) {
        console.error("Error fetching contact data:", err);
        setError("Failed to load contact page data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

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
        className="relative bg-fixed bg-center bg-cover h-[30vh] mt-12"
        style={{
          backgroundImage:
            "url('https://th.bing.com/th/id/OIP.ee0K3fgpKc7KoG43Ff4DMwHaGu?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Centered content */}
        <div className="relative max-w-7xl mx-auto h-full flex items-center justify-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">
            Contact Us
          </h1>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-100 text-black py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-3">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="Subject"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-700">
                We'd love to hear from you. Send us a message and we'll respond
                as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: <FaMapMarkerAlt />,
                  title: "Address",
                  content:
                    "123 Beauty Street, Fashion District, City, State 12345",
                },
                {
                  icon: <FaPhone />,
                  title: "Phone",
                  content: "+1 (555) 123-4567",
                },
                {
                  icon: <FaEnvelope />,
                  title: "Email",
                  content: "info@jajis.com",
                },
                {
                  icon: <FaClock />,
                  title: "Business Hours",
                  content: "Mon-Sat: 9 AM - 8 PM, Sun: 10 AM - 6 PM",
                },
              ].map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="text-2xl">{info.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{info.title}</h3>
                    <p className="text-gray-700">{info.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {[FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-12 h-12 bg-black/10 text-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                  >
                    <Icon className="text-xl" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      {/* <div className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Find Us</h2>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl h-96 flex items-center justify-center">
            <p className="text-gray-400">Interactive map will be displayed here</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
