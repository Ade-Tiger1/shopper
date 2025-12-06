import React, { useState, useContext } from 'react';
import { 
  ArrowRight, Star, Shield, Truck, Clock, Award, 
  TrendingUp, Users, Package, CheckCircle, Quote
} from 'lucide-react';

import { Link } from 'react-router-dom';
import { ShopperContext } from '../../context/Context';

function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const {isAuthenticated} = useContext(ShopperContext)
  

  const featuredProducts = [
    { 
      id: 1, 
      name: 'Classic Oxford Shirt', 
      price: 89.00, 
      oldPrice: 129.00, 
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
      rating: 4.8,
      reviews: 234
    },
    { 
      id: 2, 
      name: 'Tailored Blazer', 
      price: 249.00, 
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500',
      rating: 4.9,
      reviews: 189
    },
    { 
      id: 3, 
      name: 'Premium Chinos', 
      price: 119.00, 
      oldPrice: 159.00,
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500',
      rating: 4.7,
      reviews: 312
    },
    { 
      id: 4, 
      name: 'Leather Loafers', 
      price: 179.00, 
      image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500',
      rating: 4.9,
      reviews: 156
    }
  ];

  const categories = [
    { 
      name: 'Formal Wear', 
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
      count: 450
    },
    { 
      name: 'Casual Style', 
      image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=400',
      count: 680
    },
    { 
      name: 'Accessories', 
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      count: 280
    }
  ];

  const testimonials = [
    {
      name: 'Michael Anderson',
      role: 'Business Executive',
      text: 'The quality is exceptional. Every piece I\'ve purchased has exceeded expectations. The attention to detail and craftsmanship is truly remarkable.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    },
    {
      name: 'Sarah Mitchell',
      role: 'Fashion Designer',
      text: 'StyleHub has become my go-to destination for premium fashion. The curated selection and quality control is unmatched in the industry.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
    },
    {
      name: 'David Chen',
      role: 'Entrepreneur',
      text: 'Impeccable service and outstanding products. The shopping experience is seamless, and the quality speaks for itself.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
    }
  ];

  return (
    <div className="bg-white">
      
      {/* SECTION 1: HERO - MAIN VALUE PROPOSITION */}
      {/* SECTION 1: HERO - MAIN VALUE PROPOSITION */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
        {/* Animated Background Video/Pattern */}
        <div className="absolute inset-0">
          {/* Background Image with Parallax Effect */}
          <div 
            className="absolute inset-0 opacity-80"
            style={{
              backgroundImage: 'url("/images/hero6.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'scroll'
            }}
          ></div>
          
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
          
          {/* Floating Shapes Animation */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
            <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed"></div>
            <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>
          </div>
          
          {/* Moving Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 animate-grid-move" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(59, 130, 246) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -40px) scale(1.1); }
            66% { transform: translate(-20px, 30px) scale(0.9); }
          }
          
          @keyframes float-delayed {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(-40px, 30px) scale(1.15); }
            66% { transform: translate(30px, -20px) scale(0.85); }
          }
          
          @keyframes float-slow {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(20px, -30px) scale(1.05); }
          }
          
          @keyframes grid-move {
            0% { transform: translate(0, 0); }
            100% { transform: translate(40px, 40px); }
          }
          
          .animate-float {
            animation: float 20s ease-in-out infinite;
          }
          
          .animate-float-delayed {
            animation: float-delayed 25s ease-in-out infinite;
            animation-delay: 5s;
          }
          
          .animate-float-slow {
            animation: float-slow 30s ease-in-out infinite;
            animation-delay: 10s;
          }
          
          .animate-grid-move {
            animation: grid-move 20s linear infinite;
          }
        `}</style>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">Premium Quality Since 2020</span>
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                  Elevate Your
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    Personal Style
                  </span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                  Discover curated collections of premium clothing and accessories. 
                  We blend timeless elegance with contemporary design to help you express your unique style.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={isAuthenticated ? "/products" : "/login"}
                  className="relative z-50 group bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg 
                            hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl 
                            inline-flex items-center justify-center"
                >
                  Explore Collections
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-gray-900">125K+</div>
                  <div className="text-sm text-gray-600 mt-1">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">15K+</div>
                  <div className="text-sm text-gray-600 mt-1">Products</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">4.9/5</div>
                  <div className="text-sm text-gray-600 mt-1">Avg Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURED COLLECTIONS */}
      <section className="py-20 lg:py-15 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-4">
              <Package className="w-4 h-4" />
              <span className="text-sm font-semibold">Curated Selection</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Featured Collections
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked pieces that define modern elegance and timeless sophistication
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div 
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 transition-all hover:shadow-xl"
              >
                <div className="relative overflow-hidden bg-gray-50">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.oldPrice && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Save ${(product.oldPrice - product.price).toFixed(0)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                      {product.oldPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                      <Link to={isAuthenticated ? "/products": "/login"} className='flex justify-center items-center'>
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors inline-flex items-center">
              <Link to={isAuthenticated ? "/products": "/login"} className='flex justify-center items-center'>
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: SHOP BY CATEGORY */}
      <section className="py-20 lg:py-15 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our diverse range of carefully curated collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-2xl h-96 cursor-pointer"
              >
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">{category.name}</h3>
                  <p className="text-white/90 mb-4">{category.count}+ Items</p>
                  <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-colors inline-flex items-center">
                    <Link to={isAuthenticated ? "/products": "/login"} className='flex justify-center items-center'>
                      Explore
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </button>
                </div>

                <div className="absolute top-8 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-6 h-6 text-gray-900" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE US */}
      <section className="py-20 lg:py-15 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-semibold">Why StyleHub</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Experience Excellence in Every Detail
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  We're committed to delivering not just products, but a complete premium shopping experience 
                  that exceeds expectations at every touchpoint.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Shield className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Quality Guarantee</h3>
                    <p className="text-gray-600">
                      Every product undergoes rigorous quality control. We stand behind our products with comprehensive warranties and guarantees.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                    <Truck className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast & Reliable Delivery</h3>
                    <p className="text-gray-600">
                      Free express shipping on orders over $150. Track your order in real-time with our advanced logistics system.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <Clock className="w-7 h-7 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Customer Support</h3>
                    <p className="text-gray-600">
                      Our dedicated support team is always available to assist you. Get expert advice and quick resolutions anytime.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center">
                    <Users className="w-7 h-7 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Trusted by Thousands</h3>
                    <p className="text-gray-600">
                      Join over 125,000 satisfied customers who trust StyleHub for their fashion needs. See why they keep coming back.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=700"
                  alt="Why Choose Us"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Stats Cards */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-2xl p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 rounded-xl p-3">
                    <Star className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">4.9/5</div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: TESTIMONIALS */}
      <section className="py-20 lg:py-15 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(59, 130, 246) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Testimonials */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6">
              <Quote className="w-4 h-4" />
              <span className="text-sm font-semibold">Customer Stories</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Loved by Customers Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our customers have to say
            </p>
          </div>

          {/* Testimonial Carousel */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-12 border border-blue-100">
              <div className="flex items-center space-x-2 mb-6">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-2xl lg:text-3xl font-medium leading-relaxed mb-8 text-gray-900">
                "{testimonials[activeTestimonial].text}"
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-lg text-gray-900">{testimonials[activeTestimonial].name}</div>
                    <div className="text-gray-600">{testimonials[activeTestimonial].role}</div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === activeTestimonial ? 'bg-blue-600 w-8' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: NEWSLETTER & EXCLUSIVE OFFERS */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <style>{`
          @keyframes blob {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Newsletter */}
            <div className="text-white">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                <span className="relative flex h-3 w-3 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-semibold">Exclusive Member Benefits</span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Get 5% Off Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  First Order
                </span>
              </h2>

              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Join our exclusive community and unlock premium perks, early access to sales, 
                style tips, and member-only discounts delivered straight to your inbox.
              </p>

              {/* Email Form */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 mb-8">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl whitespace-nowrap">
                    <a href="/products">Get 5% Off</a>
                  </button>
                </div>
              </div>

              {/* Benefits List */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-blue-100">Early access to new collections & sales</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-blue-100">Exclusive member-only discounts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-blue-100">Personal style recommendations & tips</span>
                </div>
              </div>

              <p className="text-sm text-blue-200 mt-6">
                <span className="opacity-75">✓ Join 125,000+ subscribers</span>
                <span className="mx-2">•</span>
                <span className="opacity-75">✓ Unsubscribe anytime</span>
              </p>
            </div>

            {/* Right Side - Visual Cards */}
            <div className="relative">
              {/* Card Stack */}
              <div className="relative">
                {/* Card 1 - Top */}
                <div className="absolute -top-6 -right-6 w-80 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 shadow-2xl transform rotate-6 hover:rotate-3 transition-transform">
                  <div className="text-white">
                    <div className="text-5xl font-bold mb-2">5%</div>
                    <div className="text-lg font-semibold">OFF</div>
                    <div className="text-sm opacity-90 mt-2">First Order Discount</div>
                  </div>
                </div>

                {/* Card 2 - Middle */}
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-gray-900">
                      <div className="text-sm font-semibold text-gray-500 mb-1">MEMBER PERKS</div>
                      <div className="text-2xl font-bold">Shopper VIP</div>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">Free Shipping</span>
                      <span className="font-semibold text-green-600">✓ Active</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">Early Access</span>
                      <span className="font-semibold text-green-600">✓ Active</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-gray-600">Exclusive Deals</span>
                      <span className="font-semibold text-green-600">✓ Active</span>
                    </div>
                  </div>

                  <button className="w-full mt-6 bg-gray-900 text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
                    Claim Your Benefits
                  </button>
                </div>

                {/* Card 3 - Bottom */}
                <div className="absolute -bottom-6 -left-6 w-72 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 shadow-2xl transform -rotate-6 hover:-rotate-3 transition-transform">
                  <div className="text-white">
                    <div className="flex items-center space-x-2 mb-4">
                      <Star className="w-6 h-6 fill-current" />
                      <Star className="w-6 h-6 fill-current" />
                      <Star className="w-6 h-6 fill-current" />
                      <Star className="w-6 h-6 fill-current" />
                      <Star className="w-6 h-6 fill-current" />
                    </div>
                    <div className="text-lg font-semibold mb-2">Premium Quality</div>
                    <div className="text-sm opacity-90">Trusted by 125K+ customers</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Features Bar */}
          <div className="mt-20 pt-12 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center transform hover:scale-110 transition-transform">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <div className="text-white font-semibold mb-1">Free Shipping</div>
                <div className="text-blue-200 text-sm">Orders over $150</div>
              </div>

              <div className="text-center transform hover:scale-110 transition-transform">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="text-white font-semibold mb-1">Secure Payment</div>
                <div className="text-blue-200 text-sm">100% Protected</div>
              </div>

              <div className="text-center transform hover:scale-110 transition-transform">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-white font-semibold mb-1">Quality Guarantee</div>
                <div className="text-blue-200 text-sm">Premium materials</div>
              </div>

              <div className="text-center transform hover:scale-110 transition-transform">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-white font-semibold mb-1">24/7 Support</div>
                <div className="text-blue-200 text-sm">Always here to help</div>
              </div>
            </div>
          </div>
        </div>
      </section>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* SECTION 5: TRUST INDICATORS & SOCIAL PROOF */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">Trusted Worldwide</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Join Our Fashion Community
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Be part of a global movement of style-conscious individuals who demand excellence
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">125K+</div>
              <div className="text-gray-600 font-medium">Active Members</div>
              <div className="text-sm text-gray-500 mt-2">Growing daily</div>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">500K+</div>
              <div className="text-gray-600 font-medium">Orders Delivered</div>
              <div className="text-sm text-gray-500 mt-2">Since 2020</div>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">4.9/5</div>
              <div className="text-gray-600 font-medium">Average Rating</div>
              <div className="text-sm text-gray-500 mt-2">From 50K+ reviews</div>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-gray-600 font-medium">Satisfaction Rate</div>
              <div className="text-sm text-gray-500 mt-2">Customer approved</div>
            </div>
          </div>

          {/* Featured In / Trust Badges */}
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Featured In</h3>
              <p className="text-gray-600">Recognized by leading fashion publications</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">VOGUE</div>
                <div className="text-xs text-gray-500 mt-1">Fashion Magazine</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">GQ</div>
                <div className="text-xs text-gray-500 mt-1">Style Guide</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">ELLE</div>
                <div className="text-xs text-gray-500 mt-1">Fashion Weekly</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">FORBES</div>
                <div className="text-xs text-gray-500 mt-1">Business Journal</div>
              </div>
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="mt-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 lg:p-12 text-white">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-3xl font-bold mb-2">Live Activity</h3>
                <p className="text-blue-100">Real-time purchases from around the world</p>
              </div>
              <div className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" className='rounded-full w-10 h-10' alt="" />
                  </div>
                  <div>
                    <div className="font-semibold">Sarah M.</div>
                    <div className="text-sm text-blue-100">New York, USA</div>
                  </div>
                </div>
                <div className="text-sm">Just purchased <span className="font-semibold">Classic Oxford Shirt</span></div>
                <div className="text-xs text-blue-200 mt-2">2 minutes ago</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" className='rounded-full w-10 h-10' alt="" />
                  </div>
                  <div>
                    <div className="font-semibold">James K.</div>
                    <div className="text-sm text-blue-100">London, UK</div>
                  </div>
                </div>
                <div className="text-sm">Just purchased <span className="font-semibold">Tailored Blazer</span></div>
                <div className="text-xs text-blue-200 mt-2">5 minutes ago</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" className='rounded-full w-10 h-10' alt="" />
                  </div>
                  <div>
                    <div className="font-semibold">John S.</div>
                    <div className="text-sm text-blue-100">Sydney, AU</div>
                  </div>
                </div>
                <div className="text-sm">Just purchased <span className="font-semibold">Premium Chinos</span></div>
                <div className="text-xs text-blue-200 mt-2">8 minutes ago</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;