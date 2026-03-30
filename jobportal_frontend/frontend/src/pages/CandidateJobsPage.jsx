import React, { useEffect, useState } from "react";
import axios from "axios";
import "./JobsPage.css";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const API = "http://127.0.0.1:8000/api/jobs/";

function CandidateJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [expandedJobId, setExpandedJobId] = useState(null);
  useEffect(() => {
    fetchJobs();
  }, []);

  const [active, setActive] = useState("Dashboard");

  const navigate = useNavigate();
  const fetchJobs = async () => {
    try {
      const res = await axios.get(API);
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 Read More Toggle
  const toggleReadMore = (id) => {
    setExpandedJobId(expandedJobId === id ? null : id);
  };

  return (
    <>
    <Navbar active={active} setActive={setActive} />
    <div className="jobs-container">
      <h2>Available Jobs</h2>

      {jobs.length === 0 && <p>No jobs available</p>}

      <div className="jobs-grid">
        {jobs.map((job) => (
          <div className="job-card" key={job.id}>
            
            {/* 👁 VIEW ONLY MODE */}
            <div className="job-header">
              <div className="job-logo">
                {job.company?.charAt(0)}
              </div>

              <div>
                <p className="job-company">{job.company || "N/A"}</p>
                <h3 className="job-title">{job.title || "N/A"}</h3>
              </div>
            </div>

            <div className="job-tags">
              <span className="tag">{job.experience || "N/A"}</span>
              <span className="tag">{job.location || "N/A"}</span>
            </div>

            {/* Skills */}
            {job.skills &&
              job.skills.split(",").map((skill, index) => (
                <span className="tag skill-tag" key={index}>
                  {skill.trim()}
                </span>
              ))}

            <div className="divider"></div>

            <p className="job-salary">{job.salary || "N/A"}</p>

            {/* Description Toggle */}
            {expandedJobId === job.id && (
              <div className="job-description">
                <p>{job.description || "No description available"}</p>
              </div>
            )}

            <div className="job-actions">
              <button onClick={() => toggleReadMore(job.id)}>
                {expandedJobId === job.id ? "Show Less" : "Read More..."}
              </button>
            </div>
            <button className="btn btn-primary"   onClick={() => navigate(`/candidate/jobview/${job.id}`)}>View</button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default CandidateJobsPage;