import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { ShopperContext } from '../../context/Context';

const Footer = () => {
  const {isAuthenticated} = React.useContext(ShopperContext);
  return (
    <footer className="bg-black text-gray-300 pt-10 pb-5">
      <div className="container mx-auto px-6 md:px-12">
        {/* Top section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          {/* Brand */}
          <div className="md:w-1/4">
            <h2 className="font-bold text-3xl text-white mb-3">Shopper.</h2>
            <p className="text-gray-400 leading-7">
              Your premium shopping destination for everything you need.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-blue-500"><Facebook size={20} /></a>
              <a href="#" className="hover:text-blue-400"><Twitter size={20} /></a>
              <a href="#" className="hover:text-pink-500"><Instagram size={20} /></a>
              <a href="#" className="hover:text-blue-700"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:w-1/5">
            <h3 className="font-bold text-xl mb-3">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              <li><a href={isAuthenticated ? '/products': '/login'} className="hover:text-white transition">All Products</a></li>
              <li><a href={isAuthenticated ? '/products': '/login'} className="hover:text-white transition">New Arrivals</a></li>
              <li><a href={isAuthenticated ? '/products': '/login'} className="hover:text-white transition">Popular Products</a></li>
              <li><a href={isAuthenticated ? '/products': '/login'} className="hover:text-white transition">Best Products</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="md:w-1/5">
            <h3 className="font-bold text-xl mb-3">Support</h3>
            <ul className="flex flex-col gap-2">
              <li><a href="/contact" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="/contact" className="hover:text-white transition">FAQ</a></li>
              <li><a href="/about" className="hover:text-white transition">About</a></li>
              <li><a href="/" className="hover:text-white transition">Home</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:w-1/5">
            <h3 className="font-bold text-xl mb-3">Legal</h3>
            <ul className="flex flex-col gap-2">
              <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white transition">Terms Of Service</a></li>
              <li><a href="/cookies" className="hover:text-white transition">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-8" />

        {/* Bottom section */}
        <div className="text-center text-gray-500 text-sm">
          &copy; 2025 Shopper. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
