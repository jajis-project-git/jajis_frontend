import React, { useEffect, useMemo, useState } from "react";
import {
  Trash2,
  ShoppingCart,
  MapPin,
  Plus,
  Pencil,
  CreditCard,
  Home,
} from "lucide-react";
import { API } from "../config/api";
import { Link, useNavigate } from "react-router-dom";

const emptyAddress = {
  label: "Home",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "India",
  phone: "",
  is_default: false,
};

export default function CartPage() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedShippingId, setSelectedShippingId] = useState(null);
  const [loadingCart, setLoadingCart] = useState(true);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [savingAddress, setSavingAddress] = useState(false);
  const [deletingAddress, setDeletingAddress] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [message, setMessage] = useState(null);

  const [addressForm, setAddressForm] = useState(emptyAddress);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const token = useMemo(() => localStorage.getItem("token"), []);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 2000);
  };

  const fetchCart = async () => {
    setLoadingCart(true);
    try {
      const response = await API.get("/cart/");
      setCartItems(response.data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      showMessage("Login to load cart", "error");
    } finally {
      setLoadingCart(false);
    }
  };

  const fetchAddresses = async () => {
    setLoadingAddresses(true);
    try {
      const res = await API.get("/addresses/");
      const list = res.data || [];
      setAddresses(list);

      const defaultAddress =
        list.find((addr) => addr.is_default) || list[0] || null;
      const chosenShipping = selectedShippingId || defaultAddress?.id || null;
      setSelectedShippingId(chosenShipping);
    } catch (err) {
      console.error("Address fetch failed", err);
      showMessage("Could not load addresses", "error");
    } finally {
      setLoadingAddresses(false);
    }
  };

  useEffect(() => {
    fetchCart();
    if (token) {
      fetchAddresses();
    }
  }, [token]);

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await API.post("/cart/update/", {
        item_id: itemId,
        quantity: newQuantity,
      });
      showMessage("Quantity updated");
      fetchCart();
    } catch (error) {
      console.error(error);
      showMessage("Failed to update quantity", "error");
    }
  };

  const removeItem = async (itemId) => {
    try {
      await API.post("/cart/remove/", { item_id: itemId });
      showMessage("Item removed");
      fetchCart();
    } catch (error) {
      console.error(error);
      showMessage("Failed to remove item", "error");
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setSavingAddress(true);
    try {
      // Prepare data - only required fields
      const submitData = {
        label: addressForm.label || null,
        line1: addressForm.line1.trim(),
        line2: addressForm.line2 || null,
        city: addressForm.city.trim(),
        state: addressForm.state || null,
        postal_code: addressForm.postal_code.trim(),
        country: addressForm.country || "India",
        phone: addressForm.phone || null,
        is_default: addressForm.is_default,
      };

      if (editingAddressId) {
        await API.put(`/addresses/${editingAddressId}/`, submitData);
        showMessage("Address updated");
      } else {
        await API.post("/addresses/", submitData);
        showMessage("Address added");
      }
      setAddressForm(emptyAddress);
      setEditingAddressId(null);
      setShowAddressForm(false);
      fetchAddresses();
    } catch (err) {
      console.error("Save address failed", err);
      const errorMsg = err.response?.data?.message || 
                       err.response?.data?.detail ||
                       Object.values(err.response?.data || {}).flat().join(", ") ||
                       "Failed to save address";
      showMessage(errorMsg, "error");
    } finally {
      setSavingAddress(false);
    }
  };

  const handleAddressDelete = async (id) => {
    setDeletingAddress(id);
    try {
      await API.delete(`/addresses/${id}/`);
      showMessage("Address removed");
      fetchAddresses();
    } catch (err) {
      console.error("Delete address failed", err);
      showMessage("Could not delete address", "error");
    } finally {
      setDeletingAddress(null);
    }
  };

  const handleEditAddress = (addr) => {
    setAddressForm({
      label: addr.label || "",
      line1: addr.line1,
      line2: addr.line2 || "",
      city: addr.city,
      state: addr.state || "",
      postal_code: addr.postal_code,
      country: addr.country,
      phone: addr.phone || "",
      is_default: addr.is_default,
    });
    setEditingAddressId(addr.id);
    setShowAddressForm(true);
  };

  const loadRazorpay = () =>
    new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject();
      document.body.appendChild(script);
    });

  const startCheckout = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (!selectedShippingId) {
      showMessage("Select a shipping address", "warning");
      return;
    }

    setProcessingPayment(true);
    try {
      await loadRazorpay();

      const { data } = await API.post("/payment/create/", {
        shipping_address_id: selectedShippingId,
        billing_address_id: null,
      });

      const options = {
        key: data.key,
        amount: Math.round(Number(data.amount) * 100),
        currency: data.currency || "INR",
        name: "Jajis",
        description: "Secure checkout",
        order_id: data.order_id,
        handler: async (response) => {
          try {
            await API.post("/payment/verify/", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            showMessage("Payment successful");
            fetchCart();
            navigate("/myorders");
          } catch (err) {
            console.error("Verification failed", err);
            showMessage("Payment verification failed", "error");
          } finally {
            setProcessingPayment(false);
          }
        },
        prefill: {
          name:
            addresses.find((a) => a.id === selectedShippingId)?.label ||
            "Customer",
          contact:
            addresses.find((a) => a.id === selectedShippingId)?.phone || "",
        },
        theme: { color: "#000000" },
        modal: {
          ondismiss: () => setProcessingPayment(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (resp) => {
        showMessage(resp.error?.description || "Payment failed", "error");
        setProcessingPayment(false);
      });
      rzp.open();
    } catch (err) {
      console.error("Checkout error", err);
      showMessage("Unable to start payment", "error");
      setProcessingPayment(false);
    }
  };
  

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.variant.price) * item.quantity,
    0
  );
  const originalSubtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.variant.mrp) * item.quantity,
    0
  );
  const totalDiscount = originalSubtotal - subtotal;

  if (loadingCart) return <div className="w-full py-20 mt-24 flex flex-col items-center justify-center gap-4">
  <div className="h-10 w-10 rounded-full border-4 border-gray-300 border-t-black animate-spin"></div>
  <span className="text-sm font-medium text-gray-600 tracking-wide">
    Loading, please wait…
  </span>
