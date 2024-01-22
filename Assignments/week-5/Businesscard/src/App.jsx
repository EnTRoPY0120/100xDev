import { useState } from "react";
import { BusinessCard } from "../Components/BusinessCard.jsx";
function App() {
  const [card, setCard] = useState({});
  const cards = {
    name: "John Doe",
    description: "Web Developer",

    linkedin: "https://www.linkedin.com/in/johndoe/",
    twitter: "https://twitter.com/johndoe",

    interests: ["React", "JavaScript", "Web Development"],
    // Added optional "otherSocialMedia" property:
    otherSocialMedia: {
      label: "Github",
      url: "https://github.com/johndoe",
    },
  };

  console.log(cards);
  return (
    <div>
      <BusinessCard card={cards} />;
    </div>
  );
}

export default App;
