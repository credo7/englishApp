import { useState } from "react";
import styled from "styled-components";
import { IpropsSearch } from "../../types/props";
import HeadSearch from "./headSearch";
import WordInformation from "./WordInformation";

const Container = styled.div`
  margin-top: 50px;
  background-color: white;
  width: 100%;
  min-width: 350px;
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(38, 33, 61, 0.2);
  padding: 20px 50px;
  box-sizing: border-box;
`;

const WordSearch = ({ setWords }: IpropsSearch) => {
  const [isSearchOn, setIsSearchOn] = useState(false);
  const [labelWord, setLabelWord] = useState("Sample");

  return (
    <Container>
      <HeadSearch
        labelWord={labelWord}
        setLabelWord={setLabelWord}
        setIsSearchOn={setIsSearchOn}
      />
      {isSearchOn && (
        <WordInformation labelWord={labelWord} setLabelWord={setLabelWord} setWords={setWords} />
      )}
    </Container>
  );
};

export default WordSearch;