</div>
;

  return (
    <div className="bg-white min-h-screen relative pb-16">
      {message && (
        <div
          className={`fixed top-20 left-1/2 -translate-x-1/2 px-6 py-3 rounded shadow-lg z-50 text-white ${
            message.type === "success"
              ? "bg-green-500"
              : message.type === "error"
              ? "bg-red-500"
              : "bg-yellow-500"
          }`}
        >
          {message.text}
        </div>
      )}

      <header className="mt-30 mb-6 text-center">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <p className="text-gray-500 text-sm">Review items and complete checkout</p>
      </header>

      <div className="container mx-auto px-4 lg:px-12 py-8">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT SIDE - ITEMS */}
            <div className="lg:col-span-2">
              <div className="border rounded-xl shadow-sm">
                {cartItems.map((item) => {
                  const { variant: v, quantity: qty, id: itemId } = item;
                  const { product: p } = v;

                  const imageUrl =
                    p.image1?.startsWith("http")
                      ? p.image1
                      : `${BASE_URL}${p.image1}`;

                  const discountPercent = Math.round(
                    ((v.mrp - v.price) / v.mrp) * 100
                  );

                  return (
                    <div
                      key={itemId}
                      className="flex flex-col sm:flex-row items-center gap-6 p-5 border-b hover:bg-gray-50"
                    >
                      <div className="w-24 h-24 flex-shrink-0">
                        <img
                          src={imageUrl}
                          className="w-full h-full object-cover rounded"
                          alt={p.title}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/150?text=No+Image";
                          }}
                        />
                      </div>

                      <div className="flex-1 w-full">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{p.title}</h3>
                            <p className="text-sm text-gray-500">{p.brand}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Variant: <b>{v.quantity_label}</b>
                            </p>
                          </div>

                          <button
                            onClick={() => removeItem(itemId)}
                            className="p-2 hover:bg-red-100 rounded-full"
                          >
                            <Trash2 size={20} className="text-red-600" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <b className="text-lg">₹{v.price}</b>
                          <span className="line-through text-gray-400">
                            ₹{v.mrp}
                          </span>
                          <span className="text-green-600 text-xs">
                            {discountPercent}% off
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mt-1">
                          Subtotal: ₹{(v.price * qty).toFixed(2)}
                        </p>

                        <div className="flex gap-4 mt-3">
                          <button
                            onClick={() => updateQuantity(itemId, qty - 1)}
                            className="px-3 py-1 border rounded"
                          >
                            −
                          </button>
                          <span className="font-semibold">{qty}</span>
                          <button
                            onClick={() => updateQuantity(itemId, qty + 1)}
                            className="px-3 py-1 border rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT SIDE - ADDRESS + SUMMARY */}
            <div className="space-y-6">
              <div className="border rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <h2 className="text-lg font-semibold">Delivery Address</h2>
                  </div>
                  <button
                    className="flex items-center gap-1 text-sm bg-black text-white px-3 py-1.5 rounded"
                    onClick={() => {
                      setAddressForm(emptyAddress);
                      setEditingAddressId(null);
                      setShowAddressForm((prev) => !prev);
                    }}
                  >
                    <Plus size={14} />
                    {showAddressForm ? "Close" : "Add"}
                  </button>
                </div>

                {token ? (
                  <>
                    {loadingAddresses ? (
                      <p className="text-sm text-gray-500">Loading addresses...</p>
                    ) : addresses.length === 0 ? (
                      <p className="text-sm text-gray-600">
                        Add an address to continue.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {addresses.map((addr) => (
                          <label
                            key={addr.id}
                            className={`flex items-start gap-3 border rounded-lg p-3 cursor-pointer hover:border-black ${
                              selectedShippingId === addr.id
                                ? "border-black bg-gray-50"
                                : "border-gray-200"
                            }`}
                          >
                            <input
                              type="radio"
                              name="shipping"
                              checked={selectedShippingId === addr.id}
                              onChange={() => {
                                setSelectedShippingId(addr.id);
                              }}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <p className="font-semibold flex items-center gap-2">
                                {addr.label || "Address"}{" "}
                                {addr.is_default && (
                                  <span className="text-xs bg-black text-white px-2 py-0.5 rounded">
                                    Default
                                  </span>
                                )}
                              </p>
                              <p className="text-sm text-gray-600">
                                {addr.line1}
                                {addr.line2 ? `, ${addr.line2}` : ""}
                              </p>
                              <p className="text-sm text-gray-600">
                                {addr.city}, {addr.state} - {addr.postal_code}
                              </p>
                              <p className="text-xs text-gray-500">
                                {addr.country} {addr.phone ? `| ${addr.phone}` : ""}
                              </p>
                            </div>
                            <div className="flex flex-col gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditAddress(addr);
                                }}
                                className="text-sm px-2 py-1 border rounded flex items-center gap-1"
                              >
                                <Pencil size={14} /> Edit
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddressDelete(addr.id);
                                }}
                                disabled={deletingAddress === addr.id}
                                className="text-sm px-2 py-1 border rounded text-red-600 hover:bg-red-50 disabled:opacity-50"
                              >
                                {deletingAddress === addr.id ? "Deleting" : "Delete"}
                              </button>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-gray-600">
                    Please <Link className="underline" to="/login">login</Link> to add an
                    address.
                  </p>
                )}

                {showAddressForm && (
                  <form onSubmit={handleAddressSubmit} className="mt-4 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Label (Home/Office)"
                        className="border rounded px-3 py-2"
                        value={addressForm.label}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, label: e.target.value })
                        }
                      />
                      <input
                        type="text"
                        placeholder="Phone"
                        className="border rounded px-3 py-2"
                        value={addressForm.phone}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, phone: e.target.value })
                        }
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Address line 1"
                      className="w-full border rounded px-3 py-2"
                      value={addressForm.line1}
                      onChange={(e) =>
                        setAddressForm({ ...addressForm, line1: e.target.value })
                      }
                      required
                    />
                    <input
                      type="text"
                      placeholder="Address line 2 (optional)"
                      className="w-full border rounded px-3 py-2"
                      value={addressForm.line2}
                      onChange={(e) =>
                        setAddressForm({ ...addressForm, line2: e.target.value })
                      }
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="City"
                        className="border rounded px-3 py-2"
                        value={addressForm.city}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, city: e.target.value })
                        }
                        required
                      />
                      <input
                        type="text"
                        placeholder="State"
                        className="border rounded px-3 py-2"
                        value={addressForm.state}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, state: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Postal code"
                        className="border rounded px-3 py-2"
                        value={addressForm.postal_code}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            postal_code: e.target.value,
                          })
                        }
                        required
                      />
                      <input
                        type="text"
                        placeholder="Country"
                        className="border rounded px-3 py-2"
                        value={addressForm.country}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, country: e.target.value })
                        }
                      />
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={addressForm.is_default}
                          onChange={(e) =>
                            setAddressForm({
                              ...addressForm,
                              is_default: e.target.checked,
                            })
                          }
                        />
                        Set as default
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-black text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-800 disabled:opacity-60"
                      disabled={savingAddress}
                    >
                      {editingAddressId ? "Update Address" : "Save Address"}
                    </button>
                  </form>
                )}

              </div>

              <div className="border rounded-xl shadow-sm p-6 h-fit sticky top-28">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CreditCard size={18} />
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Original Subtotal</span>
                    <span>₹{originalSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Discount</span>
                    <span>-₹{totalDiscount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <hr className="mt-2" />
                  <div className="flex justify-between font-bold text-black">
                    <span>Total</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2 disabled:opacity-60"
                  onClick={startCheckout}
                  disabled={processingPayment || subtotal <= 0}
                >
                  Proceed to Checkout
                </button>
                {!token && (
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Login to checkout and save addresses.
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[60vh]">
            <Link to="/products">
              <div className="p-8 border rounded-xl text-center hover:shadow-lg">
                <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <p className="text-gray-400 text-sm">
                  Click to browse products
                </p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
