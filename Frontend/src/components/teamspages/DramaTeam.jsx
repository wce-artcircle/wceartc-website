import React from "react";
import TeamPage from "./TeamPage";

const artform = [
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/drama/Drama_winners.png",
    artist: "Quest Runner-up 2024",
    social: "",
  },
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/drama/Quest%20Runnerup_Drama.png",
    artist: "Quest Runner-up 2024",
    social: "",
  },
  {
    video: {
      youtube: "https://www.youtube.com/embed/pfPLvJDetK8?si=ICQHCaCpZo4v9dHy",
    },
    artist: "GIM 2023",
    social: "",
  },
];

export default function DramaTeam() {
  return (
    <TeamPage
      heading="Drama Team"
      description="The Drama Team at WCE Art Circle is a dynamic group of storytellers, bringing emotions and narratives to life on stage. Known for their powerful performances and compelling scripts, they skillfully blend humor, drama, and social commentary into their plays. With each act, they captivate the audience, leaving a lasting impact through their portrayal of characters and situations. The team’s passion for theater and dedication to their craft shine in every production, whether it’s a lighthearted comedy or a thought-provoking drama. Their creativity and teamwork make them a cornerstone of the Art Circle, delivering unforgettable theatrical experiences."
      artform={artform}
    />
  );
}
