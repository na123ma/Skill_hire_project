const BASE_URL = "http://localhost:8000/api"; // ✅ changed from 127.0.0.1

export const registerUser = async(data) => {
    try {
        const response = await fetch(`${BASE_URL}/register/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to register");
        }

        return await response.json();
    } catch (error) {
        console.error("Register Error:", error);
        throw error;
    }
};

export const loginUser = async(data) => {
    try {
        const response = await fetch(`${BASE_URL}/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to login");
        }   

        return await response.json();
    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
};


// ─── Submit Test ─────────────────────────────────────────────────────────────
export const submitTest = async (payload) => {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/submit-test/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Failed to submit test");
  }

  const data = await response.json();
  return { data };
};

import axios from "axios";

// const BASE_URL = "http://127.0.0.1:8000/api";

export const generateTest = (jobId) => {
  return axios.post(`${BASE_URL}/generate-test/`, {
    job_id: jobId,
  });
};