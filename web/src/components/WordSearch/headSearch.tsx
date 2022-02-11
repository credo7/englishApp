import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styled from "styled-components";
// import getWordData from "../../api/word-search";
import { fetchWord } from "../../store/action-creators/word";

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: baseline;
`;

const HeadSearch = ({ setWords, setIsSearchOn, labelWord, setLabelWord }: any): any => {
  const { register, watch, setValue } = useForm();

  const currentWord = watch("word");

  const addWord =
    (setWords: Function) => (e: React.ChangeEvent<HTMLFormElement>) => {
      const wordWithTrim = currentWord
        .trim()
        .replace(/^\w/, (c: string) => c.toUpperCase());
      e.preventDefault();
      setLabelWord(wordWithTrim);
      setValue("word", "");
      setIsSearchOn(true);
    };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWord(labelWord));
  }, [labelWord]);

  return (
    <Form onSubmit={addWord(setWords)}>
      <input placeholder="Type the word here" {...register("word")} />
      <button className="submit" type="submit">
        Search
      </button>
    </Form>
  );
};

export default HeadSearch;
