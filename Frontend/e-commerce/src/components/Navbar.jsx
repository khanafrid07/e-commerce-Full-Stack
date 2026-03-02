import { Search, ShoppingCart, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

export default function Navbar({ wishCount = 0 }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestion, setSuggestion] = useState([])
  const [showSuggestion, setShowSuggestion] = useState(false)
  const { user } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => state.cart?.items?.length || 0);
  const isLoggedIn = !!user;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchRef = useRef(null)

  function onLogout(e) {
    e.preventDefault();
    dispatch(logout())

  }

  useEffect(()=>{
    if(!searchQuery){
      setSuggestion([]);
      return
    }

    const timeout = setTimeout(async()=>{
      try{
        const res = await fetch(`http://localhost:8080/api/products?search=${encodeURIComponent(searchQuery)}`);

        const data = await res.json()
       setSuggestion(data.allProducts)

      }catch(err){
        console.log(err, "err fetching producr")
      }

      
    }, 300)

    return ()=>clearTimeout(timeout)
  }, [searchQuery])

  useEffect(()=>{
    const handler = (e)=>{
      if(searchRef.current && !searchRef.current.contains(e.target)){
        setShowSuggestion(false)
      }else if(searchRef.current.contains(e.target)){
        setShowSuggestion(true)
      }
    }
    document.addEventListener("mousedown", handler)

    return ()=>document.removeEventListener("mousedown", handler)

    

  }, [])

  function handleProductClick(productId){
    navigate(`/products/${productId}`)
    setShowSuggestion(false)
  

  }

  function handleSearch(e) {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }


  return (
    <div className="navbar bg-white text-gray-800 shadow-md px-6 py-3 gap-4 ">
      <Menu className="md:hidden" />

      {/* Brand */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-primary">
          ShopSmart
        </Link>
      </div>

      <form onSubmit={handleSearch}>

        <div className="hidden relative md:flex justify-center items-center bg-gray-100 border rounded-lg px-3 py-1 input">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            value={searchQuery}
            placeholder="Search products..."
            className="bg-transparent outline-none text-gray-700 w-64"
            onChange={(e) => {setSearchQuery(e.target.value);
              setShowSuggestion(true)

            }}
          />
         {showSuggestion && suggestion.length > 0 && (
          <div ref={searchRef} className="absolute top-12 border shadow-md bg-base-100 rounded-lg w-full z-50">
            {suggestion.map((product)=>(
              <div onClick={()=>handleProductClick(product._id)} className="border-b hover:bg-gray-400 cursor-pointer px-4 py-2 text-left truncate text-left">{product.title}</div>
            ))}
          </div>
         )}
        </div>
      </form>

      {/* Right section */}
      <div className="flex items-center gap-8">
        <Link to="/wishlist" className="relative font-semibold text-lg">
          {wishCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1.5">
              {wishCount}
            </span>
          )}
          My Wishlist
        </Link>

        <Link to="/cart" className="relative">
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full px-1.5">
              {cartCount}
            </span>
          )}
          <ShoppingCart className="w-8 h-8" />
        </Link>

        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="avatar placeholder">
              <div className="bg-neutral text-neutral-content w-12 rounded-full">
                <span className="text-2xl">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu mt-2 rounded-box z-[1] w-52 p-2 shadow bg-background text-text"
            >
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/orders">My Orders</Link></li>
              <li><button onClick={onLogout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-secondary text-white rounded-lg hover:scale-105 transition-transform"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
