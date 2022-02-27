import "./index.scss";
import React, { useEffect, useState } from "react";
import WordList from "../../components/WordList";
import WordSearch from "../../components/WordSearch/WordSearch";
import { getWords } from "../../api/words";

const Main: React.FC = () => {
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
        <div className="word-list-container">
          <WordSearch setWords={setWords} />
        </div>
        <div className="word-list-container2">
          <WordList words={words} />
        </div>
      </div>
    </>
  );
};

export default Main;
