import React, { useEffect, useState } from "react";
import "./DashboardPage.css";
import { NavLink } from "react-router-dom";
import CompanyNavbar from "./CompanyNavbar";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [active, setActive] = useState("Dashboard");
  // ✅ GET USERNAME FROM LOCAL STORAGE
  const [username, setUsername] = useState("");
  const [profileLogo, setProfileLogo] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("username");

    console.log("Stored username:", user); // ✅ debug

    if (user && user !== "undefined") {
      setUsername(user);
    } else {
      setUsername(""); // ❌ don't force "User"
    }

    // ✅ GET PROFILE DATA
    const savedProfile = localStorage.getItem("companyProfile");
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfileLogo(parsed.logo);
    }
  }, []);

  return (
    <>
    <CompanyNavbar active={active} setActive={setActive} />  
    <div>

      {/* 🔥 TOP HEADER */}
      <div className="top-header">

        <div>
          <h2>Welcome Back, <span className="text-warning">{ user?.username }</span></h2>
          <p>Where talent meets opportunity.</p>
        </div>

        <div className="header-right">

          <div className="user-section">
            <span>{username}</span>

            {/* ✅ DYNAMIC LOGO */}
            <img
              src={
                profileLogo
                  ? profileLogo
                  : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="user"
            />
          </div>

        </div>

      </div>

      {/* ✅ DASHBOARD CARDS */}
      <div className="dashboard-container" id="dashboard-container1">

        <div className="card-grid">

          {/* POST JOB */}
          <div className="pricing-card purple">
            <div className="card-top">
              <h3>POST JOB</h3>
            </div>
            <div className="card-body">
              <p>Create new job postings</p>
              <NavLink to="/company/jobs" className="btn w-100 mt-4">Go</NavLink>
            </div>
          </div>

          {/* TOTAL USERS */}
          <div className="pricing-card pink">
            <div className="card-top">
              <h3>ACTIVE JOBS</h3>
            </div>
            <div className="card-body">
              <p>Manage current jobs</p>
              <NavLink to="/company/jobview" className="btn w-100 mt-4">View</NavLink>
            </div>
          </div>

          {/* APPLICATIONS */}
          <div className="pricing-card orange">
            <div className="card-top">
              <h3>APPLICATIONS</h3>
            </div>
            <div className="card-body">
              <p>Total candidates applied</p>
              <button className="btn w-100 mt-4">Open</button>
            </div>
          </div>

          {/* SHORTLISTED */}
          <div className="pricing-card blue">
            <div className="card-top">
              <h3>SHORTLISTED</h3>
            </div>
            <div className="card-body">
              <p>Selected candidates</p>
              <button className="btn w-100 mt-4">Check</button>
            </div>
          </div>

          {/* TESTS */}
          <div className="pricing-card green">
            <div className="card-top">
              <h3>TESTS</h3>
            </div>
            <div className="card-body">
              <p>Assigned tests</p>
              <button className="btn w-100 mt-4">View</button>
            </div>
          </div>

        </div>

      </div>

    </div>
    </>
  );
}

export default Dashboard;