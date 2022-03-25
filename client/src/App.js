import {useEffect, useState} from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Idea from "./Components/idea/Idea";
import IdeaDetail from "./Components/idea/ideaDetail/IdeaDetail";
import Word from "./Components/word/Word";
import Navigationbar from "./Components/Navbar";
import Register from "./Components/user/Register";
import Login from "./Components/user/Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("v1/isUserAuth", {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          })
            .then((res) => res.json())
            .then((data) => (data.isLoggedIn ? setIsLoggedIn(true) : setIsLoggedIn(false)))
            .catch((err) => {
              console.log(err);
            });
    console.log(isLoggedIn)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter>
      <Navigationbar />
      <Routes>
        <Route path="/register" exact element={<Register/>} />
        <Route path="/login" exact element={<Login/>} />
        <Route path="/idea" exact element={<Idea />} />
        <Route path="/idea/:id" exact element={<IdeaDetail />} />
        <Route path="/word" exact element={<Word />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
