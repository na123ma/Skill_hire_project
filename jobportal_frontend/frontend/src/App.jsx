import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import CandidateDashboard from "./components/CandidateDashboard";
import DashboardPage from "./components/DashboardPage";
// import CreateProfile from "./pages/CreateProfile";
import CreateProfile from "./pages/CreateProfile";
import ProfileList from "./pages/ProfileList";
import PostJobPage from "./pages/PostJobPage";
import ReportPage from "./pages/ReportsPage";
import JobsPage from "./pages/JobsPage";
import ProfilePage from "./pages/ProfilePage";
import CandidateJobsPage from "./pages/CandidateJobsPage";
import Candidatejobview from "./pages/Candidatejobview";
// import TestPage from "./pages/TestPage";
import Instructions from "./pages/Instructions";
import TestPage from "./pages/TestPage";
function App() {
  return (
    <Router>
      {/* Simple Navigation */}
      {/* <nav style={{ padding: "20px", background: "#eee" }}>
        <Link to="/" style={{ marginRight: "20px" }}>Login</Link>
        <Link to="/register">Register</Link>
      </nav> */}

      <Routes>
        {/* Default page */}
        <Route path="/" element={<Login />} />

        {/* Register page */}
        <Route path="/register" element={<Register />} />

        {/* Dashboards */}
        <Route path="/candidatedashboard" element={<CandidateDashboard />} />
        <Route path="/company" element={<DashboardPage/>} />
        {/* candidate profiles */}
       <Route path="/profile/create" element={<CreateProfile />} />
       <Route path="/profile/view" element={<ProfileList/>} />
       <Route path="/browsejobs" element={<CandidateJobsPage/>}/>
       <Route path="/candidate/jobview/:id" element={<Candidatejobview/>}/>

       {/* candidatejobs */}
       {/* <Route path="/test" element={<TestPage />} />  
       <Route path="/instructions/:id" element={<Instructions/>} />
       <Route path="/test/:id" element={<TestPage/>}/> */}
       <Route path="/candidate/instructions/:id" element={<Instructions />} />
       <Route path="/candidate/test/:id" element={<TestPage />} />

       {/* companydashboards */}
       <Route path="/companydashboard" element={<DashboardPage /> }/>
       <Route path="/company/jobs" element={<PostJobPage />} /> 
       <Route path="/company/reports" element={<ReportPage/>}/>
       <Route path="/company/jobview" element={<JobsPage/>}/>
       <Route path="/company/profileview" element={<ProfilePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;