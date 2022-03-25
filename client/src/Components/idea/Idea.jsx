import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import IdeaList from "./IdeaList";
import GenerateIdea from "./GenerateIdea";

const Idea = () => {
const navigate = useNavigate();

  const [ideas, setIdeas] = useState([]);

  const fetchIdeaData = () => {
    fetch("v1/idea", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      }})
      .then((res) => res.json())
      .then((data) => {
        setIdeas(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {  
    fetch("v1/isUserAuth", {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          })
            .then((res) => res.json())
            .then((data) => (data.isLoggedIn ? null : navigate("/login")))
            .catch((err) => {
              console.log(err);
            }); 
  }, [navigate])

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
