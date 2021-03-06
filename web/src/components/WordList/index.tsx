import "./index.scss";
import { WordProps } from "../../types/props";

const WordList = ({ words }: WordProps) => {
  return (
    <>
      <h1>Words:</h1>
      <div className="words-list">
        <ul>
          {words.map((el, index) => {
            return <li key={index}>{el}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default WordList;
