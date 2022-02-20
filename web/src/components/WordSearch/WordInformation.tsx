import React from "react";
import { addWord } from "../../api/words";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { capitalizeFirstLetter } from "../functions";

const WordInformation = ({ labelWord, setWords, setLabelWord }: any) => {
  const state = useTypedSelector((state) => state.word);

  const onClickHandler =
    (labelWord: string, setWords: Function, setLabelWord: Function) =>
    (e: React.MouseEvent<HTMLElement>) => {
      if (labelWord !== "") {
        setWords((prev: string[]) => [...prev, labelWord]);
        addWord(labelWord.toLowerCase());
      }
      setLabelWord("");
    };

  return (
    <div id="result" className="result">
      <div className="word">
        <h3>{state.word}</h3>
        <button id="sound-button">
          <i className="fas fa-volume-up"></i>
        </button>
      </div>
      <div className="details">
        <p>pos</p>
        <p>/{state.transcription}/</p>
      </div>
      <p className="word-meaning">{capitalizeFirstLetter(state.meaning)}</p>
      <div className="example-and-word">
        <p className="word-example">{capitalizeFirstLetter(state.example)}</p>
        <button
          onClick={onClickHandler(labelWord, setWords, setLabelWord)}
          className="add-button"
        >
          add
        </button>
      </div>
    </div>
  );
};

export default WordInformation;
