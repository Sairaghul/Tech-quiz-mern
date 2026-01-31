import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

// NOTE: No external CSS needed. All styles are handled by Tailwind here.

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Login = ({ onLoginSuccess = null }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // VALIDATION
  const validate = () => {
    const e = {};
    if (!email) e.email = "Email is required";
    else if (!isValidEmail(email)) e.email = "Invalid email address";
    if (!password) e.password = "Password is required";
    return e;
  };

  // SUBMIT LOGIC (Offline Simulation)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSuccessMsg("");

    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setLoading(true);

    // --- SIMULATION START ---
    setTimeout(() => {
      // 1. MOCK USER DATA
      const mockUser = {
        _id: "dummy_id_123",
        name: email.split("@")[0],
        email: email,
        token: "fake-jwt-token-for-testing",
      };

      setSuccessMsg("Access Granted");

      // Save fake auth data
      localStorage.setItem("authToken", mockUser.token);
      localStorage.setItem("currentUser", JSON.stringify(mockUser));

      // Notify app
      window.dispatchEvent(
        new CustomEvent("authChanged", {
          detail: { user: mockUser },
        })
      );

      if (onLoginSuccess) onLoginSuccess(mockUser);

      setLoading(false);

      // Redirect
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    }, 1500);
    // --- SIMULATION END ---
  };

  return (
    // 1. MAIN WRAPPER: Black Background
    <div className="min-h-screen w-full bg-black flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* Background Glow Effect */}
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-yellow-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Back Button */}
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-yellow-500 transition-colors">
        <ArrowLeft size={20} />
        <span className="text-sm font-medium tracking-widest uppercase">Back</span>
      </Link>

      {/* 2. CARD CONTAINER: Dark with Gold Borders */}
      <div className="relative w-full max-w-md p-1">
        {/* Animated Gradient Border (simulated via background) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-600/30 to-transparent opacity-50 rounded-2xl pointer-events-none"></div>
        
        <div className="bg-[#0a0a0a] border border-gray-900 rounded-2xl p-10 shadow-2xl relative z-10">
          
          {/* HEADER */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-200 tracking-[0.2em] uppercase mb-2">
              Login
            </h2>
            <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-yellow-600 to-transparent"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            
            {/* EMAIL INPUT */}
            <div className="group">
              <div className="relative flex items-center">
                <Mail className="absolute left-4 text-gray-500 group-focus-within:text-yellow-500 transition-colors" size={18} />
                <input
                  type="email"
                  value={email}
                  placeholder="Email Address"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((s) => ({ ...s, email: undefined }));
                  }}
                  className="w-full bg-[#111] text-gray-300 placeholder-gray-600 pl-12 pr-4 py-4 rounded-xl border border-gray-800 focus:border-yellow-600/50 focus:ring-1 focus:ring-yellow-600/20 outline-none transition-all text-sm tracking-wide"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-2 ml-2">{errors.email}</p>}
            </div>

            {/* PASSWORD INPUT */}
            <div className="group">
              <div className="relative flex items-center">
                <Lock className="absolute left-4 text-gray-500 group-focus-within:text-yellow-500 transition-colors" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((s) => ({ ...s, password: undefined }));
                  }}
                  className="w-full bg-[#111] text-gray-300 placeholder-gray-600 pl-12 pr-12 py-4 rounded-xl border border-gray-800 focus:border-yellow-600/50 focus:ring-1 focus:ring-yellow-600/20 outline-none transition-all text-sm tracking-wide"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-gray-600 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-2 ml-2">{errors.password}</p>}
            </div>

            {/* ERROR / SUCCESS MESSAGES */}
            {submitError && (
              <div className="p-3 rounded-lg bg-red-900/20 border border-red-900/50 text-red-400 text-xs text-center">
                {submitError}
              </div>
            )}
            {successMsg && (
              <div className="p-3 rounded-lg bg-green-900/20 border border-green-900/50 text-green-400 text-xs text-center font-bold tracking-wider uppercase animate-pulse">
                {successMsg}
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-4 bg-gradient-to-r from-[#222] to-[#111] hover:from-[#333] hover:to-[#222] text-gray-300 font-bold tracking-widest uppercase rounded-xl border border-gray-800 hover:border-yellow-600/50 shadow-lg transition-all duration-300 active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></span>
                  Processing
                </span>
              ) : (
                "Login"
              )}
            </button>

            {/* FOOTER LINKS */}
            <div className="text-center pt-4">
              <p className="text-gray-600 text-xs">
                Don't have an account?{" "}
                <Link to="/signup" className="text-yellow-600 hover:text-yellow-500 font-bold transition-colors">
                  Create Account
                </Link>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;