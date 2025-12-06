import React, { useState, useContext, useEffect } from 'react';
import { 
  MapPin, CreditCard, Check, ChevronRight, Lock, Edit, 
  AlertCircle, CheckCircle, Truck, ShoppingBag, ArrowLeft
} from 'lucide-react';
import { ShopperContext } from '../../context/Context';

// Fallback data when API is not available
const fallbackCountries = [
  { iso2: 'US', name: 'United States', emoji: '🇺🇸' },
  { iso2: 'NG', name: 'Nigeria', emoji: '🇳🇬' },
  { iso2: 'GB', name: 'United Kingdom', emoji: '🇬🇧' },
  { iso2: 'CA', name: 'Canada', emoji: '🇨🇦' },
  { iso2: 'IN', name: 'India', emoji: '🇮🇳' },
  { iso2: 'AU', name: 'Australia', emoji: '🇦🇺' }
];

const fallbackStates = {
  'US': [
    { iso2: 'CA', name: 'California' },
    { iso2: 'NY', name: 'New York' },
    { iso2: 'TX', name: 'Texas' },
    { iso2: 'FL', name: 'Florida' }
  ],
  'NG': [
    { iso2: 'LA', name: 'Lagos' },
    { iso2: 'FC', name: 'Abuja FCT' },
    { iso2: 'KN', name: 'Kano' },
    { iso2: 'RI', name: 'Rivers' }
  ],
  'GB': [
    { iso2: 'ENG', name: 'England' },
    { iso2: 'SCT', name: 'Scotland' },
    { iso2: 'WLS', name: 'Wales' }
  ],
  'CA': [
    { iso2: 'ON', name: 'Ontario' },
    { iso2: 'QC', name: 'Quebec' },
    { iso2: 'BC', name: 'British Columbia' }
  ]
};

const fallbackCities = {
  'CA': ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'],
  'NY': ['New York City', 'Buffalo', 'Rochester', 'Albany'],
  'LA': ['Ikeja', 'Victoria Island', 'Lekki', 'Surulere', 'Yaba'],
  'FC': ['Garki', 'Wuse', 'Maitama', 'Asokoro'],
  'ENG': ['London', 'Manchester', 'Birmingham', 'Liverpool'],
  'ON': ['Toronto', 'Ottawa', 'Mississauga', 'Hamilton']
};

