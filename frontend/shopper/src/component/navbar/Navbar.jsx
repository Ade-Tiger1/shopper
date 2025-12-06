import { useState, useContext } from "react";
import { Menu, X, ShoppingCart, ClipboardList } from "lucide-react"; // Added ClipboardList for Orders icon
import { ShopperContext } from "../../context/Context";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, handleLogout, cartCount } = useContext(ShopperContext);

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-white flex items-center justify-between px-6 py-4 relative z-50">
        <h1 className="text-2xl text-blue-500 font-bold"><a href="/">Shopper.</a></h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          <li><a href="/" className="hover:text-gray-300">Home</a></li>
          <li><a href="/about" className="hover:text-gray-300">About</a></li>
          <li><a href="/contact" className="hover:text-gray-300">Contact</a></li> 
        </ul>

        {/* Desktop Right Menu */}
        <ul className="hidden md:flex gap-6 items-center">
          {isAuthenticated ? (
            <>
              {/* Cart Icon */}
              <li className="relative">
                <a href="/cart" className=" text-blue-700 flex items-center" title="Cart">
                  <ShoppingCart size={24} title="Cart"/>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </a>
              </li>

              {/* Orders Icon */}
              <li className="relative">
                <a href="/order" className=" text-blue-700 flex items-center" title="Orders">
                  <ClipboardList size={24} title="Orders"/>
                </a>
              </li>

              <li>
                <button className=" cursor-pointer" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li><a href="/login" className="hover:bg-purple-700 bg-blue-700 text-white py-2 px-5 rounded">Login</a></li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Sidebar (mobile only) */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-[60]`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-blue-500">Shopper.</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="flex flex-col gap-4 p-4">
          <li><a href="/" className="hover:bg-gray-100 p-2 rounded text-gray-900">Home</a></li>
          <li><a href="/about" className="hover:bg-gray-100 p-2 rounded text-gray-900">About</a></li>
          <li><a href="/contact" className="hover:bg-gray-100 p-2 rounded text-gray-900">Contact</a></li>
          {isAuthenticated && (
            <li>
              <a href="/order" className="hover:bg-gray-100 p-2 rounded text-gray-900">Orders</a>
            </li>
          )}
          {isAuthenticated ? (
            <li>
              <button className="cursor-pointer ps-2" onClick={()=>{
                setSidebarOpen(false);
                handleLogout()
                }}>Logout</button>
            </li>
          ) : (
            <li><a href="/login" className="bg-blue-700 text-white py-2 px-5 rounded text-center hover:bg-blue-800">Login</a></li>
          )}
        </ul>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-50"
        ></div>
      )}

      {/* Mobile Cart Button */}
      {isAuthenticated && (
        <a
          href="/cart"
          className="md:hidden fixed top-16 right-4 z-50 bg-blue-500 w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600"
        >
          <ShoppingCart size={22} className="text-white" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </a>
      )}
    </>
  );
}
