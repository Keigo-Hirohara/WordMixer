import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import IdeaList from "./IdeaList";
import GenerateIdea from "./GenerateIdea";

const Idea = () => {
  const [ideas, setIdeas] = useState([]);

  const fetchIdeaData = () => {
    fetch("http://localhost:5000/idea")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIdeas(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
    <GenerateIdea
          update={() => {
            fetchIdeaData();
          }}
        />
      <IdeaList
        update={() => {
          fetchIdeaData();
        }}
        ideas={ideas}
      />
    </>
  );
};

export default Idea;
