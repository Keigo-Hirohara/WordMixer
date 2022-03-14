import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Idea from "./Components/idea/Idea";
import IdeaDetail from "./Components/idea/ideaDetail/IdeaDetail";
import Word from "./Components/word/Word";
import Navigationbar from "./Components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navigationbar />
      <Routes>
        <Route path="/idea" exact element={<Idea />} />
        <Route path="/idea/:id" exact element={<IdeaDetail />} />
        <Route path="/word" exact element={<Word />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
