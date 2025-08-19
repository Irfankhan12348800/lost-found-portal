import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; 
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Signup/Login pages par Navbar hide hoga
  if (location.pathname === "/signup" || location.pathname === "/login") {
    return null;
  }

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="font-bold text-xl">
          <Link to="/" className="hover:underline">
            Lost & Found
          </Link>
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {!user ? (
            <>
              <Link
                to="/signup"
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/report" className="hover:underline">Report</Link>
              <Link to="/items" className="hover:underline">Items</Link>
            <Link to="/login"><button
                onClick={logout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout 
              </button></Link>  
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          {!user ? (
            <>
              <Link
                to="/signup"
                className="block bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="block bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="block hover:underline" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/report" className="block hover:underline" onClick={() => setIsOpen(false)}>Report</Link>
              <Link to="/items" className="block hover:underline" onClick={() => setIsOpen(false)}>Items</Link>
              <button
                onClick={() => { logout(); setIsOpen(false); }}
                className="block bg-red-500 px-3 py-1 rounded hover:bg-red-600 w-full text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
