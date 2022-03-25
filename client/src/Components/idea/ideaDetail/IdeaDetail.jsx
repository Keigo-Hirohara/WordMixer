import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, InputGroup, FormControl } from "react-bootstrap";

const IdeaDetail = (props) => {
  const [pageTitle, setPageTitle] = useState("");
  const [description, setDescription] = useState("");

  const id = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const textUpdate = (event) => {
    console.log(event.target.value);
    setDescription(event.target.value);
  };

  const handleClick = (e) => {
    console.log(description);
    fetch(`v1/idea/${id.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idea: pageTitle,
        desc: description,
      }),
    }).then(async (res) => {

      console.log(await res.json())
    });
    e.preventDefault();
  };

  useEffect(() => {
    console.log(location);
    setPageTitle(location.state.title);
    setDescription(location.state.description);
  }, []);
  // location.state.description, location.state.title
  return (
    <Card style={{ margin: "2rem" }}>
      <Card.Header style={{ textAlign: "center", fontSize: "1.75rem" }}>
        {pageTitle}
      </Card.Header>
      <form onSubmit={handleClick}>
        <InputGroup>
          <InputGroup.Text>
            アイデアの詳細
          </InputGroup.Text>
          <FormControl
            style={{ height: "20rem" }}
            as="textarea"
            aria-label="With textarea"
            onChange={textUpdate}
            value={description}
          />
        </InputGroup>
        {/* <textarea required onChange={textUpdate} value={description}></textarea */}
        <div style={{ float: "right" }}>
          <Button variant="primary" size="lg" type="submit">
            保存
          </Button>
          <Button
            style={{ margin: "1rem" }}
            variant="outline-success"
            size="lg"
            onClick={() => {
              navigate("/idea");
            }}
          >
            戻る
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default IdeaDetail;
