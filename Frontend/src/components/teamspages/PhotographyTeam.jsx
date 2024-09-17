import React from "react";
import TeamPage from "./TeamPage";

const artform = [
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/photography/sarade_arpit_1.jpg",
    artist: "Sarade Arpit",
    social: undefined,
  },
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/photography/sarade_arpit_2.jpg",
    artist: "Sarade Arpit",
    social: undefined,
  },
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/photography/sarade_arpit_5.jpg",
    artist: "Sarade Arpit",
    social: undefined,
  },
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/photography/sarade_arpit_3.jpg",
    artist: "Sarade Arpit",
    social: undefined,
  },
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/photography/sarade_arpit_4.jpg",
    artist: "Sarade Arpit",
    social: undefined,
  },

  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/photography/sarade_arpit_6.jpg",
    artist: "Sarade Arpit",
    social: undefined,
  },
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/photography/sarade_arpit_7.jpg",
    artist: "Sarade Arpit",
    social: undefined,
  },
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/photography/sarade_arpit_8.jpg",
    artist: "Sarade Arpit",
    social: undefined,
  },
];

export default function ContentTeam() {
  return (
    <TeamPage
      heading="Photography and Editing Team"
      description="The Photography and Editing Team at WCE Art Circle is the heartbeat behind capturing the essence of every event. With their keen eye for detail and timing, they skillfully document each moment, preserving the vibrancy and energy of the Art Circle's activities. From candid shots to perfectly framed highlights, they ensure that every event is immortalized through their lenses. Their expertise doesn't end with photography; the team also excels in editing, enhancing each image to reflect the true spirit of the occasion. Dedicated and creative, they play a pivotal role in bringing the Art Circle’s memories to life."
      artform={artform}
    />
  );
}
