import React, { useState, useEffect } from 'react';
import { 
  Package, Truck, CheckCircle, XCircle, Clock, Eye, 
  Download, RotateCcw, MessageCircle, Search, Filter,
  ChevronDown, MapPin, CreditCard, Calendar, ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

function OrderPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  let BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/orders`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.msg || "Failed to fetch orders");
        }
        const data = await res.json();
        setOrders(data.orders || data); // use real-time data as is
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusConfig = (status) => {
    const configs = {
      delivered: { label: 'Delivered', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
      shipped: { label: 'Shipped', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
      processing: { label: 'Processing', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
      cancelled: { label: 'Cancelled', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
    };
    return configs[status] || configs.processing;
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.orderStatus === filterStatus;
    const matchesSearch =
      order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item =>
        (item.product?.name || item.name).toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesStatus && matchesSearch;
  });

  const StatusBadge = ({ status }) => {
    const config = getStatusConfig(status);
    const Icon = config.icon;
    return (
      <div className={`inline-flex items-center px-3 py-1 rounded-full ${config.bg} ${config.border} border`}>
        <Icon className={`w-4 h-4 ${config.color} mr-2`} />
        <span className={`text-sm font-medium ${config.color}`}>{config.label}</span>
      </div>
    );
  };

  // Order Detail Modal
  if (selectedOrder) {
    const config = getStatusConfig(selectedOrder.orderStatus);
    const Icon = config.icon;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Order Details</h2>
            <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-800">
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          <StatusBadge status={selectedOrder.orderStatus} />
          <div className="mt-4 space-y-4">
            {selectedOrder.items.map(item => (
              <div key={item._id} className="flex items-center space-x-4">
                <img
                  src={item.product?.image || item.image}
                  alt={item.product?.name || item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <p className="font-medium">{item.product?.name || item.name}</p>
                  <p className="text-gray-500">{item.quantity} x ${item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right font-semibold text-gray-800">
            Total: ${selectedOrder.total}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/checkout">
              <button className="mr-4 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600">View and track your orders</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-teal-50 px-4 py-2 rounded-lg">
              <span className="text-blue-500 font-semibold">{orders.length} Total Orders</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders by order ID or product name..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-blue-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Orders</option>
              <option value="delivered">Delivered</option>
              <option value="shipped">Shipped</option>
              <option value="processing">Processing</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : "You haven't placed any orders yet"}
            </p>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => {
              const config = getStatusConfig(order.orderStatus);
              return (
                <div 
                  key={order._id} 
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-gray-700">Order ID: {order._id}</span>
                    <StatusBadge status={order.orderStatus} />
                  </div>

                  {/* Products in Order */}
                  <div className="space-y-3">
                    {order.items.map(item => (
                      <div key={item._id} className="flex items-center space-x-4">
                        <img
                          src={item.product?.image || item.image}
                          alt={item.product?.name || item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium">{item.product?.name || item.name}</p>
                          <p className="text-gray-500">{item.quantity} x ${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Total */}
                  <div className="mt-4 text-right font-semibold text-gray-800">
                    Total: ${order.total}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderPage;
