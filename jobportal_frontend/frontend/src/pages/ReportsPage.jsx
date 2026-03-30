import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ReportsPage.css";
import CompanyNavbar from "../components/CompanyNavbar";

const API = "http://127.0.0.1:8000/api/jobs/";

function ReportsPage() {
  const [report, setReport] = useState({
    totalJobs: 0,
    activeJobs: 0,
    closedJobs: 0,
    locations: {},
    roles: {},
    experience: {}
  });
 const [active, setActive] = useState("Dashboard");
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(API);
      generateReport(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const generateReport = (data) => {
    const locationCount = {};
    const roleCount = {};
    const expCount = {};

    let active = 0;
    let closed = 0;

    data.forEach((job) => {
      // 📍 Location
      if (job.location) {
        locationCount[job.location] =
          (locationCount[job.location] || 0) + 1;
      }

      // 💼 Role
      if (job.title) {
        roleCount[job.title] =
          (roleCount[job.title] || 0) + 1;
      }

      // 📈 Experience
      if (job.experience) {
        expCount[job.experience] =
          (expCount[job.experience] || 0) + 1;
      }

      // 🟢 Active / Closed (Assumption)
      // 👉 If your backend has status field use that
      if (job.status === "closed") {
        closed++;
      } else {
        active++;
      }
    });

    setReport({
      totalJobs: data.length,
      activeJobs: active,
      closedJobs: closed,
      locations: locationCount,
      roles: roleCount,
      experience: expCount
    });
  };

  return (
    <>
    <CompanyNavbar active={active} setActive={setActive} /> 
    <div className="reports-container" id="report-container">
      <h2 className="reports-title">📊 Reports Dashboard</h2>

      <div className="reports-grid">

        {/* 🔥 Job Overview */}
        <div className="report-card">
          <h3>Job Overview</h3>
          <p>Total Jobs: {report.totalJobs}</p>
          <p>Active Jobs: {report.activeJobs}</p>
          <p>Closed Jobs: {report.closedJobs}</p>
        </div>

        {/* 📍 Location */}
        <div className="report-card">
          <h3>Jobs by Location</h3>
          <ul>
            {Object.entries(report.locations).map(([loc, count]) => (
              <li key={loc}>{loc}: {count}</li>
            ))}
          </ul>
        </div>

        {/* 💼 Role */}
        <div className="report-card">
          <h3>Jobs by Role</h3>
          <ul>
            {Object.entries(report.roles).map(([role, count]) => (
              <li key={role}>{role}: {count}</li>
            ))}
          </ul>
        </div>

        {/* 📈 Experience */}
        <div className="report-card">
          <h3>Experience Level Report</h3>
          <ul>
            {Object.entries(report.experience).map(([exp, count]) => (
              <li key={exp}>{exp}: {count}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
}

export default ReportsPage;