import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";



export const ShopperContext = createContext()

export const ContextProvider = ({children})=>{
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true")
    const [loginInput, setLoginInput] = useState({email: "", password: ""})
    const [shippingMethod, setShippingMethod] = useState('standard');
    const [category, setCategory] = useState("all")
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;  
    const navigate = useNavigate()

    
   /*****************PRODUCTS*********************/
   useEffect(()=>{
    const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    setIsLoading(true)
    const fetchProducts = async ()=>{
      let url =   `${BACKEND_URL}/api/products`;
      if(category){
        if(category == "all"){
          url = `${BACKEND_URL}/api/products`;
        } else{
           url = `${BACKEND_URL}/api/products?category=${encodeURIComponent(category)}`;
        }
      }
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if(!response.ok) toast.error("Invalid Fetch For Products")
      const data = await response.json()
      // console.log(data)
      setProducts(data.products)
      setIsLoading(false)
    }

    fetchProducts()
  }, [category])

    /***********Login***************/
    const loginChange = (e) => {
        e.preventDefault();
        setLoginInput({
            ...loginInput,
            [e.target.name] : e.target.value
        })
    }

    const loginSubmit = async(e) => {
        const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        e.preventDefault()
        try{
            const res = await fetch(`${BACKEND_URL}/auth/login/`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginInput)
            })
            
            if(!res.ok){
                setIsAuthenticated(false);
                localStorage.setItem("isAuthenticated", false);
                toast.error(data.msg)
                return
            }
            const data = await res.json();
            setIsAuthenticated(true)
            localStorage.setItem("isAuthenticated", true);
            toast.success(data.msg)
            setTimeout(()=>{
            navigate("/products")
            }, 2000)
        }catch(err){
            console.log(err.message)
            toast.error("Unable to connect to server.");
            setIsAuthenticated(false);
            localStorage.setItem("isAuthenticated", false)
        }
        
        
    }

    /******************LOGOUT******************/
    const handleLogout = async () => {
        const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        try {
            const res = await fetch(`${BACKEND_URL}/auth/logout`, {
                method: "POST",
                credentials: "include", // important if your backend uses httpOnly cookies
            });

            if (res.ok) {
                const data = await res.json();
                // console.log(data); // update state
                toast.success(data.message);
                setIsAuthenticated(false);
                localStorage.setItem("isAuthenticated", false); // persist
                navigate("/login"); // redirect
            } else {
                toast.error("Logout failed");
            }
        }catch (err) {
            console.log(err);
            toast.error("Unable to connect to server.");
        }
    };

    // Add product to cart
    const addToCart = async ({ productId, quantity = 1, size }) => {
   const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    try {
      const response = await fetch(`${BACKEND_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId, quantity, size }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error("Add to cart failed:", data.msg || data);
        return;
      }
      setIsLoading(false)
      toast.success("Item added to cart:", data.msg);
      getCart();
      navigate("/cart");
    }catch(error) {
        console.error("Error adding to cart:", error);
    }
  };

  // Fetch cart items from backend
  const getCart = async () => {
    const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    try {
      const response = await fetch(`${BACKEND_URL}/api/cart`, {
        method: "GET",
        credentials: "include", // send cookies
      });
      if (!response.ok) throw new Error("Failed to fetch cart");

      const data = await response.json();
      // backend returns items in data.items
      setCart(data.items || []);
      setIsLoading(false)
    } catch (err) {
      console.error("Get cart error:", err.message);
    }
  };

  const removeCart = async(id) => {
    const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const res = await fetch(`${BACKEND_URL}/api/cart/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
    if(!res.ok) toast.error("Failed to delete")
    toast.success("Deleted Sucessfully")
    getCart();
  }

  const updateQuantity = (productId, size, newQty) => {
    if (newQty == 0) {
      removeCart(productId);
      return;
    }

    setCart(prev =>
      prev.map(item =>
        item.product === productId && item.size === size
          ? { ...item, quantity: newQty, subtotal: newQty * item.price }
          : item
      )
    );
  };


  // Derived cart count
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  useEffect(()=>{
    getCart(); 
  }, []);


  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    // console.log("Category changed to:", newCategory);
  }

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = products.slice(firstIndex, lastIndex);

    return(
        <ShopperContext.Provider value={{
            isAuthenticated, loginInput, loginChange, loginSubmit, handleLogout, products,
            setProducts, cart, cartTotal, addToCart, cartCount, getCart, removeCart, updateQuantity,
            isLoading, shippingMethod, setShippingMethod, handleCategoryChange, category,
            currentPage, setCurrentPage, productsPerPage, currentProducts
        }}>
            {children}
        </ShopperContext.Provider>
    )
}

