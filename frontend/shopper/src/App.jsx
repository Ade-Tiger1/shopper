import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Navbar from './component/navbar/Navbar'
import Footer from './component/footer/Footer'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import ProductDetail from './pages/productDetail/ProductDetail'
import Cart from './pages/cart/Cart'
import Checkout from './pages/checkout/Checkout'
import OrderPage from './pages/order/OrderPage'
import Products from './pages/products/Products'
import { ContextProvider } from './context/Context'
import AdminDashboard from './pages/adminDashboard/AdminDashboard'
import MainLayout from './pages/mainLayout/MainLayout'
import AdminLayout from './pages/adminLayout/AdminLayout'
import Payment from './pages/payment/Payment'
import PaymentFailed from './pages/payment/PaymentFailed'
import UserEdit from './pages/adminDashboard/UserEdit'
import ProdDetail from './pages/adminDashboard/ProdDetail'
import Edit from './pages/adminDashboard/Edit'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import About from './pages/about/About'
import Contact from './pages/contact/Contact'

function App() {
  
  return (
    <div className='App'>
      <Router>
        <ContextProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/products' element={<Products />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Signup />} />
              <Route path='/products/:id' element={<ProductDetail />} />
              <Route path='/cart' element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path='/order' element={<OrderPage />} />
              <Route path='/payment-success' element={<Payment />} /> 
              <Route path='/payment-failed' element={<PaymentFailed />} />
            </Route>

            <Route element={<AdminLayout />}>
              <Route path='/admin' element={<AdminDashboard />} />
              <Route path='/admin/users/edit/:id' element={<UserEdit />} />
              <Route path='/admin/products/:id' element={<ProdDetail />} />
              <Route path='/admin/products/edit/:id' element={<Edit />} />
            </Route>
          </Routes>
        </ContextProvider>
        <ToastContainer position='top-center'/>
      </Router>
    </div>
    
  )
}

export default App


//**********w-1 = 0.25rem & 4px, w-4= 1rem & 16px,  1rem = 16px********************/
  //*****************percentage with works with flex, w-1/4 = width: 25%, w-1/5 = width: 20%***********************/
  //*****************leading-4 = line-height: 16px**********************/
  //*****************min-h-min takes the minimum height of the content***************/
  //*****************justify-start,center,end, justify-between, evenly, around************************/
  //*****************align-items is written as items-start,center, end, baseline, stretch***************************/
  //*****************column-12 works like col in bootstrap***********************/
  //*****************float-left allows an image or section to float-left***************************/
  //*****************z-0, z-10, z-20 etc stacks an item ontop each other***************************/
  //*****************object-left-top, object-right-top, object-center etc to position an image how you want to view it*************************/
  //*****************border-l, border-r***************************/
  //*****************borderstyles, border-dotted, solid, dashed, double, none**************************/
  //*****************divide-y, divide-x, divide-red-500 to divide a border or multiple section*********************/
  //*****************outline, outline-4, outline-none, outline-blue-500, outline-offset-4****************************/
  //*****************ring-offset-2, ring-4, rings create box shadow around our element**********************************/
  //*****************shadow-md, shadow-2xl, shadow-red-500/50 is opacity of 0.5, shadow-inner, shadow-none etc box-shadow and effects**********************************/
  //*****************opacity-30 0 - 100**************************/
  //*****************background blend mode and mix blend mode*****************************/
  //*****************filter: saturate, hue-rotate, sepia,backdrop drop-shadow, grayscale, contrast, brightness, blur-sm, lg, 2xl, blur-none etc*****************************/
  //*****************brightness-120, 0-200 *****************************/
  //*****************contrast-50, 0-200*****************************/
  //*****************grayscale alone to add, grayscale-0 to remove*****************************/
  //*****************hue-rotate-90 changes the colour, invert also*****************************/
  //*****************Animation(animate-spin, animate-pulse, animate-ping, animate-bounce) & Transition(delay, duration etc)*****************************/
  //*****************Transform(translate-y-0, skew-y-0, translate-y-1/5, scale-150, rotate-180, origin-bottom-right= where you want your image to rotate from)*****************************/