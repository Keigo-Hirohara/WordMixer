import React from 'react';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from './Components/login/Login';
import Idea from './Components/idea/Idea';
import Word from './Components/word/Word';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' exact element={<Login/>}/>
                <Route path='/idea' exact element={<Idea/>}/>
                <Route path='/word' exact element={<Word/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;