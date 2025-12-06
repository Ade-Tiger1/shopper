import {useState,useContext} from 'react'
import { 
  MapPin, CreditCard, Check, ChevronRight, Lock, Edit, 
  AlertCircle, CheckCircle, Truck, ShoppingBag, ArrowLeft
} from 'lucide-react';

import { ShopperContext } from '../../context/Context';

const Payment = () => {
  const { cart, shippingMethod } = useContext(ShopperContext);
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = shippingMethod === 'express' ? 19.99 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;


  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">Thank you for your purchase!</p>
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="flex justify-between mb-2">
              <span>Order #</span>
              <span className="font-bold">#{Math.floor(Math.random() * 100000)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total</span>
              <span className="font-bold text-blue-500 text-xl">
                N{total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
          <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
            Track Order
          </button>
        </div>
      </div>
  )
}

export default Payment
