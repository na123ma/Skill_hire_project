import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import CompanyNavbar from "../components/CompanyNavbar";

function ProfilePage() {
  const [profile, setProfile] = useState({
    companyName: "",
    email: "",
    location: "",
    website: "",
    description: "",
    logo: ""
  });

const [active, setActive] = useState("Dashboard");

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("companyProfile");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };
  

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({
          ...profile,
          logo: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("companyProfile", JSON.stringify(profile));
    setIsEditing(false);
    window.location.reload();
    alert("✅ Profile Saved Successfully");
  };

  return (
    <>
    <CompanyNavbar active={active} setActive={setActive} /> 
    <div className="profile-container" id="profile-container1">

      <div className="profile-card">

        {/* LEFT IMAGE SECTION */}
        <div className="profile-left">
          {profile.logo ? (
            <img src={profile.logo} alt="Company Logo" />
          ) : (
            <div className="placeholder">Upload Logo</div>
          )}
        </div>

        {/* RIGHT CONTENT */}
        <div className="profile-right">

          <h2>
            Let's Talk about <span>Company</span>
          </h2>

          {isEditing ? (
            <>
              <input name="companyName" placeholder="Company Name"
                value={profile.companyName} onChange={handleChange} />

              <input name="email" placeholder="Email"
                value={profile.email} onChange={handleChange} />

              <input name="location" placeholder="Location"
                value={profile.location} onChange={handleChange} />

              <input name="website" placeholder="Website"
                value={profile.website} onChange={handleChange} />

              <textarea name="description" placeholder="Description"
                value={profile.description} onChange={handleChange} />

              <input type="file" onChange={handleLogoUpload} />

              <div className="btn-group">
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <p><b>{profile.companyName || "Company Name"}</b></p>
              <p>{profile.description || "Company description goes here..."}</p>

              <div className="details">
                <p>📧 {profile.email || "email@example.com"}</p>
                <p>📍 {profile.location || "Location"}</p>
                <p>🌐 {profile.website || "Website"}</p>
              </div>

              <button onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            </>
          )}

        </div>
      </div>

    </div>
    </>
  );
}

export default ProfilePage;