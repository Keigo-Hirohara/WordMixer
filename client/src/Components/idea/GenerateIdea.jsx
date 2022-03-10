import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const GenerateIdea = (props) => {
  const [combineWord, setCombineWord] = useState([]);

  const randomWord = () => {
    fetch("http://localhost:5000/word/random")
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          setCombineWord(data);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addIdea = () => {
    fetch("http://localhost:5000/idea", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idea: `${combineWord[0].word} + ${combineWord[1].word}`,
        desc: "",
      }),
    }).then(() => props.update(true));
  };

  useEffect(() => {
    randomWord();
  }, []);

  return (
    <div>
      <h2>{combineWord[0] ? combineWord[0].word : "単語1未設定"}</h2>
      <h2>+</h2>
      <h2>{combineWord[1] ? combineWord[1].word : "単語1未設定"}</h2>
      <button onClick={() => randomWord()}>シャッフル</button>
      <button
        onClick={() => {
          addIdea();
        }}
      >
        保存
      </button>
    </div>
  );
};

export default GenerateIdea;
