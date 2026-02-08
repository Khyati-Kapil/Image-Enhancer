import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
         
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white flex items-center justify-center border border-gray-700">
              <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Pixora
            </span>
          </Link>

         
         
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Home</Link>
            <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Enhance</Link>
            <Link to="/compress" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Compress</Link>
            <Link to="/gallery" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Gallery</Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 bg-gray-900 border border-gray-700 px-4 py-2 hover:border-gray-500 transition-colors"
                >
                  <div className="w-8 h-8 bg-white flex items-center justify-center">
                    <span className="text-black text-sm font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-white hidden sm:block text-sm">{user.name}</span>
                  <svg className={`w-4 h-4 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-400 hover:bg-gray-900 hover:text-white transition-colors text-sm"
                      onClick={() => setShowDropdown(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/gallery"
                      className="block px-4 py-2 text-gray-400 hover:bg-gray-900 hover:text-white transition-colors text-sm"
                      onClick={() => setShowDropdown(false)}
                    >
                      Gallery
                    </Link>
                    <hr className="border-gray-800 my-1" />
                    <button
                      onClick={() => {
                        logout();
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-400 hover:bg-gray-900 hover:text-white transition-colors text-sm"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-black px-6 py-2 hover:bg-gray-200 transition-colors text-sm font-medium"
                  style={{ borderRadius: 0 }}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

