import { useEffect } from "react";

const WordsList = (props) => {

  const deleteItem = (wordId) => {
    fetch(`http://localhost:5000/word/${wordId}`, {
      method: 'DELETE'})
      .then((res) => {res.json()})
      .then(() => {props.update()})
  }

  useEffect(() => {
    props.update();
    // console.log(words.length);
  }, [props]);
  return (
    <ul>
      {Object.keys(props.words).map((d, index) => {
        return <li key={index}>{props.words[d].word}<button onClick={() => deleteItem(props.words[d]._id)}>削除</button></li>;
      })}
    </ul>
  );
};

export default WordsList;
