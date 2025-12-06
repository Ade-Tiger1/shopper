import {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import {CiFilter} from 'react-icons/ci'
import { ShopperContext } from '../../context/Context'

const Products = () => {
  const {products, currentPage, productsPerPage, currentProducts, setCurrentPage, setProducts, handleCategoryChange, category} = useContext(ShopperContext);
  const totalPages = Math.ceil(products.length / productsPerPage);
  
  return (
    <div className='Home'>
      <div className="bg-gradient-to-r from-blue-500 to-purple-800 py-20 px-5 text-white">
        <h2 className='text-4xl font-bold'> Summer Sale 2025</h2>
        <p className='leading-15'>Up to 50% off on selected items</p>
        <button type='button' className='bg-white  text-blue-500 px-3 py-2 rounded hover:bg-black hover:text-white'><a href="#shop">Shop Now</a></button>
      </div>

    <div className="flex ms-3 mt-8 space-x-5">
      <button type='button' className={category == "all" ? 'bg-blue-500 active text-white px-6 py-2 rounded-3xl': 'bg-slate-50 hover:bg-gray-200 text-black px-6 py-2 rounded-3xl'} onClick={()=> handleCategoryChange("all")}>All</button>
      <button type='button' className={category == "men" ? 'bg-blue-500 active text-white px-6 py-2 rounded-3xl': 'bg-slate-50 hover:bg-gray-200 text-black px-6 py-2 rounded-3xl'} onClick={()=> handleCategoryChange("men")}>Men</button>
      <button type='button' className={category == "women" ? 'bg-blue-500 active text-white px-6 py-2 rounded-3xl': 'bg-slate-50 hover:bg-gray-200 text-black px-6 py-2 rounded-3xl'} onClick={()=> handleCategoryChange("women")}>Women</button>
      <button type='button' className={category == "kids" ? 'bg-blue-500 active text-white px-6 py-2 rounded-3xl': 'bg-slate-50 hover:bg-gray-200 text-black px-6 py-2 rounded-3xl'} onClick={()=> handleCategoryChange("kids")}>Kids</button>
    </div>

    <div className="flex items-center  border-1 w-24 h-10 rounded ml-3 mt-5">
      <CiFilter size={25} className='ml-3'/>
      <div className='pr-2 font-semibold'>Filters</div>
    </div>

    <div id='shop' className="container px-5 mt-5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {!currentProducts.length && <p className='text-center col-span-4 font-semibold text-2xl'>No products found in this category.</p>}
      {(currentProducts ?? []).map((product) => (
        <div key={product._id} className="border shadow-lg rounded-lg overflow-hidden">
          <Link to={`${product._id}`}>
            <div className="card-image">
              <img className='w-full h-70 transform transition duration-500 hover:scale-105' src={`http://localhost:5000/uploads/images/${product.image[0]}`} alt="" />
            </div>
            <div className="card-body p-5">
              <h3 className='mt-3'>{product.title}</h3>
              <p className='mt-3 text-gray-500'>{product.description}</p>
              <div className="flex justify-between items-center mt-3">
                <p className='font-semibold text-blue-500'>{product.price}</p>
                <button type='button' className='bg-blue-500 px-5 py-3 rounded hover:bg-black text-white'>Add To Cart</button>
              </div>
            </div>
          </Link>
        </div>
      ))}
      

      {/* <div className="border shadow-lg rounded-lg overflow-hidden">
        <Link to="/product/2">
          <div className="card-image">
            <img className='w-100 h-70 transform transition duration-500 hover:scale-105' src="/images/LinkedIn_Profile_Photo_Enhanced.png" alt="" />
          </div>
          <div className="card-body p-5">
            <h3 className='mt-3'>Product name</h3>
            <p className='mt-3 text-gray-500'>Short product description</p>
            <div className="flex justify-between items-center mt-3">
              <p className='font-semibold text-blue-500'>$79.44</p>
              <button type='button' className='bg-blue-500 px-5 py-3 rounded hover:bg-black text-white'>Add To Cart</button>
            </div>
          </div>
        </Link>
      </div> */}

      {/* <div className="border shadow-lg rounded-lg overflow-hidden">
        <Link to="/product/3">
          <div className="card-image">
            <img className='w-100 h-70 transform transition duration-500 hover:scale-105' src="/images/LinkedIn_Profile_Photo_Enhanced.png" alt="" />
          </div>
          <div className="card-body p-5">
            <h3 className='mt-3'>Product name</h3>
            <p className='mt-3 text-gray-500'>Short product description</p>
            <div className="flex justify-between items-center mt-3">
              <p className='font-semibold text-blue-500'>$79.44</p>
              <button type='button' className='bg-blue-500 px-5 py-3 rounded hover:bg-black text-white'>Add To Cart</button>
            </div>
          </div>
        </Link>
      </div> */}

      {/* <div className="border shadow-lg rounded-lg overflow-hidden">
        <Link to="/product/4">
          <div className="card-image">
            <img className='w-100 h-70 transform transition duration-500 hover:scale-105' src="/images/LinkedIn_Profile_Photo_Enhanced.png" alt="" />
          </div>
          <div className="card-body p-5">
            <h3 className='mt-3'>Product name</h3>
            <p className='mt-3 text-gray-500'>Short product description</p>
            <div className="flex justify-between items-center mt-3">
              <p className='font-semibold text-blue-500'>$79.44</p>
              <button type='button' className='bg-blue-500 px-5 py-3 rounded hover:bg-black text-white'>Add To Cart</button>
            </div>
          </div>
        </Link>
      </div> */}
    </div> 

    <div className="flex justify-center items-center mt-10 mb-10">
      <button className='border border-blue-500 px-3 py-2 mr-2 rounded' disabled={currentPage == 1} onClick={()=> setCurrentPage(prev => prev-1)}>Previous</button>
      {[...Array(totalPages)].map((_, index) => (
        <span 
          key={index}
          className={currentPage === index + 1 ? 'bg-blue-500 text-white px-3 py-2 rounded border mr-2' : 'px-3 py-2 rounded border mr-2 cursor-pointer'}
          onClick={() => setCurrentPage(index + 1)}
        >{index + 1}</span>
      ))}
      {/* <span className='bg-blue-500 text-white px-3 py-2 rounded border mr-2'>1</span>
      <span className='px-3 py-2 rounded border mr-2'>2</span>
      <span className='px-3 py-2 rounded border mr-2'>3</span>
      <span className='px-3 py-2 rounded border mr-2'>4</span> */}
      <button className='border border-blue-500 px-3 py-2 mr-2 rounded' disabled={currentPage == totalPages} onClick={()=> setCurrentPage(prev=> prev + 1)}>Next</button>
    </div>
  </div>
  )
}

export default Products
