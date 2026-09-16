import React, { useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  const fetchMessage = async () => {
    try {
      const response = await fetch("http://localhost:8000/message");
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error fetching message:", error);
      setMessage("Failed to fetch message");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>FastAPI + React Demo</h1>
      <button onClick={fetchMessage}>Get Message</button>
      {message && <p style={{ marginTop: "20px", fontSize: "1.2em" }}>{message}</p>}
    </div>
  );
}

export default App;
