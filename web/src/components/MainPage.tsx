import React, { useEffect, useState } from "react";
import WordList from "./WordList";
import WordSearch from "./WordSearch/WordSearch";

const MainPage: React.FC = () => {
  const [words, setWords] = useState(["Book", "Book", "Book"]);

  return (
    <>
      <div className="word-list-container">
        <WordSearch setWords={setWords} />
      </div>
      <div className="word-list-container2">
        <WordList words={words} />
      </div>
    </>
  );
};

export default MainPage;
