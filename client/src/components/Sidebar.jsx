import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Bot, Coins, Eraser, FileClock, Home, LogOut } from "lucide-react";
import Point from "../assets/star.png";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    const shouldLogout = window.confirm("Are you sure you want to logout?");

    if (shouldLogout) {
      logout();
      navigate("/");
    }
  };

  const isActive = (path) => {
    console.log(path, location.pathname);
    return location.pathname === path
      ? "text-gray-700 bg-gray-100"
      : "text-gray-200 hover:bg-gray-50 hover:text-gray-700";
  };

  return (
    <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-black px-5 py-8">
      <div className="flex items-center gap-1 text-lg font-semibold text-gray-400 point-section">
        <img src={Point} alt="" className="w-8 h-8" />
        <span>0</span>
      </div>
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6">
          <div className="space-y-3">
            <Link
              className={`flex transform items-center rounded-lg px-3 py-2 ${isActive(
                "/dashboard"
              )}`}
              to="/dashboard"
            >
              <Bot className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Dashboard</span>
            </Link>
            <Link
              className={`flex transform items-center rounded-lg px-3 py-2 ${isActive(
                "/previous-assessment"
              )}`}
              to="/previous-assessment"
            >
              <FileClock className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">
                Previous Assessment
              </span>
            </Link>
            <Link
              className={`flex transform items-center rounded-lg px-3 py-2 ${isActive(
                "/exchange-points"
              )}`}
              to="/exchange-points"
            >
              <Coins className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Exchange Points</span>
            </Link>
          </div>

          <div className="space-y-3">
            <label className="px-3 text-xs font-semibold uppercase text-white">
              Actions
            </label>
            <Link
              className={`flex transform items-center rounded-lg px-3 py-2 ${isActive(
                "/"
              )}`}
              to="/"
            >
              <Home className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Back to Home</span>
            </Link>
            <button
              className="flex w-full transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Eraser className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">
                Clear All Assessment
              </span>
            </button>

            <button
              className="flex w-full transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Log out</span>
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
