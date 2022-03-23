import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddForm from "./AddForm";
import WordsList from "./WordsLlist";

const Word = () => {
  const navigate = useNavigate();

  const [words, setWords] = useState([]);

  const fetchWordData = () => {
    // let cancel = false;
    fetch("http://localhost:5000/v1/word", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          // if (cancel) return;
          setWords(data);
        });
      })
      .catch((err) => {
        console.error(err);
      });
    // return () => {
    //   cancel = true;
    // }
  };

  useEffect(() => {
    fetch("http://localhost:5000/v1/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => (data.isLoggedIn ? null : navigate("/login")))
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  return (
    <>
      <AddForm
        update={() => {
          fetchWordData();
        }}
      />
      <WordsList
        update={() => {
          fetchWordData();
        }}
        words={words}
      />
    </>
  );
};

export default Word;
