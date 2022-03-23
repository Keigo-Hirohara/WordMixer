import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Form, Button, Alert } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    if (form[0].value.length > 0 && form[1].value.length > 0) {
      const user = {
        username: form[0].value,
        password: form[1].value,
      };

      await fetch("http://localhost:5000/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(async(res) => {
        const isValid = await res.json();
        if (isValid.invalid) {
            setErrorMessage(isValid.message);
        } else {
          localStorage.setItem("token", isValid.token);
          navigate("/idea");
        }
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      setErrorMessage('入力欄は必ず入力してください！');
    }

    
  };

  useEffect(() => {
    fetch("http://localhost:5000/v1/isUserAuth", {
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
    <Card style={{ margin: "2rem" }}>
      <Card.Title style={{margin: '1rem', textAlign: 'center'}}>ログイン</Card.Title>
      <Card.Body>
        <Form onSubmit={(e) => handleLogin(e)} >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>ユーザーネーム</Form.Label>
            <Form.Control type="text" placeholder="email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>パスワード</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="outline-primary" type="submit">
            ログイン
          </Button>
        </Form>
      </Card.Body>
      {!errorMessage ? (
          <></>
        ) : (
          <Alert style={{ margin: "1rem" }} variant="danger">
            {errorMessage}
          </Alert>
        )}
    </Card>
  );
};

export default Login;
