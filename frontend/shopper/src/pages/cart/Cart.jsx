import React, { useState, useContext } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Tag, Truck, Shield, CreditCard, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopperContext } from '../../context/Context';

function Cart() {
  const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const {cart, cartCount, removeCart, updateQuantity, isLoading} = useContext(ShopperContext)
  const sub = cart.map(cartSubtotal => {
    return cartSubtotal.subtotal
  })
  const subTotal = sub.join(",").split(",")
  
  const navigate = useNavigate()
  

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  // const updateQuantity = (id, newQuantity) => {
  //   if (newQuantity === 0) {
  //     removeCart(id);
  //     return;
  //   }
  //   setCartItems(cartItems.map(item => 
  //     item.id === id ? { ...item, quantity: newQuantity } : item
  //   ));
  // };

  // const removeItem = (id) => {
  //   setCartItems(cart.filter(item => item.id !== id));
  // };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setAppliedPromo({ code: 'SAVE10', discount: 10 });
    } else if (promoCode.toUpperCase() === 'WELCOME20') {
      setAppliedPromo({ code: 'WELCOME20', discount: 20 });
    } else {
      alert('Invalid promo code');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode('');
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cart.reduce((sum, item) => {
    if (item.discountPrice) {
      return sum + ((item.price - item.discountPrice) * item.quantity);
    }
    return sum;
  }, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const promoDiscount = appliedPromo ? (subtotal * appliedPromo.discount / 100) : 0;
  const tax = (subtotal - promoDiscount) * 0.08;
  const total = subtotal - promoDiscount + shipping + tax;

  const handleNavigation = ()=>{
    navigate('/products')
  }

  if(isLoading) {
    return (<p className='text-center text-2xl text-blue-700'>Loading...</p>)
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
                <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors" onClick={handleNavigation}>
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        <span className="font-medium">Continue Shopping</span>
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                <div className="w-32"></div>
            
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {cart.length === 0 ? (
          // Empty Cart
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Start Shopping
              </button>
            </Link>
            
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              {/* Info Banner */}
              {subTotal.map((subtotal, index) => (
                subtotal < 1000 && (
                <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start">
                  <Truck className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Add ${(1000 - subtotal).toFixed(2)} more</span> to get <span className="font-semibold">FREE shipping!</span>
                  </p>
                </div>
              )
              ))
                

              }
              

              {/* Cart Items */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">
                    Cart Items ({cartCount})
                  </h2>
                </div>

                <div className="divide-y">
                  {cart.map((item, index) => (
                    <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={`${BACKEND_URL}/uploads/images/${item.image[0]}`}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>Size: <span className="font-medium">{item.size}</span></span>
                                <span>Color: <span className="font-medium">{item.color}</span></span>
                              </div>
                            </div>
                            <button
                              onClick={() => removeCart(item.product)}
                              className="text-gray-400 hover:text-red-600 transition-colors p-1"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Stock Status */}
                          {item.inStock ? (
                            <div className="flex items-center text-sm text-green-600 mb-3">
                              <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                              In Stock
                            </div>
                          ) : (
                            <div className="flex items-center text-sm text-red-600 mb-3">
                              <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
                              Out of Stock
                            </div>
                          )}

                          {/* Price and Quantity */}
                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => updateQuantity(item.product, item.size, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product, item.size, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <div className="text-xl font-bold text-teal-600">
                                N{(item.price * item.quantity).toLocaleString("en-US", {
                                                                  minimumFractionDigits: 2,
                                                                  maximumFractionDigits: 2
                                                                })}
                              </div>
                              {item.oldPrice && (
                                <div className="text-sm text-gray-500 line-through">
                                  ${(item.oldPrice * item.quantity).toFixed(2)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo Code Section */}
              <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                <div className="flex items-center mb-4">
                  <Tag className="w-5 h-5 text-gray-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Promo Code</h3>
                </div>

                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                        <Tag className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-blue-900">{appliedPromo.code}</p>
                        <p className="text-sm text-blue-700">{appliedPromo.discount}% discount applied</p>
                      </div>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-blue-600 hover:text-green-800 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}

                {/*AVAILABLE PROMO CODES SECTION*/}
                {/* <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Available Promo Codes:</p>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-700"><span className="font-mono font-semibold">SAVE10</span> - Get 10% off</p>
                    <p className="text-gray-700"><span className="font-mono font-semibold">WELCOME20</span> - Get 20% off</p>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm sticky top-24">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                </div>

                <div className="p-6 space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({cartCount} items)</span>
                    <span className="font-semibold">N{subtotal.toLocaleString("en-US", { 
                                                        minimumFractionDigits: 2, 
                                                        maximumFractionDigits: 2 
                                                      })}</span>
                  </div>

                  {/* Savings */}
                  {savings > 0 && (
                    <div className="flex justify-between text-blue-600">
                      <span>You Save</span>
                      <span className="font-semibold">-${savings.toLocaleString("en-US", { 
                                                        minimumFractionDigits: 2, 
                                                        maximumFractionDigits: 2 
                                                      })}
                      </span>
                    </div>
                  )}

                  {/* Promo Discount */}
                  {appliedPromo && (
                    <div className="flex justify-between text-blue-600">
                      <span>Promo Code ({appliedPromo.code})</span>
                      <span className="font-semibold">-${promoDiscount.toLocaleString("en-US", { 
                                                        minimumFractionDigits: 2, 
                                                        maximumFractionDigits: 2 
                                                      })}
                      </span>
                    </div>
                  )}

                  {/* Shipping */}
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    {shipping === 0 ? (
                      <span className="font-semibold text-blue-600">FREE</span>
                    ) : (
                      <span className="font-semibold">${shipping.toLocaleString("en-US", { 
                                                        minimumFractionDigits: 2, 
                                                        maximumFractionDigits: 2 
                                                      })}
                      </span>
                    )}
                  </div>

                  {/* Tax */}
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (8%)</span>
                    <span className="font-semibold">N{tax.toLocaleString("en-US", { 
                                                        minimumFractionDigits: 2, 
                                                        maximumFractionDigits: 2 
                                                      })}
                    </span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-blue-600">N{total.toLocaleString("en-US", { 
                                                        minimumFractionDigits: 2, 
                                                        maximumFractionDigits: 2 
                                                      })}
                      </span>
                    </div>

                    {/* Checkout Button */}
                    <Link to="/checkout">
                      <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-black transition-color shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                        Proceed to Checkout
                      </button>
                    </Link>

                    {/* Continue Shopping */}
                    <Link to="/products">
                      <button className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors" onClick={handleNavigation}>
                        Continue Shopping
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="p-6 border-t bg-gray-50">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-700">
                      <Shield className="w-5 h-5 text-teal-600 mr-3 flex-shrink-0" />
                      <span>Secure checkout with SSL encryption</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Truck className="w-5 h-5 text-teal-600 mr-3 flex-shrink-0" />
                      <span>Free shipping on orders over N1,000,000</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CreditCard className="w-5 h-5 text-teal-600 mr-3 flex-shrink-0" />
                      <span>Multiple payment methods accepted</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="p-6 border-t">
                  <p className="text-xs text-gray-600 mb-3 text-center">We accept</p>
                  <div className="flex justify-center items-center space-x-3">
                    <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">VISA</div>
                    <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">MC</div>
                    <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">AMEX</div>
                    <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">PP</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;