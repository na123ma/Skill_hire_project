import React, { useState } from "react";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await loginUser(formData);

  if (res.access_token) {
    // ✅ Store complete user info
    const userData = {
      username: formData.username,
      role: res.role,
      access: res.access_token,
      refresh: res.refresh_token,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    // Redirect
    if (res.role === "candidate") {
      navigate("/candidatedashboard");
    } else {
      navigate("/company");
    }
  } else {
    setMessage("❌ " + res.error);
  }
};

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit">Login</button>
      </form>

      <p>{message}</p>
    </div>
  );
};

export default Login;