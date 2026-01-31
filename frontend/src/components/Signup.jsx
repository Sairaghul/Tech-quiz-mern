import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupStyles } from "../assets/dummyStyles";
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff } from "lucide-react";

// Email validation
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Signup = ({ onSignupSuccess = null }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  // VALIDATION
  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email) e.email = "Email is required";
    else if (!isValidEmail(email)) e.email = "Invalid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6)
      e.password = "Password must be at least 6 characters";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError("");

    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setLoading(true);

    // Demo success (backend later)
    setTimeout(() => {
      setLoading(false);
      onSignupSuccess?.();
      navigate("/login");
    }, 1200);
  };

  return (
    <div className={SignupStyles.pageContainer}>
      {/* BACK BUTTON */}
      <Link to="/login" className={SignupStyles.backButton}>
        <ArrowLeft className={SignupStyles.backButtonIcon} />
        <span className={SignupStyles.backButtonText}>Back</span>
      </Link>

      {/* FORM */}
      <div className={SignupStyles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={SignupStyles.animatedBorder}>
            <div className={SignupStyles.formContent}>
              <h2 className={SignupStyles.heading}>
                Create Account
              </h2>

              {/* NAME */}
              <label className={SignupStyles.label}>
                <span className={SignupStyles.labelText}>Name</span>
                <input
                  className={SignupStyles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <p className={SignupStyles.errorText}>{errors.name}</p>
                )}
              </label>

              {/* EMAIL */}
              <label className={SignupStyles.label}>
                <span className={SignupStyles.labelText}>Email</span>
                <input
                  className={SignupStyles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className={SignupStyles.errorText}>{errors.email}</p>
                )}
              </label>

              {/* PASSWORD */}
              <label className={SignupStyles.label}>
                <span className={SignupStyles.labelText}>Password</span>
                <div className={SignupStyles.inputContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={SignupStyles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className={SignupStyles.passwordToggle}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.password && (
                  <p className={SignupStyles.errorText}>
                    {errors.password}
                  </p>
                )}
              </label>

              {submitError && (
                <p className={SignupStyles.submitError}>{submitError}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={SignupStyles.submitButton}
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
