    import React, { useEffect, useState } from "react";
import axios from "axios";
import "./JobsPage.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import CompanyNavbar from "../components/CompanyNavbar";

const API = "http://127.0.0.1:8000/api/jobs/";

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [editId, setEditId] = useState(null);

  const [companyLogo, setCompanyLogo] = useState("");
  const [expandedJobId, setExpandedJobId] = useState(null); // ✅ NEW

  const [editData, setEditData] = useState({
    company: "",
    title: "",
    salary: "",
    location: "",
    experience: "",
    skills: "",
    description: ""
  });
const [active, setActive] = useState("Dashboard");
  // 📥 Fetch Jobs + Load Logo
  useEffect(() => {
    fetchJobs();

    const savedProfile = localStorage.getItem("companyProfile");
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setCompanyLogo(parsed.logo);
    }
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(API);
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🗑 DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}${id}/`);
      alert("Deleted");
      fetchJobs();
    } catch (err) {
      console.log(err.response);
      alert("Delete failed");
    }
  };

  // ✏️ EDIT
  const handleEdit = (job) => {
    setEditId(job.id);

    setEditData({
      company: job.company || "",
      title: job.title || "",
      salary: job.salary || "",
      location: job.location || "",
      experience: job.experience || "",
      skills: job.skills || "",
      description: job.description || ""
    });
  };

  // 💾 UPDATE
  const handleUpdate = async () => {
    try {
      await axios.patch(`${API}${editId}/`, editData);
      alert("✅ Updated successfully");
      setEditId(null);
      fetchJobs();
    } catch (err) {
      console.log(err.response);
      alert("Update failed");
    }
  };

  // 🔥 Read More Toggle
  const toggleReadMore = (id) => {
    setExpandedJobId(expandedJobId === id ? null : id);
  };

  return (
    <>
    <CompanyNavbar active={active} setActive={setActive} />  
    <div className="jobs-container">
      <h2>Active Jobs</h2>

      {jobs.length === 0 && <p>No jobs available</p>}

      <div className="jobs-grid">
        {jobs.map((job) => (
          <div className="job-card" key={job.id}>
            {editId === job.id ? (
              <>
                {/* ✏️ EDIT MODE */}
                <input
                  placeholder="Company"
                  value={editData.company}
                  onChange={(e) =>
                    setEditData({ ...editData, company: e.target.value })
                  }
                />

                <input
                  placeholder="Role"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                />

                <input
                  placeholder="Salary"
                  value={editData.salary}
                  onChange={(e) =>
                    setEditData({ ...editData, salary: e.target.value })
                  }
                />

                <input
                  placeholder="Location"
                  value={editData.location}
                  onChange={(e) =>
                    setEditData({ ...editData, location: e.target.value })
                  }
                />

                <input
                  placeholder="Experience"
                  value={editData.experience}
                  onChange={(e) =>
                    setEditData({ ...editData, experience: e.target.value })
                  }
                />

                <input
                  placeholder="Skills"
                  value={editData.skills}
                  onChange={(e) =>
                    setEditData({ ...editData, skills: e.target.value })
                  }
                />

                <textarea
                  placeholder="Description"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                />
                <div className="edit-actions">
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                {/* 👁 VIEW MODE */}
                <div className="job-header">
                  <div className="job-logo">
                    {companyLogo ? (
                      <img src={companyLogo} alt="Company Logo" />
                    ) : (
                      job.company?.charAt(0)
                    )}
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

                {/* 🔥 Skills */}
                {job.skills &&
                  job.skills.split(",").map((skill, index) => (
                    <span className="tag skill-tag" key={index}>
                      {skill.trim()}
                    </span>
                  ))}

                <div className="divider"></div>

                <p className="job-salary">{job.salary || "N/A"}</p>

                {/* ✅ Description Toggle */}
                {expandedJobId === job.id && (
                  <div className="job-description">
                    <p>{job.description || "No description available"}</p>
                  </div>
                )}

                <div className="job-actions">
                  <button
                    
                    onClick={() => toggleReadMore(job.id)}
                  >
                    {expandedJobId === job.id
                      ? "Show Less"
                      : "Read More..."}
                  </button>

                   {/* ✏️ Edit */}
  <div
    className="icon-btn"
    onClick={() => handleEdit(job)}
    title="Edit Job"
  >
    <FaEdit />
  </div>

  {/* 🗑 Delete */}
  <div
    className="icon-btn delete-btn"
    onClick={() => handleDelete(job.id)}
    title="Delete Job"
  >
    <FaTrash />
  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default JobsPage;