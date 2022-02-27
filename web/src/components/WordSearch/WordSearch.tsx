import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store/reducers";
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
  const [labelWord, setLabelWord] = useState("");

  const dispatch = useDispatch;

  const isVisible = useSelector((state: RootState) => state.isVisibleWordPanel);

  return (
    <Container>
      <HeadSearch
        labelWord={labelWord}
        setLabelWord={setLabelWord}
        setIsSearchOn={setIsSearchOn}
      />
      {isVisible && (
        <WordInformation
          labelWord={labelWord}
          setLabelWord={setLabelWord}
          setWords={setWords}
        />
      )}
    </Container>
  );
};

export default WordSearch;
