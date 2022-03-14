import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Alert } from "react-bootstrap";

const GenerateIdea = (props) => {
  const [words, setWords] = useState([]);
  const [randomWordLeft, setRandomWordLeft] = useState("");
  const [randomWordRight, setRandomWordRight] = useState("");
  const [randomAvairable, setRandomAvailable] = useState(false);

  const randomWord = () => {
    setRandomWordLeft(
      words.length > 0
        ? words[Math.floor(Math.random() * words.length)].word
        : "単語未登録"
    );
    setRandomWordRight(
      words.length > 0
        ? words[Math.floor(Math.random() * words.length)].word
        : "単語未登録"
    );
  };

  const addIdea = () => {
    fetch("http://localhost:5000/idea", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idea: `${randomWordLeft ? randomWordLeft : "単語無し"} + ${
          randomWordRight ? randomWordRight : "単語無し"
        }`,
        desc: "詳細未入力",
      }),
    }).then(() => props.update());
  };

  const fetchWordData = () => {
    fetch("http://localhost:5000/word").then(async (res) => {
      const wordData = await res.json();
      if (wordData.length > 2) {
        setRandomAvailable(true);
      }
      setWords(wordData);
    });
  };

  useEffect(() => {
    fetchWordData();
  }, []);

  return (
    <Card style={{ margin: "2rem" }}>
      <Card.Body style={{ textAlign: "center" }}>
        <div style={{ margin: "3rem 0" }}>
          {randomAvairable ? (
            <>
              <h2 style={{ display: "inline" }}>{randomWordLeft}</h2>
              <h2 style={{ display: "inline", margin: "2rem" }}>+</h2>
              <h2 style={{ display: "inline" }}>{randomWordRight}</h2>
            </>
          ) : (
            <Alert variant="danger">単語を3つ以上選択してください!</Alert>
          )}
        </div>

        <div style={{ marginTop: "1rem" }}>
          <Button
            variant="outline-dark"
            style={{ marginRight: "1rem" }}
            onClick={() => {
              if (randomAvairable) {
                randomWord();
              }
            }}
          >
            シャッフル
          </Button>
          <Button
            variant="outline-success"
            onClick={() => {
              if (randomAvairable) {
                addIdea();
              }
            }}
          >
            保存
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default GenerateIdea;
