import React, { useState } from "react";
import axios from "axios";

function TestPage() {
  const [error, setError] = useState(null);
  const [testData, setTestData] = useState(null);

  const handleStartTest = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        "http://localhost:8000/api/generate-test",
        { testId: "job-skill-test-001" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setTestData(response.data);
    } catch (err) {
      console.error("Network error:", err);
      setError("Could not connect to backend. Check if Django is running and CORS is configured.");
    }
  };

  return (
    <div>
      <h1>Test Page</h1>
      <button onClick={handleStartTest}>Start Test</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {testData && <pre>{JSON.stringify(testData, null, 2)}</pre>}
    </div>
  );
}

export default TestPage;