function Checkout() {
  const {cart, shippingMethod, setShippingMethod} = useContext(ShopperContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Dynamic data
  const [countries, setCountries] = useState(fallbackCountries);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [usingFallback, setUsingFallback] = useState(true);

  const [shippingInfo, setShippingInfo] = useState({
    phone: '',
    email: '',
    street: '', 
    country: '', 
    state: '', 
    city: '', 
    zipCode: ''
  });

  const [cardInfo, setCardInfo] = useState({
    cardNumber: '', cardName: '', expiryDate: '', cvv: ''
  });

  // Try to fetch from API on mount, fallback to local data
  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with actual key from https://countrystatecity.in/
    
    // If no API key set, use fallback immediately
    if (API_KEY === 'YOUR_API_KEY_HERE') {
      setCountries(fallbackCountries);
      setUsingFallback(true);
      return;
    }

    try {
      setLoadingLocations(true);
      const response = await fetch('https://api.countrystatecity.in/v1/countries', {
        headers: {
          'X-CSCAPI-KEY': API_KEY
        }
      });
      
      if (!response.ok) throw new Error('API failed');
      
      const data = await response.json();
      setCountries(data);
      setUsingFallback(false);
    } catch (error) {
      console.log('Using fallback data (API not configured)');
      setCountries(fallbackCountries);
      setUsingFallback(true);
    } finally {
      setLoadingLocations(false);
    }
  };

  const handleCountryChange = async (e) => {
    const countryCode = e.target.value;
    setShippingInfo({ ...shippingInfo, country: countryCode, state: '', city: '' });
    setCities([]);
    
    if (!countryCode) {
      setStates([]);
      return;
    }

    // Use fallback data
    if (usingFallback) {
      setStates(fallbackStates[countryCode] || []);
      return;
    }

    // Try API if available
    try {
      setLoadingLocations(true);
      const response = await fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, {
        headers: {
          'X-CSCAPI-KEY': 'YOUR_API_KEY_HERE'
        }
      });
      
      if (!response.ok) throw new Error('API failed');
      
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.log('Using fallback states');
      setStates(fallbackStates[countryCode] || []);
    } finally {
      setLoadingLocations(false);
    }
  };

  const handleStateChange = async (e) => {
    const stateCode = e.target.value;
    setShippingInfo({ ...shippingInfo, state: stateCode, city: '' });
    
    if (!stateCode) {
      setCities([]);
      return;
    }

    // Use fallback data
    if (usingFallback) {
      setCities(fallbackCities[stateCode] || []);
      return;
    }

    // Try API if available
    try {
      setLoadingLocations(true);
      const response = await fetch(
        `https://api.countrystatecity.in/v1/countries/${shippingInfo.country}/states/${stateCode}/cities`,
        {
          headers: {
            'X-CSCAPI-KEY': 'YOUR_API_KEY_HERE'
          }
        }
      );
      
      if (!response.ok) throw new Error('API failed');
      
      const data = await response.json();
      setCities(data.map(c => c.name));
    } catch (error) {
      console.log('Using fallback cities');
      setCities(fallbackCities[stateCode] || []);
    } finally {
      setLoadingLocations(false);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = shippingMethod === 'express' ? 19.99 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const validateShipping = () => {
    const newErrors = {};
    if (!shippingInfo.street) newErrors.street = 'Required';
    if (!shippingInfo.country) newErrors.country = 'Required';
    if (!shippingInfo.state) newErrors.state = 'Required';
    if (!shippingInfo.city) newErrors.city = 'Required';
    if (!shippingInfo.zipCode) newErrors.zipCode = 'Required';
    if (!shippingInfo.email) newErrors.email = 'Required';
    if (!shippingInfo.phone) newErrors.phone = 'Required';
    return newErrors;
  };

  const handleContinueToPayment = () => {
    const validationErrors = validateShipping();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setCurrentStep(2);
  };

  const handleFlutterwavePayment = async (phone_number, shippingCost, deliveryAddress) => {
    try {
      const res = await fetch("http://localhost:5000/pay", {
        method: "POST",
        credentials: "include", // include cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number, shippingCost, deliveryAddress }),
      });
      const data = await res.json();

      if (data.status === "success" && data.paymentLink) {
      // Open Flutterwave page directly
      window.location.href = data.paymentLink;
    } else {
      console.error("Payment initialization failed", data);
    }
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment initialization failed");
    }
  };

  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}>
                {currentStep > 1 ? <Check className="w-6 h-6" /> : '1'}
              </div>
              <span className="ml-3 font-semibold">Shipping</span>
            </div>
            <div className="w-20 h-1 bg-gray-300 mx-4"></div>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="ml-3 font-semibold">Payment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            
            {/* STEP 1: SHIPPING */}
            {currentStep === 1 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Shipping Information</h2>
                </div>
                
                <div className="space-y-4">
                  {/* Email and Phone */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        value={shippingInfo.email || ""}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone *</label>
                      <input
                        type="tel"
                        value={shippingInfo.phone || ""}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="+234 800 000 0000"
                      />
                      {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Street */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Street Address *</label>
                    <input
                      type="text"
                      value={shippingInfo.street || ""}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, street: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg ${errors.street ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="123 Main Street"
                    />
                    {errors.street && <p className="text-red-600 text-sm mt-1">{errors.street}</p>}
                  </div>

                  {/* Country-State-City with Fallback */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Country *</label>
                      <select
                        value={shippingInfo.country || ""}
                        onChange={handleCountryChange}
                        disabled={loadingLocations}
                        className={`w-full px-4 py-3 border rounded-lg ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Select Country</option>
                        {countries.map((c) => (
                          <option key={c.iso2} value={c.iso2}>
                            {c.emoji || ''} {c.name}
                          </option>
                        ))}
                      </select>
                      {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">State *</label>
                      <select
                        value={shippingInfo.state || ""}
                        onChange={handleStateChange}
                        disabled={!shippingInfo.country || loadingLocations}
                        className={`w-full px-4 py-3 border rounded-lg ${errors.state ? 'border-red-500' : 'border-gray-300'} ${!shippingInfo.country ? 'bg-gray-100' : ''}`}
                      >
                        <option value="">Select State</option>
                        {states.map((s) => (
                          <option key={s.iso2} value={s.iso2}>{s.name}</option>
                        ))}
                      </select>
                      {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">City *</label>
                      <select
                        value={shippingInfo.city || ""}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        disabled={!shippingInfo.state || loadingLocations}
                        className={`w-full px-4 py-3 border rounded-lg ${errors.city ? 'border-red-500' : 'border-gray-300'} ${!shippingInfo.state ? 'bg-gray-100' : ''}`}
                      >
                        <option value="">Select City</option>
                        {cities.map((c, idx) => (
                          <option key={idx} value={c}>{c}</option>
                        ))}
                      </select>
                      {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">ZIP Code *</label>
                      <input
                        type="text"
                        value={shippingInfo.zipCode || ""}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="100001"
                      />
                      {errors.zipCode && <p className="text-red-600 text-sm mt-1">{errors.zipCode}</p>}
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Shipping Method</label>
                    <div className="space-y-3">
                      <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer ${
                        shippingMethod === 'standard' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                      }`}>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            checked={shippingMethod === 'standard'}
                            onChange={() => setShippingMethod('standard')}
                            className="w-5 h-5"
                          />
                          <div className="ml-3">
                            <p className="font-semibold">Standard Shipping</p>
                            <p className="text-sm text-gray-600">3-5 days</p>
                          </div>
                        </div>
                        <span className="font-bold text-teal-600">N9.99</span>
                      </label>

                      <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer ${
                        shippingMethod === 'express' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                      }`}>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            checked={shippingMethod === 'express'}
                            onChange={() => setShippingMethod('express')}
                            className="w-5 h-5"
                          />
                          <div className="ml-3">
                            <p className="font-semibold">Express Shipping</p>
                            <p className="text-sm text-gray-600">1-2 days</p>
                          </div>
                        </div>
                        <span className="font-bold">N19.99</span>
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={handleContinueToPayment}
                    className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold hover:bg-black transition"
                  >
                    Continue to Payment →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PAYMENT */}
            {currentStep === 2 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <button 
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Shipping
                </button>
                
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                
                <div className="space-y-3 mb-6">
                  <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer ${
                    paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="w-5 h-5"
                    />
                    <span className="ml-3 font-semibold">Credit/Debit Card</span>
                  </label>

                  <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer ${
                    paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => setPaymentMethod('paypal')}
                      className="w-5 h-5"
                    />
                    <span className="ml-3 font-semibold">PayPal</span>
                  </label>

                  <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer ${
                    paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="w-5 h-5"
                    />
                    <span className="ml-3 font-semibold">Cash on Delivery</span>
                  </label>
                </div>

                {/* Card Form (if card is selected)
                {paymentMethod === 'card' && (
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number *</label>
                      <input
                        type="text"
                        value={cardInfo.cardNumber}
                        onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Cardholder Name *</label>
                      <input
                        type="text"
                        value={cardInfo.cardName}
                        onChange={(e) => setCardInfo({ ...cardInfo, cardName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="JOHN DOE"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry *</label>
                        <input
                          type="text"
                          value={cardInfo.expiryDate}
                          onChange={(e) => setCardInfo({ ...cardInfo, expiryDate: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV *</label>
                        <input
                          type="text"
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )} */}

                <button
                  
                  onClick={() => {
                    const { phone, ...deliveryAddress } = shippingInfo;
                    handleFlutterwavePayment(phone, shippingCost, deliveryAddress)
                  }}
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-semibold text-lg ${
                    loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-black text-white'
                  }`}
                >
                  {loading ? 'Processing...' : `Pay With Flutterwave • N${total.toLocaleString("en-US", { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}`}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar - YOUR ACTUAL CART */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm">{item.title} x{item.quantity}</span>
                    <span className="font-semibold text-sm">
                      N{(item.price * item.quantity).toLocaleString("en-US", { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2 
                      })}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>N{subtotal.toLocaleString("en-US", { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>N{shippingCost.toLocaleString("en-US", { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>N{tax.toLocaleString("en-US", { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold text-blue-500">
                      N{total.toLocaleString("en-US", { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;