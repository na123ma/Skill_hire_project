import React, { useState } from "react";
import { registerUser } from "../api/api";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "candidate",
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

    console.log("Sending:", formData);

    try {
      const res = await registerUser(formData);
      console.log("Response:", res);

      if (res.message) {
        setMessage("✅ Registered successfully");
      } else {
        setMessage("❌ " + JSON.stringify(res));
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Server error");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input name="username" onChange={handleChange} placeholder="Username" />
        <br />

        <input name="email" onChange={handleChange} placeholder="Email" />
        <br />

        <input type="password" name="password" onChange={handleChange} placeholder="Password" />
        <br />

        <input type="password" name="confirm_password" onChange={handleChange} placeholder="Confirm Password" />
        <br />

        <select name="role" onChange={handleChange}>
          <option value="candidate">Candidate</option>
          <option value="company">Company</option>
        </select>
        <br />

        <button type="submit">Register</button>
      </form>

      <p>{message}</p>
    </div>
  );
};

export default Register;