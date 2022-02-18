import "./index.scss";
import React, { useState } from "react";
import WordList from "../../components/WordList";
import WordSearch from "../../components/WordSearch/WordSearch";

const Main: React.FC = () => {
  const [words, setWords] = useState(["Book", "Book", "Book"]);

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
