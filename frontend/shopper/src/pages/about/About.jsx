import {useContext} from 'react';
import { Heart, Award, TrendingUp, Users, Globe, Zap, Shield, Star } from 'lucide-react';
import {Link} from 'react-router-dom';
import { ShopperContext } from '../../context/Context';


export default function About() {
    const {isAuthenticated} = useContext(ShopperContext);
  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Customers' },
    { icon: Globe, value: '100K+', label: 'Orders Delivered' },
    { icon: Award, value: '25+', label: 'Countries Served' },
    { icon: Star, value: '4.9/5', label: 'Customer Rating' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We put our customers at the heart of everything we do, ensuring exceptional service and satisfaction.'
    },
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: 'Every product is carefully curated and tested to meet our high standards of quality and authenticity.'
    },
    {
      icon: Zap,
      title: 'Fast & Reliable',
      description: 'Quick delivery, easy returns, and responsive support - we make shopping effortless.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation Driven',
      description: 'We constantly evolve our platform with the latest technology to enhance your shopping experience.'
    }
  ];

  const team = [
    { name: 'Sarah Johnson', role: 'Founder & CEO', image: '👩‍💼', description: 'Visionary leader with 15+ years in e-commerce' },
    { name: 'Michael Chen', role: 'CTO', image: '👨‍💻', description: 'Tech innovator driving our digital transformation' },
    { name: 'Emily Rodriguez', role: 'Head of Customer Experience', image: '👩‍🎨', description: 'Passionate about creating delightful user journeys' },
    { name: 'David Kim', role: 'Head of Operations', image: '👨‍🔧', description: 'Expert in logistics and supply chain management' }
  ];

  const milestones = [
    { year: '2019', title: 'Company Founded', description: 'Started with a vision to revolutionize online shopping' },
    { year: '2020', title: 'Reached 10K Customers', description: 'Rapid growth and customer trust' },
    { year: '2022', title: 'International Expansion', description: 'Expanded to 25+ countries worldwide' },
    { year: '2024', title: 'Industry Recognition', description: 'Awarded Best E-commerce Platform of the Year' }
  ];

  const testimonials = [
    { name: 'Jessica Martinez', role: 'Verified Customer', rating: 5, comment: 'Best online shopping experience ever! Fast shipping and amazing customer service.' },
    { name: 'Robert Chen', role: 'Verified Customer', rating: 5, comment: 'Quality products at great prices. Shopper has become my go-to store for everything!' },
    { name: 'Amanda Foster', role: 'Verified Customer', rating: 5, comment: 'Love the variety of products and the user-friendly website. Highly recommend!' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Transforming the Way You Shop Online
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-blue-100 mb-6 md:mb-8">
              We're on a mission to make premium products accessible to everyone, everywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link to={isAuthenticated ? "/products" : "/login"}>
                    <button className="px-6 md:px-8 py-3 md:py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Start Shopping
                    </button>
                </Link>
              
              <Link to="/contact">
                <button className="px-6 md:px-8 py-3 md:py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                    Contact Us
                </button>
              </Link>
              
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full mb-3 md:mb-4">
                  <stat.icon className="text-blue-600" size={window.innerWidth < 768 ? 24 : 32} />
                </div>
                <div className="text-2xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Our Story</h2>
              <div className="space-y-3 md:space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
                <p>
                  Founded in 2019, ShopHub was born from a simple idea: shopping online should be easy, 
                  enjoyable, and accessible to everyone. What started as a small team with big dreams 
                  has grown into a thriving community of over 50,000 satisfied customers worldwide.
                </p>
                <p>
                  We believe that quality products shouldn't come with premium price tags or complicated 
                  checkout processes. That's why we've built a platform that combines the best products 
                  from trusted brands with an intuitive shopping experience that puts you first.
                </p>
                <p>
                  Today, we're proud to serve customers in over 25 countries, delivering happiness one 
                  package at a time. Our commitment to excellence, customer satisfaction, and innovation 
                  drives everything we do.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 md:p-12 text-white text-center">
                <div className="text-6xl md:text-8xl mb-4 md:mb-6">🚀</div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Growing Every Day</h3>
                <p className="text-sm md:text-base text-blue-100">
                  Join thousands of customers who trust us for their shopping needs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Our Core Values</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              These principles guide our decisions and shape the way we serve our customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-2xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <value.icon className="text-blue-600" size={window.innerWidth < 768 ? 24 : 28} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">{value.title}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Our Journey</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              From humble beginnings to industry leaders
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            
            <div className="space-y-8 md:space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-md hover:shadow-xl transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-base md:text-lg">
                          {milestone.year}
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900">{milestone.title}</h3>
                      </div>
                      <p className="text-sm md:text-base text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Meet Our Team</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              The passionate people behind your favorite shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="bg-gradient-to-br from-blue-600 to-purple-700 h-40 md:h-48 flex items-center justify-center text-6xl md:text-8xl">
                  {member.image}
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2 md:mb-3 text-sm md:text-base">{member.role}</p>
                  <p className="text-gray-600 text-xs md:text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">What Our Customers Say</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Real feedback from real people who love shopping with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-shadow">
                <div className="flex mb-3 md:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base leading-relaxed italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg md:text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm md:text-base">{testimonial.name}</p>
                    <p className="text-xs md:text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-6 md:mb-8 px-4">
            Join thousands of happy customers and discover amazing products today
          </p>
          <Link to="/products" className="px-8 md:px-10 py-3 md:py-4 bg-white text-blue-600 rounded-lg font-semibold text-base md:text-lg hover:bg-gray-100 transition-colors">
            Browse Products
          </Link>
        </div>
      </section>
    </div>
  );
}