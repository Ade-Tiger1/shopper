import React from 'react'
import Navbar from '../../component/navbar/Navbar'
import Footer from '../../component/footer/Footer'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
        <Navbar />
            <Outlet />
        <Footer />

    </div>
  )
}

export default MainLayout
