import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Award, LogOut, LogIn, Menu, X, CheckCircle } from "lucide-react";

const Navbar = ({ logoSrc }) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("authToken"));
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => setLoggedIn(!!e?.detail?.user);
    window.addEventListener("authChanged", handler);
    return () => window.removeEventListener("authChanged", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.dispatchEvent(new CustomEvent("authChanged", { detail: { user: null } }));
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    // 1. MAIN NAVBAR: Yellow Background
    <nav className="w-full h-20 bg-yellow-400 border-b-4 border-yellow-500 shadow-lg relative z-50 font-sans">
      
      {/* Container */}
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        
        {/* LEFT — LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-black rounded-xl border-2 border-black group-hover:scale-105 transition-transform shadow-xl">
            {/* If no logo image, show icon */}
            {logoSrc ? (
              <img
                src={logoSrc}
                alt="Logo"
                className="w-8 h-8 object-cover rounded-lg"
              />
            ) : (
              <CheckCircle className="text-yellow-400 w-8 h-8" />
            )}
          </div>
          <span className="hidden md:block font-black text-xl text-black tracking-tighter uppercase">
            Quizora App
          </span>
        </Link>

        {/* CENTER — TITLE BUBBLE */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
          <div className="bg-black px-8 py-2 rounded-full shadow-lg border border-black/10 transform hover:-translate-y-1 transition-transform cursor-default">
            <h1 className="text-sm font-black text-yellow-400 tracking-[0.2em] uppercase">
              Quizora Platform
            </h1>
          </div>
        </div>

        {/* RIGHT — DESKTOP BUTTONS */}
        <div className="hidden md:flex items-center gap-4">
          <NavLink 
            to="/result" 
            className={({ isActive }) => `
              flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md
              ${isActive 
                ? "bg-black text-yellow-400 border-2 border-black" 
                : "bg-white text-black border-2 border-black hover:bg-black hover:text-yellow-400"
              }
            `}
          >
            <Award size={16} />
            Results
          </NavLink>

          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-red-600 text-white border-2 border-red-800 hover:bg-red-700 shadow-md transition-all"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <NavLink 
              to="/login"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-black text-white border-2 border-black hover:bg-gray-900 shadow-md transition-all"
            >
              <LogIn size={16} />
              Login
            </NavLink>
          )}
        </div>

        {/* RIGHT — MOBILE MENU TOGGLE */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 bg-black text-yellow-400 rounded-lg shadow-md active:scale-95 transition-transform"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-black border-b-4 border-yellow-500 shadow-2xl p-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <NavLink
            to="/result"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-4 p-4 rounded-xl bg-[#111] text-yellow-400 font-bold uppercase tracking-widest border border-[#222] hover:bg-[#222]"
          >
            <Award size={20} />
            My Results
          </NavLink>

          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 p-4 rounded-xl bg-red-900/20 text-red-500 font-bold uppercase tracking-widest border border-red-900/30 hover:bg-red-900/30"
            >
              <LogOut size={20} />
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-4 p-4 rounded-xl bg-yellow-600 text-black font-bold uppercase tracking-widest hover:bg-yellow-500"
            >
              <LogIn size={20} />
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;