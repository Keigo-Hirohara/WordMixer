import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AddForm from "./AddForm";
import WordsList from "./WordsLlist";

const Word = () => {
  const [words, setWords] = useState([]);

  const fetchWordData = () => {
    fetch("http://localhost:5000/word")
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          // const wordItems = JSON.stringify(data);
          setWords(data);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
