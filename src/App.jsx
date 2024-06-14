import { useState, useRef, useEffect } from 'react';

import {
  getNumofChars,
  getNumofWords,
  getNumofPronouns,
  getNumofParagraphs,
  getNumofSentences,
  getLongestWord,
  getReadTime,
  isOverXLimit,
} from './calculations'

import './App.css';

function App() {
  const [charLength, setCharLength] = useState(0);
  const [wordLength, setWordLength] = useState(0);
  const [pronounsLength, setPronounsLength] = useState(0);
  const [numofSentences, setNumofSentences] = useState(0);
  const [numofParagraphs, setNumofParagraphs] = useState(0);
  const [longestWord, setLongestWord] = useState('');
  const [readTime, setReadTime] = useState('');
  const [xLimitCheck, setXLimitCheck] = useState(false);

  const inputRef = useRef('');

  

  function updateSpecs(inputValue) {

    const str = inputValue;
    setCharLength(getNumofChars(str));
    setWordLength(getNumofWords(str));
    setPronounsLength(getNumofPronouns(str));
    setNumofSentences(getNumofSentences(str));
    setNumofParagraphs(getNumofParagraphs(str));
    setLongestWord(getLongestWord(str));
    setReadTime(getReadTime(str));
    setXLimitCheck(isOverXLimit(charLength));
  }

  /* focus on input field on page render */
  useEffect(() => {
    inputRef.current.value = '';
    inputRef.current.focus();
  }, []);

  return (
    <>
      <div>No. of Characters {charLength}</div>
      <div>No. of Words {wordLength}</div>
      <div>Longest Word {longestWord}</div>
      <div>No. of Pronouns {pronounsLength}</div>
      <div>No. of Sentences {numofSentences}</div>
      <div>No. of Paragraphs {numofParagraphs}</div>
      <div>Time to Read Msg {readTime}</div>
      <div>Over X Limit {xLimitCheck ? 'yes' : 'no'}</div>
      <div>
        <label htmlFor="">
          <textarea
            rows="8"
            columns="80"
            style={{ width: '300px' }}
            ref={inputRef}
            onChange={() => updateSpecs(inputRef.current.value)}
          />
        </label>
      </div>
    </>
  );
}

export default App;
