import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
// import { startTest } from "../api/api";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaUsers,
  FaGraduationCap,
  FaIndustry,
} from "react-icons/fa";
import "./Candidatejobview.css";
import Navbar from "../components/Navbar";
const API = "http://127.0.0.1:8000/api/jobs/";
// const res = await generateQuiz(skillsArray);
function Candidatejobview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJob();
  }, []);

 const [active, setActive] = useState("Dashboard");

  const fetchJob = async () => {
    try {
      const res = await axios.get(`${API}${id}/`);
      setJob(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!job) return <p style={{ padding: "20px" }}>Loading...</p>;



// const handleApply = async () => {
//   try {
//     const res = await startTest(job.id);

//     navigate("/test", {
//       state: {
//         testData: res.data,
//         jobTitle: job.title,
//       },
//     });

//   } catch (err) {
//     console.error(err);
//     alert("Failed to start test");
//   }
// };
const handleApply = () => {
    navigate(`/candidate/instructions/${job.id}`, {
      state: { 
        skills: job.skills,
        jobId: job.id 
       }, // ✅ PASS SKILLS HERE
    });
  };
  return (
    <>
    <Navbar active={active} setActive={setActive} />
    <div className="job-page">

      {/* ✅ TOP CARD (LIKE IMAGE 2) */}
      <div className="job-card">

        <div className="header">
          <div className="logo">{job.company?.charAt(0)}</div>

          <div className="info">
            <p className="company">{job.company}</p>
            <h2>{job.title}</h2>
          </div>

          <button className="apply-btn" onClick={handleApply}>Apply</button>
        </div>

        <div className="meta">
          <span><FaBriefcase /> {job.experience || "0-2 Years"}</span>
          <span><FaRupeeSign /> {job.salary || "3 LPA"}</span>
          <span><FaMapMarkerAlt /> {job.location || "India"}</span>
        </div>

        <div className="bottom">
          <div className="box">
            <FaUsers />
            <div>
              <p>Applied</p>
              <strong>{job.applied || 0}</strong>
            </div>
          </div>

          <div className="box">
            <FaGraduationCap />
            <div>
              <p>Qualification</p>
              <strong>{job.qualification || "Graduation"}</strong>
            </div>
          </div>

          <div className="box">
            <FaIndustry />
            <div>
              <p>Industry</p>
              <strong>{job.industry || "IT"}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ DESCRIPTION CARD */}
      <div className="desc-card">
        <h3>Job Description</h3>

        <p><strong>Experience:</strong> {job.experience || "0-2 Years"}</p>
        <p><strong>Salary:</strong> {job.salary || "3 LPA"}</p>
        <p><strong>Skills:</strong> {job.skills || "Not specified"}</p>

        {/* ✅ DEFAULT VALUES FIXED */}
        <p><strong>Notice Period:</strong> {job.notice_period || "3w - 4w"}</p>
        <p><strong>Shift:</strong> {job.shift || "Day Shift"}</p>
        <p><strong>Opportunity Type:</strong> {job.type || "WFO"}</p>

        {/* ❌ REMOVED Placement Type */}

        <p><strong>Contract Duration:</strong> {job.contract || "Full Time"}</p>

        <h4>What do you need for this opportunity:</h4>
        <p>{job.description}</p>

        {/* Skills */}
        {job.skills && (
          <div className="skills">
            {job.skills.split(",").map((s, i) => (
              <span key={i}>{s.trim()}</span>
            ))}
          </div>
        )}
      </div>

      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
    </div>
    </>
  );
}

export default Candidatejobview;