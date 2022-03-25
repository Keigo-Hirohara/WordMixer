import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";

const Navigationbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logout = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  useEffect(() => {
    fetch("v1/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) =>
        data.isLoggedIn ? setIsLoggedIn(true) : setIsLoggedIn(false)
      )
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>WordMixer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isLoggedIn ? (
                <>
                  <Nav.Link
                    onClick={() => {
                      navigate("/idea");
                    }}
                  >
                    アイデアを編集
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      navigate("/word");
                    }}
                  >
                    単語を編集
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      logout();
                    }}
                  >
                    ログアウト
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    ログイン
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    新規登録
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigationbar;
