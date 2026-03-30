import { useNavigate, useParams } from "react-router-dom";
import { generateTest } from "../api/api";
import { useEffect, useState, useRef } from "react";
// import Navbar from "../components/Navbar";
import "./Instructions.css";
// import { generateTest } from "../api/api";

function Instructions() {
  const { id } = useParams();
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [active, setActive] = useState("BrowseJobs");

  // 🎥 Start camera on mount
  useEffect(() => {
    startCamera();
    return () => stopCamera(); // stop when leaving page
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraReady(true);
    } catch (err) {
      console.error("Camera error:", err);
      setCameraError("Camera permission denied. You can still proceed.");
      setCameraReady(true); // allow test even without camera
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  // 🚀 Generate test & navigate
  const handleStartTest = async () => {
    if (!id) {
      alert("Job ID missing!");
      return;
    }
    setLoading(true);
    try {
      const res = await generateTest(id);
      // Don't stop camera here — TestPage will handle its own camera
      navigate(`/candidate/test/${id}`, {
        state: res.data,
      });
    } catch (err) {
      console.error("FULL ERROR:", err.response?.data || err);
      alert("Failed to generate test: " + (err.message || "Unknown error"));
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div className="instructions-container" style={{ flex: 1 }}>
        {/* Left: Instructions */}
        <div className="instructions-box">
          <h2>📋 Test Instructions</h2>

          <ul>
            <li>✅ This test contains <strong>30 AI-generated MCQs</strong> based on the job's required skills.</li>
            <li>⏱ You have <strong>30 minutes</strong> to complete the test.</li>
            <li>🔴 The test will <strong>auto-submit</strong> when time runs out.</li>
            <li>📷 Your camera will remain <strong>active during the test</strong> for proctoring.</li>
            <li>🚫 Do <strong>not switch tabs</strong> or minimize the window.</li>
            <li>👤 Stay <strong>visible in the camera</strong> at all times.</li>
            <li>📶 Ensure a <strong>stable internet connection</strong> before starting.</li>
            <li>✏️ You can navigate between questions and <strong>change answers</strong> before submitting.</li>
          </ul>

          {cameraError && (
            <div
              style={{
                background: "#fff3cd",
                border: "1px solid #ffc107",
                borderRadius: 8,
                padding: "10px 14px",
                marginBottom: 16,
                fontSize: 13,
                color: "#856404",
              }}
            >
              ⚠️ {cameraError}
            </div>
          )}

          <button
            className="start-btn"
            onClick={handleStartTest}
            disabled={!cameraReady || loading}
            style={{
              opacity: cameraReady && !loading ? 1 : 0.6,
              cursor: cameraReady && !loading ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {loading ? (
              <>
                <span
                  style={{
                    width: 16, height: 16,
                    border: "3px solid rgba(255,255,255,0.4)",
                    borderTop: "3px solid #fff",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                Generating Test...
              </>
            ) : (
              "🚀 Start Test"
            )}
          </button>

          {loading && (
            <p style={{ marginTop: 12, fontSize: 13, color: "#6a5cff" }}>
              ⏳ AI is generating 30 questions based on job skills...
            </p>
          )}
        </div>

        {/* Right: Camera */}
        <div style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f5f6fa" }}>
          <div className="camera-box" style={{ position: "relative", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="webcam"
            />
            <div
              style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "rgba(0,0,0,0.55)", color: "#fff",
                textAlign: "center", padding: "8px",
                fontSize: 13,
              }}
            >
              {cameraReady && !cameraError ? "📷 Camera Active — Proctoring Ready" : "📷 Camera Preview"}
            </div>
          </div>

          <p style={{ marginTop: 16, fontSize: 13, color: "#777", textAlign: "center" }}>
            Make sure your face is clearly visible before starting.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default Instructions;
