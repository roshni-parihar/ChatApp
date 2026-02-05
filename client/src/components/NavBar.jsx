import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [theme, setTheme] = useState("light");
  const [showLogin, setShowLogin] = useState(false);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    localStorage.setItem("chatTheme", e.target.value);
    document.documentElement.setAttribute("data-theme", e.target.value);
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem("chatTheme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    setTheme(currentTheme);
  }, []);

  return (
    <>
      <div className="navbar bg-primary px-6 py-3 text-primary-content">
        {/* Left */}
        <div className="flex-1">
          <h1
            className="text-xl font-bold cursor-pointer  rounded-2xl w-fit px-3 py-1 outline-double"
            onClick={() => navigate("/")}
          >
            Vyakhyan
          </h1>
        </div>

        {/* Center (added proper gap) */}
        <div className="hidden md:flex gap-8 mx-10">
          <span
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <span
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/about")}
          >
            About
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <button
                className="btn btn-gradient btn-secondary btn-sm"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

              {/* ✅ Register Button with path */}
              <button
                className="btn  btn-gradient btn-accent  btn-sm"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          ) : (
            <>
              <span className="text-sm font-medium border rounded-2xl px-4 py-1">{user.fullName|| ""}</span>
              <button
                className="btn btn-outline btn-sm"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}

          <select
            name="theme"
            className="select select-sm"
            onChange={handleThemeChange}
            value={theme}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="claude">Claude</option>
            <option value="spotify">Spotify</option>
            <option value="vscode">VSCode</option>
            <option value="black">Black</option>
            <option value="corporate">Corporate</option>
            <option value="ghibli">Ghibli</option>
            <option value="gourmet">Gourmet</option>
            <option value="luxury">Luxury</option>
            <option value="mintlify">Mintlify</option>
            <option value="pastel">Pastel</option>
            <option value="perplexity">Perplexity</option>
            <option value="shadcn">Shadcn</option>
            <option value="slack">Slack</option>
            <option value="soft">Soft</option>
            <option value="valorant">Valorant</option>
          </select>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default NavBar;
