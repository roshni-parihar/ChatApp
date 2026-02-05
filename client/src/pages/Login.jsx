import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";
import { useNavigate } from "react-router-dom";
import { useGoogleAuth } from "../config/GoogleAuth";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const { isLoading, error, isInitialized, signInWithGoogle } = useGoogleAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [Loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({ email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);
      toast.success(res.data.message);
      sessionStorage.setItem("AppUser", JSON.stringify(res.data.data));
      handleClearForm();
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (userData) => {
    console.log("Google Login Data", userData);
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed:", error);
    toast.error("Google login failed. Please try again.");
  };

  const GoogleLogin = () => {
    signInWithGoogle(handleGoogleSuccess, handleGoogleFailure);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 px-4">
      <div className="w-full max-w-md">
        <div className="card shadow-2xl bg-base-100">
          <div className="card-body space-y-6">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-primary">Welcome Back</h2>
              <p className="text-sm text-base-content/70 mt-1">
                Sign in to continue 🚀
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              onReset={handleClearForm}
              className="space-y-4"
            >
              <div className="form-control">
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={Loading}
                  required
                  className="input input-bordered w-full focus:input-primary"
                />
              </div>

              <div className="form-control">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={Loading}
                  required
                  className="input input-bordered w-full focus:input-primary"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="reset"
                  disabled={Loading}
                  className="btn btn-outline btn-secondary flex-1"
                >
                  Clear
                </button>

                <button
                  type="submit"
                  disabled={Loading}
                  className="btn btn-primary flex-1"
                >
                  {Loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="divider text-sm text-base-content/60">
              OR CONTINUE WITH
            </div>

            {/* Google Login */}
            {error ? (
              <button
                className="btn btn-outline btn-error w-full flex items-center gap-2"
                disabled
              >
                <FaGoogle className="text-lg" />
                {error}
              </button>
            ) : (
              <button
                onClick={GoogleLogin}
                className="btn btn-outline w-full flex items-center gap-2"
                disabled={!isInitialized || isLoading}
              >
                <FaGoogle className="text-lg" />
                {isLoading
                  ? "Loading..."
                  : isInitialized
                  ? "Continue with Google"
                  : "Google Auth Error"}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-base-content/60 mt-6">
          Your data is safe with us 🔐
        </p>
      </div>
    </div>
  );
};

export default Login;
