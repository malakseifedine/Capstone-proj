import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "../styles/GetStarted.css"; // Make sure this exists

const messages = [
  "Manage your Library with AI,"
    ,"Get Personalized Suggestions",
    "Smart Check-ins and Check-outs",
    "Get Book Recommendations from out chatbot",

];

function GetStarted() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0); // Message index
  const [subIndex, setSubIndex] = useState(0); // Character index
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index >= messages.length) return;

    const fullText = messages[index];
    const timeout = setTimeout(
      () => {
        if (!deleting && subIndex < fullText.length) {
          setSubIndex(subIndex + 1);
        } else if (deleting && subIndex > 0) {
          setSubIndex(subIndex - 1);
        } else if (!deleting && subIndex === fullText.length) {
          setTimeout(() => setDeleting(true), 1000);
        } else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % messages.length);
        }
        setText(fullText.substring(0, subIndex));
      },
      deleting ? 60 : 120
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      {/* Left Section */}
      <div className="left-section d-flex flex-column justify-content-center align-items-center p-4">
        <h1 className="typed-title mb-4">
          <span className="typewriter-text">{text}</span>
        </h1>

        <h3 className="mb-4">Some of Our Features!</h3>

        <div className="d-flex gap-3 justify-content-center feature-box-container">
          <div className="floating-box">
            <h5>💬 Smart AI Chatbot Support</h5>
            <p>Analyze your Library Manegment System with AI</p>
          </div>
          <div className="floating-box">
            <h5>🔍 Search Books </h5>
            <p>Search Books by title , author , or other fields</p>
          </div>
          <div className="floating-box">
            <h5>✍️ AI Book Recommendations</h5>
            <p>Get Book Recommendations from out chatbot</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section d-flex flex-column justify-content-center align-items-center text-white p-4">
        <h2 className="mb-4 text-center">Welcome to Bookie</h2>
       
        <Link to="/login" className="btn btn-outline-light w-50">
          log In
        </Link>
      </div>
    </div>
  );
}

export default GetStarted;