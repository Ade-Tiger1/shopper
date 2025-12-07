import React, { useState, useEffect } from 'react';
import { 
  Users, Package, ShoppingCart, DollarSign, Banknote, TrendingUp, 
  Search, Filter, Edit, Trash2, CheckCircle, Eye, 
  ArrowUpRight, ArrowDownRight, LayoutDashboard, ShoppingBag, 
  CreditCard, Settings, Bell, LogOut, Menu, X, UserPlus, Shield, Clock, XCircle, Upload
} from 'lucide-react';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState('general');
  const navigate = useNavigate();

  // Real data states
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  let BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Fetch real data on component mount and tab change
  useEffect(() => {
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'products') fetchProducts();
    if (activeTab === 'orders') fetchOrders();
    if (activeTab === 'transactions') fetchTransactions();
    if (activeTab === 'dashboard') {
      fetchOrders();
      fetchUsers();
      fetchProducts();
      fetchTransactions();
    }
  }, [activeTab]);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/user`, {
        credentials: 'include'
      });
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };


  // Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/products`, {
        credentials: 'include'
      });
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/orders/admin/all-orders`, {
        credentials: 'include'
      });
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Transactions
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/transactions`, {
        credentials: 'include'
      });
      const data = await response.json();
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };


  // Calculate real stats
  const calculateStats = () => {
    const totalRevenue = transactions
      .filter(t => t.status === 'paid')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalOrders = orders.length;
    const totalProducts = products.length;
    const totalUsers = users.length;

    return {
      revenue: `₦${totalRevenue.toLocaleString()}`,
      orders: totalOrders,
      products: totalProducts,
      users: totalUsers
    };
  };

  

  const stats = [
    { title: 'Total Revenue', value: calculateStats().revenue, change: '+20.1%', trend: 'up', icon: DollarSign, color: 'blue' },
    { title: 'Total Orders', value: calculateStats().orders, change: '+15.3%', trend: 'up', icon: ShoppingCart, color: 'green' },
    { title: 'Total Products', value: calculateStats().products, change: '+5.2%', trend: 'up', icon: Package, color: 'purple' },
    { title: 'Total Users', value: calculateStats().users, change: '+12.5%', trend: 'up', icon: Users, color: 'orange' }
  ];

  // const users = [
  //   { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', status: 'Active', orders: 12, spent: '$1,234' },
  //   { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer', status: 'Active', orders: 8, spent: '$890' },
  //   { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Admin', status: 'Active', orders: 5, spent: '$567' },
  //   { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Customer', status: 'Inactive', orders: 3, spent: '$234' },
  // ];

  // const products = [
  //   { id: 1, name: 'Classic Oxford Shirt', category: 'Clothing', price: '$89.00', stock: 45, sales: 234, status: 'Active' },
  //   { id: 2, name: 'Tailored Blazer', category: 'Clothing', price: '$249.00', stock: 12, sales: 189, status: 'Active' },
  //   { id: 3, name: 'Premium Chinos', category: 'Clothing', price: '$119.00', stock: 8, sales: 312, status: 'Low Stock' },
  //   { id: 4, name: 'Leather Loafers', category: 'Footwear', price: '$179.00', stock: 23, sales: 156, status: 'Active' },
  // ];

  // const orders = [
  //   { id: '#ORD-001', customer: 'John Doe', date: '2025-01-10', amount: '$234.00', status: 'Delivered', items: 3 },
  //   { id: '#ORD-002', customer: 'Jane Smith', date: '2025-01-11', amount: '$567.00', status: 'Processing', items: 5 },
  //   { id: '#ORD-003', customer: 'Mike Johnson', date: '2025-01-12', amount: '$123.00', status: 'Pending', items: 2 },
  //   { id: '#ORD-004', customer: 'Sarah Williams', date: '2025-01-13', amount: '$890.00', status: 'Shipped', items: 7 },
  // ];

  // const transactions = [
  //   { id: 'TXN-001', order: '#ORD-001', customer: 'John Doe', amount: '$234.00', method: 'Credit Card', status: 'Completed', date: '2025-01-10' },
  //   { id: 'TXN-002', order: '#ORD-002', customer: 'Jane Smith', amount: '$567.00', method: 'PayPal', status: 'Completed', date: '2025-01-11' },
  //   { id: 'TXN-003', order: '#ORD-003', customer: 'Mike Johnson', amount: '$123.00', method: 'Debit Card', status: 'Pending', date: '2025-01-12' },
  //   { id: 'TXN-004', order: '#ORD-004', customer: 'Sarah Williams', amount: '$890.00', method: 'Credit Card', status: 'Failed', date: '2025-01-13' },
  // ];

  

  // Delete User Function
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const response = await fetch(`${BACKEND_URL}/user/delete/${userId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (response.ok) {
        toast.success('User deleted successfully');
        fetchUsers(); // Refresh list
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user');
    }
  };

  // Delete Product Function
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/products/delete-product/${productId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (response.ok) {
        toast.success('Product deleted successfully');
        fetchProducts(); // Refresh list
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product');
    }
  };

  // Update Order Status
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/order/admin/delete-order/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ orderStatus: newStatus })
      });
      
      if (response.ok) {
        toast.success('Order status updated');
        fetchOrders(); // Refresh list
      } else {
        toast.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Error updating order');
    }
  };

  const handleLogout = async(e)=>{
    e.stopPropagation();
    const res = fetch(`${BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include"
    });
    if(!res.ok){
        toast.error("Error logging out");
    }
    toast.success("Logged out successfully");
    navigate("/login");
  }

  const StatusBadge = ({ status }) => {
    const colors = {
      'Active': 'bg-green-100 text-green-700',
      'Inactive': 'bg-gray-100 text-gray-700',
      'delivered': 'bg-green-100 text-green-700',
      'processing': 'bg-blue-100 text-blue-700',
      'pending': 'bg-yellow-100 text-yellow-700',
      'shipped': 'bg-purple-100 text-purple-700',
      'paid': 'bg-green-100 text-green-700',
      'Failed': 'bg-red-100 text-red-700',
      'Low Stock': 'bg-orange-100 text-orange-700'
    };
    return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status] || 'bg-gray-100 text-gray-700'}`}>{status}</span>;
  };


  const Sidebar = () => (
    <aside className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-40`}>
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-500">Admin Panel</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'transactions', label: 'Transactions', icon: CreditCard },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => (
            <li key={item.id}>
              <button
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors" onClick={handleLogout}>
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );

  const DashboardContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              {stat.trend === 'up' ? <ArrowUpRight className="w-5 h-5 text-green-500" /> : <ArrowDownRight className="w-5 h-5 text-red-500" />}
            </div>
            <h3 className="text-gray-500 text-sm mb-1">{stat.title}</h3>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {!orders.length && <p className="text-gray-500 text-center font-semibold">You have no order.</p>}
              {orders.slice(0, 4).map((order) => (
                <div key={order._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{order._id}</p>
                    <p className="text-sm text-gray-500">{order.userId}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{order.totalAmount}</p>
                    <StatusBadge status={order.orderStatus} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Top Products</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {products.slice(0, 4).map((product) => (
                <div key={product._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{product.title}</p>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{product.inStock} stock</p>
                    <p className="text-sm text-gray-500">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

   const UsersContent = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-500">Manage users and their permissions</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" placeholder="Search users..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Roles</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Created At</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{user.name}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{user.role || 'N/A'}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link to={`/admin/users/edit/${user._id}`}>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                            <Edit className="w-5 h-5 text-gray-600" />
                          </button>
                        </Link>
                        
                        <button 
                          onClick={() => handleDeleteUser(user._id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors" 
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );


  // Add this ProductsContent function to your AdminDashboard component
// Place it after the UsersContent function and before the return statement

    // Replace your existing ProductsContent function with this enhanced version

const ProductsContent = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [productImages, setProductImages] = useState([]);
  

  // Add Product Modal Component
  const AddProductModal = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      category: 'Clothing',
      subcategory: '',
      price: '',
      discountPrice: '',
      stock: '',
      sizes: [],
      isPromo: false
    });

    const [productImages, setProductImages] = useState([null, null, null, null]);
    const [imagePreviews, setImagePreviews] = useState(['', '', '', '']);

    const categories = {
      'men': ['trousers', 'shirts', 'caps', 'shoes', 'gown', 'shorts'],
      'women': ['trousers', 'shirts', 'caps', 'shoes', 'gown', 'shorts'],
      'kids': ['trousers', 'shirts', 'caps', 'shoes', 'gown', 'shorts'],
    };

    const sizeOptions = ["S", "M", "L", "XL", "XXL"];

    const handleSizeToggle = (size) => {
      if (formData.sizes.includes(size)) {
        setFormData({...formData, sizes: formData.sizes.filter(s => s !== size)});
      } else {
        setFormData({...formData, sizes: [...formData.sizes, size]});
      }
    };

    const handleImageUpload = (index, e) => {
      const file = e.target.files[0];
      if (file) {
        // Create preview URL
        const previewURL = URL.createObjectURL(file);
        
        const newImages = [...productImages];
        newImages[index] = file;
        setProductImages(newImages);

        const newPreviews = [...imagePreviews];
        newPreviews[index] = previewURL;
        setImagePreviews(newPreviews);
      }
    };

    const removeImage = (index) => {
      const newImages = [...productImages];
      newImages[index] = null;
      setProductImages(newImages);

      const newPreviews = [...imagePreviews];
      newPreviews[index] = '';
      setImagePreviews(newPreviews);
    };

    const handleSubmit = async(e) => {
      e.preventDefault();
      
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('subcategory', formData.subcategory);
      submitData.append('price', formData.price);
      submitData.append('discountPrice', formData.discountPrice ? formData.discountPrice : 0);
      submitData.append('stock', formData.stock);
      submitData.append('sizes', JSON.stringify(formData.sizes));
      submitData.append('isPromo', formData.isPromo);
      
      // Add images
      productImages.forEach((image) => {
        if (image) submitData.append("image", image);
      });

      // console.log('Product Data:', {
      //   ...formData,
      //   images: productImages.filter(img => img !== null)
      // });
      
      // Add your product submission logic here
      try {
    const res = await fetch(`${BACKEND_URL}/api/products/create-product`, {
      method: "POST",
      credentials: "include",   // to send cookie token
      body: submitData          // no headers needed for FormData
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error("Error:", data);
      return toast.error(data.message || "Something went wrong");
    }

    
    toast.success("Product created successfully!");
    fetchProducts(); // Refresh product list
    setShowAddModal(false);

  } catch (err) {
    console.error("Network error:", err);
    alert("Network error — check console");
  }
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
          {/* Modal Header - Fixed */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
              <p className="text-xs text-gray-500 mt-1">Fill in the details below</p>
            </div>
            <button 
              onClick={() => setShowAddModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Modal Body - Scrollable */}
          <div className="overflow-y-auto flex-1 p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Product Images */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Images (Up to 4)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 1, 2, 3].map((index) => (
                    <div key={index}>
                      <input
                        type="file"
                        id={`image-upload-${index}`}
                        accept="image/*"
                        onChange={(e) => handleImageUpload(index, e)}
                        className="hidden"
                      />
                      <label
                        htmlFor={`image-upload-${index}`}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-2 text-center hover:border-blue-500 transition-colors h-20 flex items-center justify-center relative cursor-pointer block"
                      >
                        {imagePreviews[index] ? (
                          <>
                            <img 
                              src={imagePreviews[index]} 
                              alt={`Product ${index + 1}`} 
                              className="w-full h-full object-cover rounded" 
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                removeImage(index);
                              }}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </>
                        ) : (
                          <div className="text-center">
                            <Upload className="w-6 h-6 text-gray-400 mx-auto" />
                            <p className="text-xs text-gray-500 mt-1">Upload</p>
                          </div>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">Click on boxes to upload images from your computer</p>
              </div>

              {/* Product Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter product title"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Product Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter product description"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Category and Subcategory */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value, subcategory: ''})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    {Object.keys(categories).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subcategory *</label>
                  <select
                    required
                    value={formData.subcategory}
                    onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!formData.category}
                  >
                    <option value="">Select</option>
                    {formData.category && categories[formData.category]?.map(subcat => (
                      <option key={subcat} value={subcat}>{subcat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Available Sizes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Available Sizes *</label>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                        formData.sizes.includes(size)
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-blue-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price, Discount Price, and Stock */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($) *</label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="number"
                      required
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="0.00"
                      className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Discount ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="number"
                      step="0.01"
                      value={formData.discountPrice}
                      onChange={(e) => setFormData({...formData, discountPrice: e.target.value})}
                      placeholder="0.00"
                      className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Stock *</label>
                  <div className="relative">
                    <Package className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="number"
                      required
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                      placeholder="0"
                      className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Is Promo */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-semibold text-sm text-gray-900">Promotional Product</p>
                      <p className="text-xs text-gray-600">Feature in promo banners</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.isPromo}
                      onChange={(e) => setFormData({...formData, isPromo: e.target.checked})}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>

              <button
              type="submit"
              disabled={formData.sizes.length === 0}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add Product
            </button>
            </form>
          </div>

          {/* Modal Footer - Fixed */}
          <div className="p-4 border-t border-gray-200 flex items-center justify-end space-x-3 flex-shrink-0">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-5 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm"
            >
              Cancel
            </button>
            {/* <button
              type="submit"
              disabled={formData.sizes.length === 0}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add Product
            </button> */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
          <p className="text-gray-500">Manage your product inventory</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
        >
          <Package className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Total Products</h3>
          <p className="text-3xl font-bold text-gray-900">{products.length}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Active Products</h3>
          <p className="text-3xl font-bold text-gray-900">
            {products.length}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Stock</h3>
          <p className="text-3xl font-bold text-gray-900">
            {products.filter(p => p.inStock >= 1).reduce((sum, p) => sum + p.inStock, 0).toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Banknote className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Total Value</h3>
          <p className="text-3xl font-bold text-gray-900">
            N{products.reduce((sum, p) => sum + (p.price * p.inStock), 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Sizes</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Discount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{product.title}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{product.category}</td>
                  <td className="px-6 py-4 text-gray-900 font-semibold">{product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${product.stock < 15 ? 'text-red-600' : 'text-gray-900'}`}>
                      {product.inStock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{product.sizes.join(", ")}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={product.discountPrice ? product.discountPrice : 0} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Link to={`/admin/products/${product._id}`}>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View">
                          <Eye className="w-5 h-5 text-gray-600" />
                        </button>
                      </Link>
                      <Link to={`/admin/products/edit/${product._id}`}>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                          <Edit className="w-5 h-5 text-blue-600" />
                        </button>
                      </Link>
                      
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Delete" onClick={() => handleDeleteProduct(product._id)}>
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{products.length}</span> products
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
              1
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold">
              2
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && <AddProductModal />}
    </div>
  );
};

// Make sure to import Upload at the top:
// import { ..., Upload, X } from 'lucide-react';

    


    // Add this OrdersContent function to your AdminDashboard component
    // Place it after the ProductsContent function and before the return statement

    const OrdersContent = () => (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
            <p className="text-gray-500">Track and manage customer orders</p>
        </div>
        <div className="flex items-center space-x-2">
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Orders</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            </select>
        </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Total Orders</h3>
            <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
            <p className="text-sm text-green-600 mt-2">+12% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Pending Orders</h3>
            <p className="text-3xl font-bold text-gray-900">
            {orders.filter(o => o.orderStatus === 'Pending').length}
            </p>
            <p className="text-sm text-gray-500 mt-2">Awaiting processing</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-600" />
            </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Shipped Orders</h3>
            <p className="text-3xl font-bold text-gray-900">
            {orders.filter(o => o.orderStatus === 'Shipped').length}
            </p>
            <p className="text-sm text-gray-500 mt-2">In transit</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Delivered Orders</h3>
            <p className="text-3xl font-bold text-gray-900">
            {orders.filter(o => o.orderStatus === 'Delivered').length}
            </p>
            <p className="text-sm text-gray-500 mt-2">Successfully delivered</p>
        </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                type="text"
                placeholder="Search orders by ID or customer..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Filter className="w-5 h-5" />
                <span>Filter</span>
            </button>
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Items</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                    <p className="font-semibold text-blue-600">{order._id}</p>
                    </td>
                    <td className="px-6 py-4">
                    <div>
                        <p className="font-semibold text-gray-900">{order.userId}</p>
                        <p className="text-sm text-gray-500">Customer</p>
                    </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{order.createdAt}</td>
                    <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{order.items.product}</span>
                    </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">{order.totalAmout}</td>
                    <td className="px-6 py-4">
                    <select 
                        className="px-3 py-1 rounded-full text-xs font-semibold border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 cursor-pointer"
                        defaultValue={order.orderStatus}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                    </td>
                    <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                        <button 
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors" 
                        title="View Details"
                        >
                        <Eye className="w-5 h-5 text-blue-600" />
                        </button>
                        <button 
                        className="p-2 hover:bg-green-50 rounded-lg transition-colors" 
                        title="Update Status"
                        >
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        </button>
                        <button 
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors" 
                        title="Print Invoice"
                        >
                        <Edit className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{orders.length}</span> orders
            </p>
            <div className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold">
                Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                1
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold">
                2
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold">
                Next
            </button>
            </div>
        </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Order Activity</h3>
        <div className="space-y-4">
            {orders.slice(0, 5).map((order, index) => (
            <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    order.orderStatus === 'Delivered' ? 'bg-green-100' :
                    order.orderStatus === 'Shipped' ? 'bg-purple-100' :
                    order.orderStatus === 'Processing' ? 'bg-blue-100' :
                    'bg-yellow-100'
                }`}>
                    {order.orderStatus === 'Delivered' ? <CheckCircle className="w-5 h-5 text-green-600" /> :
                    order.orderStatus === 'Shipped' ? <Package className="w-5 h-5 text-purple-600" /> :
                    order.orderStatus === 'Processing' ? <ShoppingCart className="w-5 h-5 text-blue-600" /> :
                    <Clock className="w-5 h-5 text-yellow-600" />}
                </div>
                </div>
                <div className="flex-1">
                <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">{order.id} - {order.customer}</p>
                    <span className="text-sm text-gray-500">{order.date}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                    Order {order.orderStatus.toLowerCase()} • {order.items.product} items • {order.totalAmout}
                </p>
                </div>
            </div>
            ))}
        </div>
        </div>
    </div>
    );




    // Add this TransactionsContent function to your AdminDashboard component
    // Place it after the OrdersContent function and before the return statement

    const TransactionsContent = () => (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h2 className="text-2xl font-bold text-gray-900">Payment Transactions</h2>
            <p className="text-gray-500">Monitor all payment transactions</p>
        </div>
        <div className="flex items-center space-x-2">
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Transactions</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
            </select>
        </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Total Transactions</h3>
            <p className="text-3xl font-bold text-gray-900">{transactions.length}</p>
            <p className="text-sm text-green-600 mt-2">+8% from last week</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Completed</h3>
            <p className="text-3xl font-bold text-gray-900">
            {transactions.filter(t => t.status === 'Completed').length}
            </p>
            <p className="text-sm text-gray-500 mt-2">Successfully processed</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Pending</h3>
            <p className="text-3xl font-bold text-gray-900">
            {transactions.filter(t => t.status === 'Pending').length}
            </p>
            <p className="text-sm text-gray-500 mt-2">Awaiting confirmation</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
            </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Failed</h3>
            <p className="text-3xl font-bold text-gray-900">
            {transactions.filter(t => t.status === 'Failed').length}
            </p>
            <p className="text-sm text-gray-500 mt-2">Need attention</p>
        </div>
        </div>

        {/* Revenue Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
            <h3 className="text-blue-100 text-sm font-medium">Total Revenue</h3>
            <DollarSign className="w-6 h-6 text-blue-200" />
            </div>
            <p className="text-4xl font-bold mb-2">
            ${transactions.reduce((sum, t) => {
                if (t.status === 'Completed') {
                return sum + parseFloat(t.amount.replace('N', '').replace(',', ''));
                }
                return sum;
            }, 0).toFixed(2)}
            </p>
            <p className="text-blue-100 text-sm">From completed transactions</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
            <h3 className="text-green-100 text-sm font-medium">Average Transaction</h3>
            <TrendingUp className="w-6 h-6 text-green-200" />
            </div>
            <p className="text-4xl font-bold mb-2">
            ${(transactions.reduce((sum, t) => sum + parseFloat(t.amount.replace('N', '').replace(',', '')), 0) / transactions.length).toFixed(2)}
            </p>
            <p className="text-green-100 text-sm">Per transaction</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-100 text-sm font-medium">Success Rate</h3>
            <ArrowUpRight className="w-6 h-6 text-purple-200" />
            </div>
            <p className="text-4xl font-bold mb-2">
            {((transactions.filter(t => t.status === 'Completed').length / transactions.length) * 100).toFixed(1)}%
            </p>
            <p className="text-purple-100 text-sm">Transaction success rate</p>
        </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                type="text"
                placeholder="Search by transaction ID, order ID, or customer..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Filter className="w-5 h-5" />
                <span>Filter</span>
            </button>
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Transaction ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Method</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {transactions.map((transaction) => (
                <tr key={transaction._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{transaction._id}</p>
                    </td>
                    <td className="px-6 py-4">
                    <p className="font-semibold text-blue-600">{transaction.orderId}</p>
                    </td>
                    <td className="px-6 py-4">
                    <div>
                        <p className="font-semibold text-gray-900">{transaction.userId}</p>
                        <p className="text-sm text-gray-500">Customer</p>
                    </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{transaction.createdAt}</td>
                    <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{transaction.currency}</span>
                    </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">{transaction.amount}</td>
                    <td className="px-6 py-4">
                    <StatusBadge status={transaction.status} />
                    </td>
                    <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                        <button 
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors" 
                        title="View Details"
                        >
                        <Eye className="w-5 h-5 text-blue-600" />
                        </button>
                        {transaction.status === 'Pending' && (
                        <button 
                            className="p-2 hover:bg-green-50 rounded-lg transition-colors" 
                            title="Approve"
                        >
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        </button>
                        )}
                        {transaction.status === 'Failed' && (
                        <button 
                            className="p-2 hover:bg-orange-50 rounded-lg transition-colors" 
                            title="Retry"
                        >
                            <Clock className="w-5 h-5 text-orange-600" />
                        </button>
                        )}
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{transactions.length}</span> transactions
            </p>
            <div className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold">
                Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                1
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold">
                2
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold">
                Next
            </button>
            </div>
        </div>
        </div>

        {/* Payment Methods Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Payment Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Credit Card', 'PayPal', 'Debit Card'].map((method) => {
            const count = transactions.filter(t => t.method === method).length;
            const percentage = ((count / transactions.length) * 100).toFixed(1);
            return (
                <div key={method} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 ]text-blue-600" />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">{method}</p>
                        <p className="text-sm text-gray-500">{count} transactions</p>
                    </div>
                    </div>
                </div>
                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                    <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-blue-600">
                        {percentage}%
                        </span>
                    </div>
                    </div>
                    <div className="overflow-hidden h-2 text-xs flex rounded-full bg-blue-100">
                    <div 
                        style={{ width: `${percentage}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
                    ></div>
                    </div>
                </div>
                </div>
            );
            })}
        </div>
        </div>
    </div>
    );

    // Import XCircle at the top of your file if not already imported:



    // Add this SettingsContent function to your AdminDashboard component
    // Place it after the TransactionsContent function and before the return statement

    const SettingsContent = () => {
    const [activeSettingsTab, setActiveSettingsTab] = useState('general');

    return (
        <div className="space-y-6">
        {/* Header */}
        <div>
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            <p className="text-gray-500">Manage your store configuration and preferences</p>
        </div>

        {/* Settings Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
                {[
                { id: 'general', label: 'General', icon: Settings },
                { id: 'notifications', label: 'Notifications', icon: Bell },
                { id: 'shipping', label: 'Shipping', icon: Package },
                { id: 'payments', label: 'Payments', icon: CreditCard },
                { id: 'security', label: 'Security', icon: Shield },
                { id: 'advanced', label: 'Advanced', icon: TrendingUp }
                ].map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveSettingsTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeSettingsTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                </button>
                ))}
            </nav>
            </div>

            {/* General Settings */}
            {activeSettingsTab === 'general' && (
            <div className="p-6 space-y-6">
                <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Store Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Store Name *</label>
                    <input
                        type="text"
                        defaultValue="Shopper"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Store Email *</label>
                    <input
                        type="email"
                        defaultValue="ade@gmail.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                        type="tel"
                        defaultValue="+234 815 984 7567"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>NGN (N)</option>
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>JPY (¥)</option>
                    </select>
                    </div>
                    <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Store Address</label>
                    <textarea
                        rows="3"
                        defaultValue="123 Fashion Street, New York, NY 10001, USA"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                    </div>
                </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>EST (UTC-5)</option>
                        <option>PST (UTC-8)</option>
                        <option>GMT (UTC+0)</option>
                        <option>CET (UTC+1)</option>
                    </select>
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                    </select>
                    </div>
                </div>
                </div>
            </div>
            )}

            {/* Notifications Settings */}
            {activeSettingsTab === 'notifications' && (
            <div className="p-6 space-y-6">
                <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
                <div className="space-y-4">
                    {[
                    { label: 'New Order Alerts', desc: 'Get notified when new orders arrive' },
                    { label: 'Low Stock Alerts', desc: 'Get notified when products are low in stock' },
                    { label: 'Payment Notifications', desc: 'Get notified about payment transactions' },
                    { label: 'Customer Messages', desc: 'Get notified when customers send messages' },
                    { label: 'Daily Sales Report', desc: 'Receive daily sales summary via email' }
                    ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={index < 3} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    ))}
                </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Push Notifications</h3>
                <div className="space-y-4">
                    {[
                    { label: 'Desktop Notifications', desc: 'Show notifications on your desktop' },
                    { label: 'Mobile Push', desc: 'Receive push notifications on mobile devices' }
                    ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    ))}
                </div>
                </div>
            </div>
            )}

            {/* Shipping Settings */}
            {activeSettingsTab === 'shipping' && (
            <div className="p-6 space-y-6">
                <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Rates</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Standard Shipping</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                        type="number"
                        defaultValue="10.00"
                        step="0.01"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">5-7 business days</p>
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Express Shipping</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                        type="number"
                        defaultValue="25.00"
                        step="0.01"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">2-3 business days</p>
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Overnight Shipping</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                        type="number"
                        defaultValue="45.00"
                        step="0.01"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Next business day</p>
                    </div>
                </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Free Shipping</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start space-x-3">
                    <Package className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                        <p className="font-medium text-blue-900 mb-1">Free Shipping Threshold</p>
                        <p className="text-sm text-blue-700">Orders above this amount qualify for free shipping</p>
                    </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Order Amount</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                        type="number"
                        defaultValue="150.00"
                        step="0.01"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    </div>
                    <div className="flex items-end">
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                        <span className="text-sm font-medium text-gray-900">Enable free shipping</span>
                    </label>
                    </div>
                </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Zones</h3>
                <div className="space-y-3">
                    {['Domestic (USA)', 'Canada', 'Europe', 'Asia Pacific'].map((zone, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                        <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">{zone}</p>
                            <p className="text-sm text-gray-500">Active shipping zone</p>
                        </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Edit</button>
                    </div>
                    ))}
                </div>
                </div>
            </div>
            )}

            {/* Payments Settings */}
            {activeSettingsTab === 'payments' && (
            <div className="p-6 space-y-6">
                <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
                <div className="space-y-4">
                    {[
                    { name: 'Credit/Debit Cards', desc: 'Visa, Mastercard, American Express', enabled: true },
                    { name: 'PayPal', desc: 'Pay with your PayPal account', enabled: true },
                    { name: 'Apple Pay', desc: 'Fast and secure payment with Apple Pay', enabled: false },
                    { name: 'Google Pay', desc: 'Pay quickly with Google Pay', enabled: false }
                    ].map((method, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">{method.name}</p>
                            <p className="text-sm text-gray-500">{method.desc}</p>
                        </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={method.enabled} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    ))}
                </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Tax Rate (%)</label>
                    <input
                        type="number"
                        defaultValue="8.5"
                        step="0.1"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                    <div className="flex items-end">
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                        <span className="text-sm font-medium text-gray-900">Enable automatic tax calculation</span>
                    </label>
                    </div>
                </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Currency Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>USD - US Dollar ($)</option>
                        <option>EUR - Euro (€)</option>
                        <option>GBP - British Pound (£)</option>
                        <option>JPY - Japanese Yen (¥)</option>
                    </select>
                    </div>
                    <div className="flex items-end">
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                        <span className="text-sm font-medium text-gray-900">Enable multi-currency support</span>
                    </label>
                    </div>
                </div>
                </div>
            </div>
            )}

            {/* Security Settings */}
            {activeSettingsTab === 'security' && (
            <div className="p-6 space-y-6">
                <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Password & Authentication</h3>
                <div className="space-y-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <input
                        type="password"
                        placeholder="Enter current password"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Update Password
                    </button>
                </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                        <p className="font-medium text-green-900 mb-1">Two-Factor Authentication Enabled</p>
                        <p className="text-sm text-green-700">Your account is protected with 2FA</p>
                    </div>
                    </div>
                </div>
                <button className="text-red-600 hover:text-red-700 font-medium">Disable 2FA</button>
                </div>

                <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Sessions</h3>
                <div className="space-y-3">
                    {[
                    { device: 'Chrome on Windows', location: 'New York, USA', time: 'Active now' },
                    { device: 'Safari on iPhone', location: 'Los Angeles, USA', time: '2 hours ago' }
                    ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                        <p className="font-medium text-gray-900">{session.device}</p>
                        <p className="text-sm text-gray-500">{session.location} • {session.time}</p>
                        </div>
                        <button className="text-red-600 hover:text-red-700 font-medium text-sm">Revoke</button>
                    </div>
                    ))}
                </div>
                </div>
            </div>
            )}

            {/* Advanced Settings */}
            {activeSettingsTab === 'advanced' && (
            <div className="p-6 space-y-6">
                <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
                <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                        <p className="font-medium text-gray-900">Export All Data</p>
                        <p className="text-sm text-gray-500">Download all your store data in JSON format</p>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Export
                        </button>
                    </div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                        <p className="font-medium text-gray-900">Import Data</p>
                        <p className="text-sm text-gray-500">Import products, orders, or customers from CSV</p>
                        </div>
                        <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium">
                        Import
                        </button>
                    </div>
                    </div>
                </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">API & Integrations</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                    <p className="font-medium text-gray-900 mb-2">API Key</p>
                    <div className="flex items-center space-x-2">
                    <code className="flex-1 bg-white px-4 py-2 border border-gray-200 rounded font-mono text-sm">
                        sk_live_xxxxxxxxxxxxxxxxxxxxx
                    </code>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Copy
                    </button>
                    </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium">Generate New API Key</button>
                </div>

                <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Danger Zone</h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="font-medium text-red-900 mb-2">Delete Store</p>
                    <p className="text-sm text-red-700 mb-4">Once you delete your store, there is no going back. Please be certain.</p>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium">
                    Delete Store
                    </button>
                </div>
                </div>
            </div>
            )}
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-xl">
            Save All Changes
            </button>
        </div>
        </div>
    );
    };


    // Continue with other content sections...
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 lg:hidden z-30"></div>
      )}
      <div className="lg:ml-64">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {activeTab === 'dashboard' && 'Dashboard Overview'}
                  {activeTab === 'users' && 'User Management'}
                  {activeTab === 'products' && 'Product Management'}
                  {activeTab === 'orders' && 'Order Management'}
                  {activeTab === 'transactions' && 'Payment Transactions'}
                  {activeTab === 'settings' && 'Settings'}
                </h1>
                <p className="text-sm text-gray-500">Welcome back, Admin!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">A</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="p-6">
          {activeTab === 'dashboard' && <DashboardContent />}
          {activeTab === 'users' && <UsersContent />}
          {activeTab === 'products' && <ProductsContent />}
          {activeTab === 'orders' && <OrdersContent />}
          {activeTab === 'transactions' && <TransactionsContent />}
          {activeTab === 'settings' && <SettingsContent />}
          {/* Add other tab contents here */}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;