import React from "react";
import TeamPage from "./TeamPage";

const artform = [
  {
    video: {
      instagram:
        "https://www.instagram.com/reel/C-sehqFSLGF/?igsh=MW1uYnpwenFtbDZudQ==",
    },
    artist: "Dance Team",
    team: "",
  },
  {
    video: {
      instagram:
        "https://www.instagram.com/reel/C3dP0BbPIRL/?igsh=MXN5aTdjd29ibjhwZg==",
    },
    artist: "Dance Team",
    team: "",
  },
  {
    video: {
      instagram:
        "https://www.instagram.com/reel/CxS1t4UNqLn/?igsh=dDZibngyNm1hY2Fp",
    },
    artist: "Dance Team",
    team: "",
  },
];

export default function DanceTeam() {
  return (
    <TeamPage
      heading="Dance Team"
      description="TThe Dance Team at WCE Art Circle is a powerhouse of energy, rhythm, and passion. With every move, they captivate the audience, blending grace and precision in their performances. From classical to contemporary, their versatility shines through, as they bring stories to life through dance. The team's dedication to practice and innovation ensures that each performance is a mesmerizing experience. Whether performing in college events or representing WCE on bigger stages, the Dance Team is known for their unity, creativity, and electrifying presence. They are the soul of every celebration, turning movement into magic."
      artform={artform}
    />
  );
}
