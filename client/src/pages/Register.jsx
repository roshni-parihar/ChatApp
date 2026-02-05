import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({
      fullName: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
    });
  };

  const validate = () => {
    let Error = {};

    if (formData.fullName.length < 3) {
      Error.fullName = "Name should be More Than 3 Characters";
    } else if (!/^[A-Za-z ]+$/.test(formData.fullName)) {
      Error.fullName = "Only Contain A-Z , a-z and space";
    }

    if (
      !/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(
        formData.email
      )
    ) {
      Error.email = "Use Proper Email Format";
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      Error.mobileNumber = "Only Indian Mobile Number allowed";
    }

    setValidationError(Error);
    return Object.keys(Error).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validate()) {
      setIsLoading(false);
      toast.error("Fill the Form Correctly");
      return;
    }

    try {
      const res = await api.post("/auth/register", formData);
      toast.success(res.data.message);
      handleClearForm();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 px-4">
      <div className="card w-full max-w-xl bg-base-100 shadow-2xl">
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-primary">
              Create Account
            </h2>
            <p className="text-sm text-base-content/70 mt-1">
              You are 1 step away to make friends 👋
            </p>
          </div>

          <form onSubmit={handleSubmit} onReset={handleClearForm}>
            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="input input-bordered w-full focus:input-primary"
                />
                {validationError.fullName && (
                  <span className="text-xs text-error mt-1 block">
                    {validationError.fullName}
                  </span>
                )}
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="input input-bordered w-full focus:input-primary"
              />

              <input
                type="tel"
                name="mobileNumber"
                placeholder="Mobile Number"
                maxLength="10"
                value={formData.mobileNumber}
                onChange={handleChange}
                disabled={isLoading}
                className="input input-bordered w-full focus:input-primary"
              />

              <input
                type="password"
                name="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className="input input-bordered w-full focus:input-primary"
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                className="input input-bordered w-full focus:input-primary"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-8">
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
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>

            {/* Login redirect */}
            <div className="flex justify-center mt-4 text-sm">
              <span>Already registered?</span>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="ml-2 font-semibold text-primary hover:underline"
              >
                Login
              </button>
            </div>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-base-content/60 mt-6">
            All fields marked are mandatory. We respect your privacy 🔐
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
