import {useState} from 'react';

import IdeaList from './IdeaList';
import GenerateIdea from './GenerateIdea';

const Idea = () => {
    const [ideas, setIdeas] = useState([]);

    const fetchIdeaData = (isMounted) => {
        fetch("http://localhost:5000/idea")
          .then((res) => {
            res.json().then((data) => {
                if (isMounted) {
                    setIdeas(data);
                }
            });
          })
          .catch((err) => {
            console.error(err);
          });
      };

    return (
        <div>
            hey ! this is a /idea route on client!
            <GenerateIdea update={fetchIdeaData}/>
            <IdeaList update={fetchIdeaData} ideas={ideas}/>
        </div>
    );
};

export default Idea;