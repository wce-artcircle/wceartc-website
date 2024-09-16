import React from "react";
import TeamPage from "./TeamPage";
// import sketch1 from "../../asset/ayush_borkar_sketch1.jpg";
// import sketch2 from "../../asset/ayush_borkar_sketch2.jpg";

const artform = [
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/art-deco/ayush_borkar_sketch1.jpg",
    artist: "Ayush Borkar",
    social: "https://www.instagram.com/sketch_diary_0014/",
  },
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/art-deco/ayush_borkar_sketch2.jpg",
    artist: "Ayush Borkar",
    social: "https://www.instagram.com/sketch_diary_0014/",
  },
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/art-deco/ishwar_raut_1.jpg",
    artist: "Ishwar Raut",
    social: "https://www.instagram.com/ishwar_224466/",
  },
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/art-deco/ishwar_raut_2.jpg",
    artist: "Ishwar Raut",
    social: "https://www.instagram.com/ishwar_224466/",
  },
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/art-deco/ishwar_raut_3.jpg",
    artist: "Ishwar Raut",
    social: "https://www.instagram.com/ishwar_224466/",
  },
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/art-deco/ishwar_raut_4.jpg",
    artist: "Ishwar Raut",
    social: "https://www.instagram.com/ishwar_224466/",
  },
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/art-deco/ayush_borkar_sketch3.jpg",
    artist: "Ayush Borkar",
    social: "https://www.instagram.com/sketch_diary_0014/",
  },
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/art-deco/ayush_borkar_sketch4.jpg",
    artist: "Ayush Borkar",
    social: "https://www.instagram.com/sketch_diary_0014/",
  },
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/art-deco/ayush_borkar_sketch5.jpg",
    artist: "Ayush Borkar",
    social: "https://www.instagram.com/sketch_diary_0014/",
  },
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/art-deco/ayush_borkar_sketch6.jpg",
    artist: "Ayush Borkar",
    social: "https://www.instagram.com/sketch_diary_0014/",
  },
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/art-deco/ayush_borkar_sketch7.jpg",
    artist: "Ayush Borkar",
    social: "https://www.instagram.com/sketch_diary_0014/",
  },
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/art-deco/ayush_borkar_sketch8.jpg",
    artist: "Ayush Borkar",
    social: "https://www.instagram.com/sketch_diary_0014/",
  },
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/art-deco/ayush_borkar_sketch9.jpg",
    artist: "Ayush Borkar",
    social: "https://www.instagram.com/sketch_diary_0014/",
  },
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/art-deco/ayush_borkar_sketch10.jpg",
    artist: "Ayush Borkar",
    social: "https://www.instagram.com/sketch_diary_0014/",
  },
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/art-deco/ayush_borkar_sketch11.jpg",
    artist: "Ayush Borkar",
    social: "https://www.instagram.com/sketch_diary_0014/",
  },
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/art-deco/ayush_borkar_sketch12.jpg",
    artist: "Ayush Borkar",
    social: "https://www.instagram.com/sketch_diary_0014/",
  },
  {
    image:
      "https://raw.githubusercontent.com/wce-artcircle/Assets/main/art-deco/ayush_borkar_sketch13.jpg",
    artist: "Ayush Borkar",
    social: "https://www.instagram.com/sketch_diary_0014/",
  },
];

export default function ArtDecoTeam() {
  return (
    <TeamPage
      heading="Art and Decoration Team"
      description="The Art and Deco team at WCE Art Circle is a vibrant collective of talented students who bring creativity and passion to every project. With an eye for detail and a flair for innovation, the team transforms ideas into stunning visual experiences. From intricate decorations to bold artistic expressions, they excel in crafting an atmosphere that captivates the senses. Whether working on campus events or showcasing their individual talents, the Art and Deco team embodies the spirit of imagination, turning every space into a work of art. Their dedication and artistry make them a standout force in the creative community at WCE."
      artform={artform}
    />
  );
}
