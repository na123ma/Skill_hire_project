import React, { useState } from "react";
// import { API } from "../api/api";  
import Navbar from "../components/Navbar";
import "./Profileform.css";
function ProfileForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    language: "",
    date_of_birth: "",
    gender: "",
    location: "",
    about_me: "",
    github: "",
    linkedin: "",
    educations: [],
    experiences: [],
    skills: [],
    projects: [],
    documents: {
  resume: null,
  github_link: "",
  linkedin_link: "",
},
  });
  const [active, setActive] = useState("Profile");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      educations: [
        ...formData.educations,
        {
          degree: "",
          college: "",
          field_of_study: "",
          start_year: "",
          end_year: "",
          percentage: "",
        },
      ],
    });
  };

  const addSkill = () => {
  setFormData({
    ...formData,
    skills: [
      ...formData.skills,
      {
        technical_skills: "",
        soft_skills: "",
      },
    ],
  });
};

const addExperience = () => {
  setFormData({
    ...formData,
    experiences: [
      ...formData.experiences,
      {
        job_title: "",
        description: "",
      },
    ],
  });
};

const addProject = () => {
  setFormData({
    ...formData,
    projects: [
      ...formData.projects,
      {
        title: "",
        description: "",
        technologies: "",
        link: "",
      },
    ],
  });
};

// delete education

const removeEducation = (index) => {
  const updated = formData.educations.filter((_, i) => i !== index);

  setFormData({
    ...formData,
    educations: updated,
  });
};

// Addskills

const removeSkills = (index)=>{
  const updated = formData.skills.filter((_,i)=>i!==index);

  setFormData({
    ...formData,
    skills: updated,
  });
}

//experience
const removeExperience = (index)=>{
  const updated = formData.experiences.filter((_,i)=>i!==index);

  setFormData({
    ...formData,
    experiences: updated,
  });
} 
//projects

const removeProject = (index)=>{
  const updated = formData.projects.filter((_,i)=>i!==index);

  setFormData({
    ...formData,
    projects: updated,
  });
} 

 const handleEducationChange = (index, e) => {
  const updated = [...formData.educations];

  let value = e.target.value;

  if (
    e.target.name === "start_year" ||
    e.target.name === "end_year" ||
    e.target.name === "percentage"
  ) {
    value = Number(value);
  }

  updated[index][e.target.name] = value;
  setFormData({ ...formData, educations: updated });
};

const handleSkillChange = (index, e) => {
  const updated = [...formData.skills];

  updated[index][e.target.name] = e.target.value;

  setFormData({
    ...formData,
    skills: updated,
  });
};

const handleExperienceChange = (index, e) => {
  const updated = [...formData.experiences];

  updated[index][e.target.name] = e.target.value;

  setFormData({
    ...formData,
    experiences: updated,
  });
};

const handleProjectChange = (index, e) => {
  const updated = [...formData.projects];

  updated[index][e.target.name] = e.target.value;

  setFormData({
    ...formData,
    projects: updated,
  });
};
// adddocuments
const handleDocumentChange = (e) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    documents: {
      ...formData.documents,
      [name]: value,
    },
  });
};

const handleFileDrop = (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];

  setFormData({
    ...formData,
    documents: {
      ...formData.documents,
      resume: file,
    },
  });
};

