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
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import Assessment from "./pages/Assessment";
import ResultPage from "./pages/ResultPage";

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
      <div >
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
            path="/forget-password"
            element={
              <>
                <Navbar />
                <ForgetPassword />
              </>
            }
          />

          <Route
            path="/reset-password/:token"
            element={
              <>
                <Navbar />
                <ResetPassword />
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

          <Route path="/assessment" element={<Assessment />} />
          <Route path="/result/:id" element={<ResultPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
