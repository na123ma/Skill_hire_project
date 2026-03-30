import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  faHome,
  faBriefcase,
  faFileAlt,
  faChartLine,
  faChartBar,
  faUser,
  faSignOutAlt,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";

function CompanyNavbar({ active, setActive }) {
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: faHome, path: "/companydashboard" },
    { name: "Jobs", icon: faBriefcase, path: "/company/jobview" },
    { name: "Applications", icon: faFileAlt, path: "/company/applications" },
    { name: "Results", icon: faChartLine, path: "/company/results" },
    { name: "Reports", icon: faChartBar, path: "/company/reports" },
    { name: "Profile", icon: faUser, path: "/company/profile", dropdown: true },
    { name: "Logout", icon: faSignOutAlt, path: "/", type: "bottom" }
  ];

  return (
    <div className="sidebar">
      <h5 className="logo">Company Dashboard</h5>

      {menuItems.map((item, index) => (
        <div key={index}>

          {/* MAIN MENU ITEM */}
          <div
            className={`menu-item ${active === item.name ? "active" : ""} 
            ${item.type === "bottom" ? "last-items" : ""}`}
            onClick={() => {
              if (item.dropdown) {
                setOpenProfile(!openProfile);
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

          {/* PROFILE DROPDOWN */}
          {item.dropdown && openProfile && (
            <div className="submenu">
              <div
                className="submenu-item"
                onClick={() => {
                  navigate("/company/profile/create");
                  setActive("Profile");
                }}
              >
                Create Profile
              </div>

              <div
                className="submenu-item"
                onClick={() => {
                  navigate("/company/profileview");
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

export default CompanyNavbar;