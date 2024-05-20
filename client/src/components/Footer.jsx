import React from "react";
import Bot from "../assets/robot.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer
      className=" text-gray-50 py-4 px-16"
      style={{ background: "#151719" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
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
          <div>
            <p className="text-sm">© 2024 TechBuddy. All rights reserved.</p>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-gray-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
