import { useEffect, useState } from "react";
import axios from 'axios';

const WordsList = () => {
  const [words, setWords] = useState([]);

//   fetch(`${API_URL}/word`).then((res) => {
//       res.json().then((data) => {
//           const wordItems = JSON.stringify(data);
//           setWords(wordItems);
//       })
//   }).catch((err) => {
//       console.error(err);
//   })

//   const getWords = useCallback(async () => {
//     const fetchedWords = await httpGetAllWords();
//     setWords(fetchedWords);
//   }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/word')
        .then(res => {
            console.log(Object.values(res.data[0]));
            setWords(Object.values(res.data.Object[1]));
        })
  }, []);
//   console.log(words);
  return <ul>{words}</ul>;
};

export default WordsList;
