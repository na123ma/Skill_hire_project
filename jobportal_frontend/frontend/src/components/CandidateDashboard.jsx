import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./Navbar.css";
import "./CandidateDashboard.css";
import { useNavigate } from "react-router-dom";

function CandidateDashboard() {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [completion, setCompletion] = useState(0);

  const userId = 1;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    const randomSeed = Math.random().toString(36).substring(7);
    setAvatar(
      `https://api.dicebear.com/7.x/personas/png?seed=${randomSeed}&size=80&radius=50`
    );
  }, []);

  // useEffect(() => {
  //   getProfile(userId)
  //     .then((res) => {
  //       if (res.data.is_new_user) {
  //         setCompletion(0);
  //       } else {
  //         setCompletion(res.data.completion || 0);
  //       }
  //     })
  //     .catch(() => setCompletion(0));
  // }, [userId]);

  const handleProfileClick = () => {
    if (completion < 100) {
      navigate("/profile-form");
    } else {
      navigate("/profile-view");
    }
  };

  return (
    <div className="dashboard-container">
      
      
      <Navbar active={active} setActive={setActive} />

      <div className="main-content">
        <div className="text-white p-3 text">
          <h2>Welcome Back,{user?.username}</h2>
          <p>Where talent meets opportunity.</p>

          <input
            type="search"
            className="search"
            placeholder="Search Your Dream job..."
          />

          <div className="d-flex profile-section">
            <h5 className=" pe-4 name">{user?.username}</h5>
            <div className="profile bg-white mt-3">
              <img
                src={avatar}
                alt="avatar"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  border: "3px solid white"
                }}
              />
            </div>
          </div>
        </div>

        <div className="content-box">
          <h2>{active}</h2>
          <p>This is the {active} section.</p>
        </div>
      </div>
    </div>
  );
}

export default CandidateDashboard;