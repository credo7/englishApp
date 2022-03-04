import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store/reducers";
import { SearchProps } from "../../types/props";
import Search from "./Search";
import WordData from "./WordData";

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

const WordSearch = ({ setWords }: SearchProps) => {
  const [labelWord, setLabelWord] = useState("");

  const isVisible = useSelector((state: RootState) => state.isVisibleWordPanel);

  return (
    <Container>
      <Search labelWord={labelWord} setLabelWord={setLabelWord} />
      {isVisible && (
        <WordData
          labelWord={labelWord}
          setLabelWord={setLabelWord}
          setWords={setWords}
        />
      )}
    </Container>
  );
};

export default WordSearch;
