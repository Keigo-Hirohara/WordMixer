import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Form, Button, Alert } from "react-bootstrap";

const Register = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    if (form[0].value.length > 0 && form[1].value.length > 0) {
      const user = {
        username: form[0].value,
        password: form[1].value,
      };

      fetch("v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then(async (res) => {
          let createdUser = await res.json();
          if (!createdUser.user) {
            setErrorMessage(createdUser.message);
          } else {
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setErrorMessage("入力欄は必ず入力してください！");
    }
  };

  useEffect(() => {
    fetch("v1/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => (data.isLoggedIn ? navigate("/idea") : null))
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);
  return (
    // <form onSubmit={e => handleRegister(e)}>
    //     <input required type='text'/>
    //     <input required type='password'/>
    //     <button type='submit'>登録</button>
    // </form>
    <Card style={{ margin: "2rem" }}>
      <Card.Title style={{ margin: "1rem", textAlign: "center" }}>
        新規登録
      </Card.Title>
      <Card.Body>
        <Form onSubmit={(e) => handleRegister(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>ユーザーネーム</Form.Label>
            <Form.Control type="text" placeholder="email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>パスワード</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="outline-success" type="submit">
            登録
          </Button>
        </Form>
        {!errorMessage ? (
          <></>
        ) : (
          <Alert style={{ margin: "1rem" }} variant="danger">
            {errorMessage}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default Register;
