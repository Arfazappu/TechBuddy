import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import Point from "../assets/star.png";
import { gsap } from "gsap";
import { authToken } from "../config";

function PointBar() {
  const [user, setUser] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Fetch user data from backend using axios
    const fetchUserData = async () => {
      try {
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
      }
    };

    fetchUserData();

    // Rotate the coin SVG using GSAP
    gsap.fromTo(
      ".coin-svg",
      { rotationY: 0 },
      { rotationY: 360, duration: 1, ease: "linear" }
    );
  }, []);

 return(
    <div className="absolute z-10 top-5 right-8 flex items-center gap-1 text-lg font-semibold text-gray-400 point-section">
        <img src={Point} alt="" className="w-[30px] h-[30px] coin-svg" />
        {user && <span>{user.points}</span>}
      </div>
 );
}

export default PointBar;
