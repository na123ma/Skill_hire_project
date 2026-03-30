import { useEffect, useState } from "react";
import { getMyProfile } from "../api/profile";
import Navbar from "../components/Navbar";

import "./ProfileList.css";

function ProfileList() {
  const [profile, setProfile] = useState(null);
  const [active, setActive] = useState("Profile");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <h2>Loading...</h2>;

  return (
    <div className="dashboard-container">
      <Navbar active={active} setActive={setActive} />
      <div className="main-content">
        <div className="profile-card">
  <div className="profile-image">
    <img
      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
      alt="profile"
    />
  </div>
  <div className="profile-info">
    <h2>My Profile</h2>

    <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
    <p><strong>Email:</strong> {profile.email}</p>
    <p><strong>Phone:</strong> {profile.phone}</p>
    <p><strong>Location:</strong> {profile.location}</p>
  </div>
  <button className="save-btn">Save</button>
</div>
<div className="bg-white p-2  w-50 education-card">
<div className="d-flex">
  <h3 className="mb-3">Education</h3>
  <div className="btn w-25 edit"><i className="fa-solid fa-pen-to-square"></i></div>
</div>
<div className="table-responsive">
  <table className="table table-bordered table-hover shadow-sm rounded">
    <thead className="table-secondary">
      <tr>
        <th>#</th>
        <th>Degree & College</th>
        <th>Field</th>
        <th>Duration</th>
        <th>Percentage</th>
      </tr>
    </thead>

    <tbody>
      {profile.educations?.map((edu, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{edu.degree} - {edu.college}</td>
          <td>{edu.field_of_study}</td>
          <td>{edu.start_year} - {edu.end_year}</td>
          <td>{edu.percentage}%</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
<div className=" w-25  skills-card">
  <h3 className="mb-3">Skills</h3>
  {profile.skills?.map((skill, i) => (
    <div key={i} className="skill-row">

      {/* Left Dot */}
      <span className="skill-dot"></span>

      {/* Skill Content */}
      <div className="skill-content">
        <p className="skill-title">{skill.technical_skills}</p>
        <p className="skill-sub">{skill.soft_skills}</p>
      </div>

      {/* Badge */}
      <span className="skill-badge">Active</span>

    </div>
  ))}
</div>
<div className=" w-25 exp-card">
  <h3 className="mb-3">Work Experience</h3>
  {profile.experiences?.map((exp, i) => (
    <div key={i} className="exp-row">

      {/* Left Dot */}
      <span className="exp-dot"></span>

      {/* Content */}
      <div className="exp-content">
        <p className="exp-title">{exp.job_title}</p>
        <p className="exp-desc">{exp.description}</p>
      </div>

      {/* Badge */}
      <span className="exp-badge">Completed</span>

    </div>
  ))}
</div>
<div className="bg-white row">
  <h3 className="mb-3">Projects</h3>
  <div>
  {profile.projects?.map((proj, i) => (
    <div className="col-md-4 mb-4" key={i}>
      <div className="card h-100 shadow-sm">

        {/* Random Image */}
        <img
          src={`https://picsum.photos/seed/${encodeURIComponent(proj.title)}/300/200`}
          className="card-img-top"
          alt="project"
        />

        <div className="card-body">
          <h5 className="card-title">{proj.title}</h5>
          <p className="card-text">{proj.description}</p>
          <p className="text-muted">
            <strong>Tech:</strong> {proj.technologies}
          </p>
        </div>

        <div className="card-footer bg-white border-0">
          <a
            href={proj.link}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary w-100"
          >
            View Project
          </a>
        </div>

      </div>
    </div>
  ))}
  </div>
</div>
{/* documents */}
<h3>Documents</h3>

{/* Resume */}
{profile.documents?.resume && (
  <div>
    <p>Resume:</p>
    <a href={profile.documents.resume} target="_blank" rel="noreferrer">
      View Resume
    </a>
  </div>
)}

{/* GitHub */}
{profile.documents?.github_link && (
  <div>
    <p>GitHub:</p>
    <a href={profile.documents.github_link} target="_blank" rel="noreferrer">
      {profile.documents.github_link}
    </a>
  </div>
)}

{/* LinkedIn */}
{profile.documents?.linkedin_link && (
  <div>
    <p>LinkedIn:</p>
    <a href={profile.documents.linkedin_link} target="_blank" rel="noreferrer">
      {profile.documents.linkedin_link}
    </a>
  </div>
)}
      </div>
    </div>
  );
}

export default ProfileList;