const handleFileSelect = (e) => {
  const file = e.target.files[0];

  console.log("SELECTED FILE:", file); // ✅ DEBUG

  setFormData({
    ...formData,
    documents: {
      ...formData.documents,
      resume: file,   // ✅ MUST BE FILE OBJECT
    },
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.educations.length === 0) {
    alert("Add at least one education");
    return;
  }

 // ✅ ADD THIS HERE
  const filteredProjects = formData.projects.filter(
    (p) => p.title && p.technologies && p.link
  );
   
  const formDataToSend = new FormData();

// ✅ THIS IS THE MOST IMPORTANT LINE
formDataToSend.append("resume", formData.documents.resume);

  const payload = {
    ...formData,
    education: formData.educations,   // ✅ FIX
    skills: formData.skills,
    projects: filteredProjects,
    experiences: formData.experiences,
    //  resume: formData.documents.resume,
    
  github_link: formData.documents.github_link,
  linkedin_link: formData.documents.linkedin_link,
  };

  console.log("FINAL PAYLOAD:", payload);

  try {
  const res = await API.post("profiles/", payload);

  console.log(res.data);                 // 🔍 see response in console
  alert(JSON.stringify(res.data));       // ✅ show backend response

  alert("Profile Created!");             // optional

} catch (error) {
  console.log("ERROR:", error.response?.data);

  alert(JSON.stringify(error.response?.data));  // show error
}
}
  return (
    <>
    <div className="profile-container">
    <Navbar active={active} setActive={setActive} />
<form onSubmit={handleSubmit} className="profile-form">
  <h2 className="form-title">Create Profile</h2> 
  <h3 className="section-title">Basic Info</h3>

  <div className="form-grid">
    <input className="input-field" name="first_name" placeholder="First Name" onChange={handleChange} />
    <input className="input-field" name="last_name" placeholder="Last Name" onChange={handleChange} />
    <input className="input-field" name="email" placeholder="Email" onChange={handleChange} />
    <input className="input-field" name="phone" placeholder="Phone" onChange={handleChange} />
    <input className="input-field" name="language" placeholder="Language" onChange={handleChange} />
    <input className="input-field" name="date_of_birth" type="date" onChange={handleChange} />
    <input className="input-field" name="gender" placeholder="Gender" onChange={handleChange} />
    <input className="input-field" name="location" placeholder="Location" onChange={handleChange} />
  </div>

  <textarea className="textarea-field" name="about_me" placeholder="About Me" onChange={handleChange} />

  <h3 className="section-title">Education</h3>
  <button type="button" className="btn-secondary" onClick={addEducation}>Add Education</button>

  {formData.educations.map((edu, index) => (
    <div key={index} className="card">
       {/* Delete Button */}
    <div className="icontrash"
      onClick={() => removeEducation(index)}
    ><i className="fa-solid fa-trash text-danger"></i>
    </div>
      <div className="d-flex">
      <input className="input-field me-3" name="degree" placeholder="Degree" onChange={(e) => handleEducationChange(index, e)} />
      <input className="input-field" name="college" placeholder="College" onChange={(e) => handleEducationChange(index, e)} />
      </div>
       <div className="d-flex">
      <input className="input-field me-3" name="field_of_study" placeholder="Field" onChange={(e) => handleEducationChange(index, e)} />
      <input className="input-field" name="start_year" placeholder="Start Year" onChange={(e) => handleEducationChange(index, e)} />
      </div>
      <div className="d-flex">
      <input className="input-field me-3" name="end_year" placeholder="End Year" onChange={(e) => handleEducationChange(index, e)} />
      <input className="input-field" name="percentage" placeholder="Percentage" onChange={(e) => handleEducationChange(index, e)} />
      </div>
    </div>
  ))}

  <h3 className="section-title">Skills</h3>
  <button type="button" className="btn-secondary" onClick={addSkill}>Add Skill</button>

  {formData.skills.map((skill, index) => (
    <div key={index} className="card">
      <div className="icontrash"
      onClick={() => removeSkills(index)}
    ><i className="fa-solid fa-trash text-danger"></i>
    </div>
      <div className="d-flex">
      <input className="input-field me-3" name="technical_skills" placeholder="Technical Skills" onChange={(e) => handleSkillChange(index, e)} />
      <input className="input-field" name="soft_skills" placeholder="Soft Skills" onChange={(e) => handleSkillChange(index, e)} />
      </div>
    </div>
  ))}

  <h3 className="section-title">Work Experience</h3>
  <button type="button" className="btn-secondary" onClick={addExperience}>Add Experience</button>

  {formData.experiences.map((exp, index) => (
    <div key={index} className="card">
       <div className="icontrash"
      onClick={() => removeExperience(index)}
    ><i className="fa-solid fa-trash text-danger"></i>
    </div>
      <div className="d-flex">
      <input className="input-field me-3" name="job_title" placeholder="Job Title" onChange={(e) => handleExperienceChange(index, e)} />
      <textarea className="textarea-field w-50" name="description" placeholder="Job Description" onChange={(e) => handleExperienceChange(index, e)} />
      </div>
    </div>
  ))}

  <h3 className="section-title">Projects</h3>
  <button type="button" className="btn-secondary" onClick={addProject}>Add Project</button>

  {formData.projects.map((proj, index) => (
    <div key={index} className="card">
      <div className="icontrash"
      onClick={() => removeProject(index)}
    ><i className="fa-solid fa-trash text-danger"></i>
    </div>
      <div className="d-flex">
      <input className="input-field me-3" name="title" placeholder="Project Title" onChange={(e) => handleProjectChange(index, e)} />
      <textarea className="textarea-field w-50" name="description" placeholder="Project Description" onChange={(e) => handleProjectChange(index, e)} />
      </div>
      <div className="d-flex">
      <input className="input-field me-3" name="technologies" placeholder="Technologies" onChange={(e) => handleProjectChange(index, e)} />
      <input className="input-field" name="link" placeholder="Project Link" onChange={(e) => handleProjectChange(index, e)} />
      </div>
    </div>
  ))}

  <h3 className="section-title">Documents</h3>

  <div
    className="upload-box"
    onDrop={handleFileDrop}
    onDragOver={(e) => e.preventDefault()}
  >
    Drag & Drop Resume Here
    <input className="input-file" type="file" onChange={handleFileSelect} />
  </div>
  <div className="d-flex">
  <input className="input-field me-3" name="github_link" placeholder="GitHub Link" onChange={handleDocumentChange} />
  <input className="input-field" name="linkedin_link" placeholder="LinkedIn Link" onChange={handleDocumentChange} />
  </div>
  <button type="submit" className="btn-primary">Submit</button>
</form>
    </div>
    </>
  );
}

export default ProfileForm;