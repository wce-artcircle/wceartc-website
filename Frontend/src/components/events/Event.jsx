import React, { useState, useEffect } from "react";
import "./events.css";
import "./events.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const Event = ({ idx, Name, date, description, icon, register }) => {
  const [descp, setDescp] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [truncatedDescription, setTruncatedDescription] = useState("");
  useEffect(() => {
    setTruncatedDescription(description.slice(0, 50) + "...");
  }, [description]);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div className="event">
        <div className="event-image">
          <img src={icon} alt="" />
        </div>
        <div className="event-info">
          <h1 className="rainbow-text">{Name}</h1>
          <p>{truncatedDescription}</p>
          <div className="buttons">
            <button className="btn" onClick={() => setDescp(true)}>
              Read More
            </button>
            {register && (
              <a href={register} target="_blank" rel="noreferrer">
                <button className="btn">Register Now</button>
              </a>
            )}
          </div>
        </div>
      </div>
      

      {descp && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setDescp(false)}>
              &times;
            </span>
            <div
              className="event-descp"
              style={{
                display: isModalOpen ? "none" : "flex",
                flexDirection: isSmallScreen ? "column" : "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: isSmallScreen ? "0rem" : "20rem",
                gap: isSmallScreen ? "1rem" : "10rem",
                fontSize: isSmallScreen ? "4rem" : "1rem",
                fontWeight: isSmallScreen ? "normal" : "bold",
              }}
            >
              <div className="event-image">
                <img
                  src={icon}
                  alt=""
                  onClick={toggleModal}
                  style={{ borderRadius: "0.7rem" }}
                />
              </div>
              <div className="event-info">
                {idx === 1 && (
                  <button className="rainbow-text2">
                    <a
                      href="https://drive.google.com/file/d/1QWBCFOCWWI7yo0hUFoSM9n9c0WvorNDj/view?usp=sharing"
                      target="_blank"
                      rel="noreferrer"
                    >
                      ✨ View RuleBook ✨{" "}
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </a>
                  </button>
                )}
                <h1 className="rainbow-text1" style={{ marginTop: "0.8rem" }}>
                  {Name}
                </h1>
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal1" onClick={toggleModal}>
          <span className="close1">&times;</span>
          <img className="modal1-content" src={icon} alt={Name} />
          <div className="modal1-caption">{Name}</div>
        </div>
      )}
    </div>
  );
};

export default Event;
