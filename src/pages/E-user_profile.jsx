import {
  User,
  ShoppingBag,
  Heart,
  Package,
  MapPin,
  LogOut,
  ShoppingCart
} from "lucide-react";



import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../config/api";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    avatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=600&q=80",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile/");
        setUser((prev) => ({
          ...prev,
          username: res.data.username,
          email: res.data.email,
        }));
      } catch (error) {
        console.error("Profile fetch failed", error);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const menuItems = [
  {
    id: 1,
    name: "My Orders",
    icon: <Package className="w-5 h-5" />,
    link: "/myorders",
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: 2,
    name: "Wishlist",
    icon: <Heart className="w-5 h-5" />,
    link: "/wishlist",
    color: "bg-pink-50 text-pink-600",
  },
  {
    id: 3,
    name: "Cart",
    icon: <ShoppingCart className="w-5 h-5" />,
    link: "/cart",
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: 4,
    name: "Products",
    icon: <ShoppingBag className="w-5 h-5" />,
    link: "/products",
    color: "bg-green-50 text-green-600",
  },
 
];


  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await API.post("/logout/");
    } catch (error) {
      console.error("Logout error");
    }

    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="w-full py-20 mt-24 flex flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 rounded-full border-4 border-gray-300 border-t-black animate-spin"></div>
        <span className="text-sm font-medium text-gray-600 tracking-wide">
          Loading, please wait…
        </span>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-6 lg:px-16 bg-gray-50 min-h-screen mt-14">
      <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center">
      

        <h2 className="text-2xl font-bold text-gray-900">
          {user.username || "User"}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {user.email || "No email available"}
        </p>

        {/* Menu */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className={`flex flex-col items-center justify-center gap-2 border border-gray-200 rounded-xl p-5 hover:shadow-md transition ${item.color} hover:bg-opacity-70`}
            >
              <div className={`p-3 rounded-full ${item.color} bg-opacity-30`}>
                {item.icon}
              </div>
              <span className="text-sm font-medium text-gray-900">
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 transition shadow"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
