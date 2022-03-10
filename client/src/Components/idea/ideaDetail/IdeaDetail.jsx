import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const IdeaDetail = (props) => {
    const [pageTitle, setPageTitle] = useState('');
    const [description, setDescription] = useState('');

    const id = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const textUpdate = (event) => {
        setDescription(event.target.value);
        console.log(description);
    }

    const handleClick = () => {
        fetch(`http://localhost:5000/idea/${id.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idea: pageTitle,
                desc: description
            })
        }).then(() => {
            console.log('You updated idea!')
            // navigate('/idea');
        })
        setDescription('');

    }

    useEffect(() => {
        setPageTitle(location.state.title);
        console.log(id.id);
        console.log(location.state.title);
    }, [id.id, location.state.title]);
    return (
        <div>
            <h2>タイトル: {pageTitle}</h2>
            <textarea onChange={textUpdate} value={description}></textarea>
                <button onClick={() => { handleClick()}}>保存</button>
                <button onClick={() => {navigate('/idea')}}>戻る</button>
        </div>
    );
};

export default IdeaDetail;