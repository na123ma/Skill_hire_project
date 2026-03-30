import React, { useState } from "react";
import axios from "axios";
import "./PostJobPage.css";
import ProfilePage from "./ProfilePage";
import CompanyNavbar from "../components/CompanyNavbar";

const API = "http://127.0.0.1:8000";

function PostJobPage() {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    salary: "",
    location: "",
    experience: "",
    skills: "",
    description: ""
  });
const [active, setActive] = useState("Dashboard");
  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      company: formData.company,
      title: formData.role, // mapped to backend
      salary: formData.salary,
      location: formData.location,
      experience: formData.experience,
      skills: formData.skills,
      description: formData.description
    };

    try {
      const res = await axios.post(`${API}/api/jobs/`, jobData);

      console.log("SUCCESS RESPONSE:", res.data);

      // ✅ Success message
      alert(res.data?.message || "✅ Job Posted Successfully!");

      // Reset form
      setFormData({
        company: "",
        role: "",
        salary: "",
        location: "",
        experience: "",
        skills: "",
        description: ""
      });

    } catch (error) {
      console.log("FULL ERROR:", error);

      // ✅ Safe error handling (no undefined)
      if (error.response && error.response.data) {
        alert(JSON.stringify(error.response.data));
      } else {
        alert("❌ Something went wrong. Please check backend or network.");
      }
    }
  };

  return (
    <>
    <CompanyNavbar active={active} setActive={setActive} />
    <div className="postjob-container">
      <div className="postjob-card">
        <h2 className="postjob-title">Post Job</h2>

        <form className="postjob-form" onSubmit={handleSubmit}>

          {/* Company */}
          <input
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            required
          />

          {/* Role */}
          <input
            name="role"
            placeholder="Enter Role (e.g. Frontend Developer)"
            value={formData.role}
            onChange={handleChange}
            required
          />

          {/* Salary */}
          <input
            name="salary"
            placeholder="Salary (e.g. 5 LPA)"
            value={formData.salary}
            onChange={handleChange}
            required
          />

          {/* Location */}
          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          {/* Experience */}
          <input
            name="experience"
            placeholder="Experience (e.g. 2 years)"
            value={formData.experience}
            onChange={handleChange}
            required
          />

          {/* Skills */}
          <input
            name="skills"
            placeholder="Skills (React, Node, Python...)"
            value={formData.skills}
            onChange={handleChange}
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          

          <button type="submit">Post Job</button>

        </form>
      </div>
    </div>
    </>
  );
}

export default PostJobPage;