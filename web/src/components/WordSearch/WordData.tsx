import React from "react";
import { useSelector } from "react-redux";
import { addWord } from "../../api/words";
import { RootState } from "../../store/reducers";
import { capitalizeFirstLetter } from "../functions";

const WordData = ({ labelWord, setWords, setLabelWord }: any) => {
  const state = useSelector((state: RootState) => state.currentWord);

  const onClickHandler =
    (labelWord: string, setWords: Function, setLabelWord: Function) =>
    (e: React.MouseEvent<HTMLElement>) => {
      if (labelWord !== "") {
        setWords((prev: string[]) => [...prev, labelWord]);
        addWord(labelWord.toLowerCase());
      }
      setLabelWord("");
    };

  const playSound = (url: string) => (e: React.ChangeEvent<any>) => {
    const sound = new Audio(url);
    if (!url) {
      return <div>ERROR</div>
    }
    sound.play();
  };

  return (
    <div id="result" className="result">
      <div className="word">
        <h3>{state.word}</h3>
        <button id="sound-button" onClick={playSound(state.audioURL)}>
          <i className="fas fa-volume-up"></i>
        </button>
      </div>
      <div className="details">
        <p>pos</p>
        <p>/{state.transcription}/</p>
      </div>
      <p className="word-meaning">{capitalizeFirstLetter(state.meaning)}</p>
      <div className="example-and-word">
        {state.example ? (
          <p className="word-example">{capitalizeFirstLetter(state.example)}</p>
        ) : null}
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

export default WordData;
