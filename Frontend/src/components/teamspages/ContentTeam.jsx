import React from "react";
import TeamPage from "./TeamPage";

const artform = [
  // {
  //   image: "",
  //   artist: "",
  //   social: "",
  // },
];

export default function ContentTeam() {
  return (
    <TeamPage
      heading="Content Team"
      description="The Content Team at WCE Art Circle is the voice and script behind every successful event. With their impeccable anchoring skills, they guide the flow of programs, engaging the audience and setting the perfect tone for each occasion. From writing witty scripts to delivering smooth transitions, they ensure that every moment on stage feels seamless and captivating. Their creativity shines in crafting content that resonates with the theme of the event while keeping the audience entertained. Passionate and articulate, the Content Team plays a crucial role in making every event an unforgettable experience."
      artform={artform}
    />
  );
}
