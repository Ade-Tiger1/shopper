import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CiShoppingCart } from 'react-icons/ci';
import { RiRefund2Line } from "react-icons/ri";
import { MdOutlineLocalShipping, MdOutlineShield } from "react-icons/md";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ShopperContext } from "../../context/Context";

const ProdDetail = () => {
  // Main selected image
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Selected size
  const allSizes = ["S", "M", "L", "XL", "XXL"];
  const [selectedSize, setSelectedSize] = useState("M");
  const { id } = useParams();
  const { products, addToCart } = useContext(ShopperContext);
  let BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const product = products?.find((prod) => prod._id === id);

  if (!product) return <div className="p-5">Loading...</div>;

  // Format images
  const images = product.image.map(
    (img) => `${BACKEND_URL}/uploads/images/${img}`
  );

  

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <>
      {/*  IMAGE GALLERY */}
      <div className="mx-5 mt-5 p-5 bg-gray-50 rounded-lg">

        {/* Main Image */}
        <div className="relative flex justify-center mb-4">
          <img
            src={images[currentIndex]}
            alt="product main"
            className="w-full max-w-md h-80 object-cover rounded-xl shadow"
          />

          {/* Prev Button */}
          <button
            onClick={prevImage}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200"
          >
            <ChevronLeft />
          </button>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Thumbnail images */}
        <div className="flex gap-3 justify-center overflow-x-auto scrollbar-hide pb-2">
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 
                ${currentIndex === index ? "border-blue-500" : "border-transparent"}`}
            >
              <img
                src={img}
                alt={`thumb-${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/*  PRODUCT DETAILS */}
      <div className="bg-gray-50 mx-5 mt-8 py-8 px-5 rounded-lg">
        <h2 className="text-3xl font-bold">{product.title}</h2>

        <p className="mt-2">
          <b className="text-blue-500 text-2xl">₦{product.price}</b>
        </p>

        <p className="font-bold text-gray-400 mt-1">
          In Stock ({product.inStock})
        </p>

        {/* Size selection */}
        <p className="font-bold mt-4">Size</p>
        <div className="flex gap-3 flex-wrap">
            <span className="border-2 px-5 py-2 rounded-md cursor-pointer border-blue-500 bg-blue-100">
              {product.sizes}
            </span>
        </div>

        <p className="font-bold mt-4">Category</p>
        <div className="flex gap-3 flex-wrap mt-1">
            <span className=" px-5 py-2 rounded-md cursor-pointer bg-blue-100">
              {product.category}
            </span>
        </div>

        

        <hr className="border-t-2 border-blue-500 my-6" />

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center gap-2">
            <MdOutlineLocalShipping className="text-blue-500" size={30} />
            <p className="font-bold text-center">Free Shipping</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MdOutlineShield className="text-blue-500" size={30} />
            <p className="font-bold text-center">2 Years Warranty</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RiRefund2Line className="text-blue-500" size={30} />
            <p className="font-bold text-center">30-Day Returns</p>
          </div>
        </div>
      </div>

      {/*  DESCRIPTION */}
      <div className="bg-gray-50 mx-5 mt-8 py-8 px-5 rounded-lg">
        <h3 className="font-semibold text-lg mb-3">Description</h3>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>

      {/* Hide Scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
};

export default ProdDetail;
