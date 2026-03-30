import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  faHome,
  faUser,
  faBriefcase,
  faChartBar,
  faEye,
  faComments,
  faCog,
  faSignOutAlt,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";

function Navbar({ active, setActive }) {
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: faHome, path: "/candidatedashboard" },
    { name: "Profile", icon: faUser, path: "/profile/create", dropdown: true },
    { name: "BrowseJobs", icon: faBriefcase, path: "/browsejobs" },
    { name: "Ranked", icon: faChartBar, path: "/ranked" },
    { name: "View Results", icon: faEye, path: "/results" },
    { name: "Interview", icon: faComments, path: "/interview" },
    { name: "Settings", icon: faCog, path: "/settings", type: "bottom" },
    { name: "Logout", icon: faSignOutAlt, path: "/", type: "bottom" }
  ];

  return (
    <div className="sidebar">
      <h5 className="pb-4">Candidate Dashboard</h5>

      {menuItems.map((item, index) => (
        <div key={index}>
          
          {/* MAIN MENU ITEM (UNCHANGED LOGIC) */}
          <div
            className={`menu-item ${active === item.name ? "active" : ""} 
            ${item.type === "bottom" ? "last-items" : ""}`}
            onClick={() => {
              if (item.dropdown) {
                setOpenProfile(!openProfile); // toggle dropdown
              } else {
                setActive(item.name);
                navigate(item.path);
              }
            }}
          >
            <FontAwesomeIcon icon={item.icon} className="icon" />
            <span>{item.name}</span>

            {item.dropdown && (
              <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
            )}
          </div>

          {/* DROPDOWN (ADDED FEATURE) */}
          {item.dropdown && openProfile && (
            <div className="submenu">
              <div
                className="submenu-item"
                onClick={() => {
                  navigate("/profile/create");
                  setActive("Profile");
                }}
              >
                Create Profile
              </div>

              <div
                className="submenu-item"
                onClick={() => {
                  navigate("/profile/view");
                  setActive("Profile");
                }}
              >
                View Profile
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Navbar;