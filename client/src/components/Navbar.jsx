import React, {useState} from "react";
import Bot from "../assets/robot.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useSnackbar } from "notistack";
import { Modal } from "antd";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    logout();
    enqueueSnackbar("Logging out successful!", { variant: "success" });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div
      className="absolute top-0 z-10 w-full py-3 text-white"
      data-aos="fade-down"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div
          className="inline-flex items-center space-x-2 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <span>
            <img src={Bot} alt="logo" className="w-8 h-8 mr-2 invert" />
          </span>
          <span className="font-bold">
            Tech<span className="logo-text">Buddy</span>
          </span>
        </div>
        <div className="hidden space-x-2 lg:block text-white">
          {isLoggedIn ? (
            <>
              <button
                type="button"
                className="rounded-md text-[#5d5dfe] bg-transparent px-3 py-2 text-base font-semibold hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={showModal}
              >
                Logout
              </button>
              <Link to="/dashboard">
                <button
                  type="button"
                  className="rounded-sm bg-[#5d5dfe] hover:bg-[#4B4ACF] grad-btn border-white px-3 py-2 text-base font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Dashboard
                </button>
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                className="rounded-md text-[#5d5dfe] bg-transparent px-3 py-2 text-base font-semibold hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <Link to="/login">Sign in</Link>
              </button>

              <Link to="/signin">
                <button
                  type="button"
                  className="rounded-sm bg-[#5d5dfe] hover:bg-[#4B4ACF] grad-btn border-white px-3 py-2 text-base font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Sign up
                </button>
              </Link>
            </>
          )}
        </div>
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

    </div>
  );
};

export default Navbar;
