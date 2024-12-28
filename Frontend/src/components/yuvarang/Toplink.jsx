import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

function Toplink() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "30px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: "1000",
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        border: "3px solid #000000", // Initial border
        animation: "borderAnimation 2s infinite", // Apply animation
      }}
    >
      <a
        href="https://konfhub.com/yuvarang-2025"
        target="_blank"
        style={{
          color: "black",
          fontWeight: "bold",
        }}
        onMouseEnter={(e) => (e.target.style.color = "blue")}
        onMouseLeave={(e) => (e.target.style.color = "black")}
      >
        ✨ Register Now for Yuvarang 2025 ✨
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </a>
    </div>
  );
}

export default Toplink;

// Add this CSS to your stylesheet or a <style> tag in your component
const styles = `
@keyframes borderAnimation {
  0% {
    border-color: transparent;
  }
  50% {
    border-color: blue;
  }
  100% {
    border-color: transparent;
  }
}
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
