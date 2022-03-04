import {useState} from 'react';

const AddForm = () => {

    const [word, setWord] = useState("");

    const wordUpdate = (event) => {
        setWord(event.target.value);
    }

    const handleSubmit = async () => {
        fetch('http://localhost:5000/word', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                word: word
            })})
              .then(() => console.log('you added form data!'));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>単語を追加</label>
                <input required onChange={wordUpdate}></input>
                <button type='submit'>追加</button>
            </form>
        </div>
    );
};

export default AddForm;