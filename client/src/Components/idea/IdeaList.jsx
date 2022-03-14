import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card } from "react-bootstrap";

const IdeaList = (props) => {
  const navigate = useNavigate();

  const navigateToDetail = (idea) => {
    navigate(`/idea/${idea._id}`, {
      state: { title: idea.idea, description: idea.desc },
    });
  };

  useEffect(() => {
    props.update();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const deleteIdea = (ideaId) => {
    fetch(`http://localhost:5000/v1/idea/${ideaId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        props.update();
      });
  };

  return (
    <div style={{ margin: "2rem" }}>
      {Object.keys(props.ideas).map((d, index) => {
        return (
          <Card key={index} style={{ marginBottom: "2rem" }}>
            <Card.Header>
              {props.ideas[d].idea}
              <div style={{ float: "right" }}>
                <Button
                  style={{ marginRight: "1rem" }}
                  variant="outline-primary"
                  onClick={() => {
                    navigateToDetail(props.ideas[d]);
                  }}
                >
                  詳細ページ
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => deleteIdea(props.ideas[d]._id)}
                >
                  削除
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Title>{props.ideas[d].desc}</Card.Title>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default IdeaList;
