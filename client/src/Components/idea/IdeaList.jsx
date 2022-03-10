import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IdeaList = (props) => {

    const navigate = useNavigate();

    const navigateToDetail = (id, ideaTitle) => {
        navigate(`/idea/${id}`, {state: {title: ideaTitle}});
    }

  useEffect(() => {
      let isMounted = true;
    props.update(isMounted);
    return () => {isMounted = false}
  }, [props]);

  const deleteIdea = (ideaId) => {
    fetch(`http://localhost:5000/idea/${ideaId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(props.update());
  };

  return (
    <ul>
      {Object.keys(props.ideas).map((d, index) => {
        return (
          <li key={index}>
            {props.ideas[d].idea}
            <p>{props.ideas[d].desc}</p>
            <button onClick={() => deleteIdea(props.ideas[d]._id)}>
                削除
            </button>
            <button onClick={() => {navigateToDetail(props.ideas[d]._id, props.ideas[d].idea)}}>詳細ページ</button>
            {/* <Link to={`/idea/${props.ideas[d]._id}`} title={props.ideas[d].idea}>詳細ページ({props.ideas[d].idea})</Link> */}
          </li>
        );
      })}
    </ul>
  );
};

export default IdeaList;
