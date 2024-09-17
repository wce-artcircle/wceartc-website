import React from "react";
import TeamPage from "./TeamPage";

const artform = [
  {
    video: {
      youtube: "https://www.youtube.com/embed/X4Z_NQv3cxE?si=K7v1ujjKjRwy6Ip7",
    },
    artist: "Yuva Mahotsav Performance",
    social: "",
  },
];

export default function BandTeam() {
  return (
    <TeamPage
      heading="Band Team"
      description="The Band Team at WCE Art Circle is a dynamic ensemble of musicians who bring rhythm and harmony to every performance. With a diverse repertoire that spans genres and styles, they create an energetic and engaging atmosphere at all events. Each member contributes their unique talents, blending melodies and beats to deliver powerful and memorable musical experiences. Their dedication to practice and performance ensures that every note resonates with precision and passion. Whether energizing the crowd at campus events or showcasing their skills on stage, the Band Team is the heartbeat of the Art Circle, making every occasion a celebration of music."
      artform={artform}
    />
  );
}
