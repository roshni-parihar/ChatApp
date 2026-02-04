import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Login = () => {
  const { setUser, setIsLogin } = useAuth();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", formData);
      toast.success(res.data.message);
      setUser(res.data.data);
      setIsLogin(true);
      sessionStorage.setItem("CravingUser", JSON.stringify(res.data.data));
      handleClearForm();

     
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Header */}
            <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
            <p className="text-center text-base-content/60 mb-6">
              Login to continue
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} onReset={handleClearForm}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control mb-2">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="input input-bordered w-full"
                />
                
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  type="reset"
                  disabled={isLoading}
                  className="btn btn-outline flex-1"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary flex-1"
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>
              </div>
              <div className="flex justify-center mt-4 text-sm ">
                <span>New customer?</span>
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="ml-2 font-semibold text-[#f59e0b] hover:underline"
                >
                  Register
                </button>
              </div>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-base-content/60 mt-6">
              All fields are mandatory. We respect your privacy.
            </p>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default Login;
