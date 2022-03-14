import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup, Button } from "react-bootstrap";

const WordsList = (props) => {
  const deleteItem = (wordId) => {
    fetch(`http://localhost:5000/word/${wordId}`, {
      method: "DELETE",
    })
      .then((res) => {
        res.json();
      })
      .then(() => {
        props.update();
      });
  };

  useEffect(() => {
    props.update();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <ListGroup style={{ margin: "0 2rem 0 2rem" }}>
      {Object.keys(props.words).map((d, index) => {
        return (
          <ListGroup.Item key={index}>
            {props.words[d].word}
            <Button
              style={{ float: "right" }}
              className="text-right"
              variant="outline-danger"
              onClick={() => deleteItem(props.words[d]._id)}
            >
              削除
            </Button>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default WordsList;
