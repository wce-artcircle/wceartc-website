import React, { useState } from "react";
import "./Artpiece.css";
import { InstagramEmbed, YoutubeEmbed } from "react-social-media-embed";

function Artpiece({ artpiece }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="artpiece-container">
      {artpiece.video ? (
        artpiece.video.youtube ? (
          <div className="artpiece-video">
            <iframe
              src={artpiece.video.youtube}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={artpiece.title}
            ></iframe>
          </div>
        ) : (
          <div className="artpiece-video">
            <InstagramEmbed url={artpiece.video.instagram} />
          </div>
        )
      ) : (
        <div className="artpiece-card" onClick={toggleModal}>
          <img src={artpiece.image} alt={artpiece.artist} />
          <h3>{artpiece.artist}</h3>
          {artpiece.social && (
            <p>
              <a
                href={artpiece.social}
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow on Social Media
              </a>
            </p>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className="modal" onClick={toggleModal}>
          <span className="close">&times;</span>
          <img
            className="modal-content"
            src={artpiece.image}
            alt={artpiece.artist}
          />
          <div className="modal-caption">{artpiece.artist}</div>
        </div>
      )}
    </div>
  );
}

export default Artpiece;
