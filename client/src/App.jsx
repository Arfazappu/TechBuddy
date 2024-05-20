import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Signin from "./components/Signin";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import PreviousAssessment from "./pages/PreviousAssessment";
import ExchangePoints from "./pages/ExchangePoints";

import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 1000,
      easing: "ease-out-sine",
    });
  });

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />

          <Route
            path="/signin"
            element={
              <>
                <Navbar />
                <Signin />
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
              </>
            }
          />

          <Route
            path="/dashboard"
            element={
              <div className="flex">
                <Sidebar />
                <Dashboard />
              </div>
            }
          />
          <Route
            path="/previous-assessment"
            element={
              <div className="flex">
                <Sidebar />
                <PreviousAssessment />
              </div>
            }
          />
          <Route
            path="/exchange-points"
            element={
              <div className="flex">
                <Sidebar />
                <ExchangePoints />
              </div>
            }
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
