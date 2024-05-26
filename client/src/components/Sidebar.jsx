import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Bot, Coins, Eraser, FileClock, Home, LogOut } from "lucide-react";
import Point from "../assets/star.png";
import axios from "axios";
import { authToken, userId } from "../config";
import { gsap } from "gsap";
import { useSnackbar } from "notistack";
import { Modal } from "antd";
import BotImage from "../assets/robot.png";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isClearModalVisible, setIsClearModalVisible] = useState(false);

  useEffect(() => {
    // Fetch user data from backend using axios
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5555/api/user", {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          enqueueSnackbar("Authorization denied. Please Log in.", {
            variant: "error",
          });
        } else {
          enqueueSnackbar("Something went wrong. Please try again.", {
            variant: "error",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    // Rotate the coin SVG using GSAP
    // gsap.fromTo(
    //   ".coin-svg",
    //   { rotationY: 0 },
    //   { rotationY: 360, duration: 1, ease: "linear" }
    // );
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    logout();
    navigate("/");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showClearModal = () => {
    setIsClearModalVisible(true);
  };

  const handleClearOk = async () => {
    setIsClearModalVisible(false);
    try {
      const response = await axios.delete(`http://localhost:5555/api/assessments/deleteAll/${userId}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      enqueueSnackbar(response.data.message, { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Failed to clear assessments. Please try again.", { variant: "error" });
    }
  };

  const handleClearCancel = () => {
    setIsClearModalVisible(false);
  };

  const isActive = (path) => {
    // console.log(path, location.pathname);
    return location.pathname === path
      ? "text-gray-700 bg-gray-100"
      : "text-gray-200 hover:bg-gray-50 hover:text-gray-700";
  };

  return (
    <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-black px-5 py-8 pt-4">
      <div
        className="inline-flex items-center space-x-2 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <span>
          <img src={BotImage} alt="logo" className="w-8 h-8 mr-2 invert" />
        </span>
        <span className="font-bold text-white">
          Tech<span className="logo-text">Buddy</span>
        </span>
      </div>

      {/* <div className="flex items-center gap-1 text-lg font-semibold text-gray-400 point-section">
        <img src={Point} alt="" className="w-8 h-8 coin-svg" />
        {user && <span>{user.points}</span>}
      </div> */}
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
              onClick={showClearModal}
            >
              <Eraser className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">
                Clear All Assessment
              </span>
            </button>

            <button
              className="flex w-full transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              onClick={showModal}
            >
              <LogOut className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Log out</span>
            </button>
          </div>

          {user && (
            <div className="absolute bottom-0 mt-6 py-2 pb-3 px-3 flex items-center gap-2 text-gray-400">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#689F38] text-lg font-normal text-white">
                {user?.username[0].toUpperCase()}
              </div>
              <span className="text-sm font-medium">{user?.username}</span>
            </div>
          )}
        </nav>
      </div>

      <Modal
        title="Confirm Logout"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to logout?</p>
      </Modal>

      <Modal
        title="Confirm Clear All Assessments"
        open={isClearModalVisible}
        onOk={handleClearOk}
        onCancel={handleClearCancel}
        okText="Yes"
        okType="danger"
        cancelText="No"
      >
        <p>Are you sure you want to clear all assessments?</p>
      </Modal>
    </aside>
  );
}

export default Sidebar;
