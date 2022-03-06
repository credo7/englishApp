import "./index.scss";
import React, { useEffect, useState } from "react";
import WordList from "../../components/WordList";
import Search from "../../components/WordSearch";
import { getWords } from "../../api/words";
import { getToken } from "../../utils/token";
import axios from "axios";

const Main: React.FC = () => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const words = await getWords();
      setWords(words);
    }
    fetchData();
  }, []);

  const foo = async () => {
    const config = {
      headers: { Authorization: `Bearer ${getToken()}` }
  };
  
  const bodyParameters = {
     key: "value"
  };
    const r = await axios.post("http://localhost:3001/auth/refresh", bodyParameters,
    config);

    console.log(r.data);
  };

  return (
    <>
      <div className="main">
        <button
          onClick={() => {
            foo();
          }}
        >
          Click me
        </button>
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
