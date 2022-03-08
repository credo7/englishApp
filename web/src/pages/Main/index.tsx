import "./index.scss";
import React, { useContext, useEffect, useState } from "react";
import WordList from "../../components/WordList";
import Search from "../../components/WordSearch";
import { getWords } from "../../api/words";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Main: React.FC = () => {
  const { logged } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!logged) navigate("/login");

  const [words, setWords] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const words = await getWords();
      setWords(words);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="main">
        <div className="word-search-container">
          <Search setWords={setWords} />
        </div>
        <div className="word-list-container">
          <WordList words={words} />
        </div>
      </div>
    </>
  );
};

export default Main;
