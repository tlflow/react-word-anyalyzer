import { useState, useRef, useEffect } from 'react';
import { pronouns } from './pronouns';
import './App.css';

function App() {
  const [charLength, setCharLength] = useState(0);
  const [wordLength, setWordLength] = useState(0);
  const [pronounsLength, setPronounsLength] = useState(0);
  const [longestWord, setLongestWord] = useState('');
  const [readTime, setReadTime] = useState('');

  const inputRef = useRef('');

  function getCharLength(str) {
    setCharLength(str.length);
  }

  function getWordLength(str) {
    const words = str.match(/\S+/g);

    if (words.length !== 0) {
      setWordLength(words.length);
    } else {
      setWordLength(0);
    }
  }

  function getPronounsLength(str) {
    const norm_prn = pronouns.map((prn) => prn.toLowerCase());
    const norm_str = str.toLowerCase();

    const locatedPronouns = norm_str.match(
      new RegExp(`\\b(${norm_prn.join('|')})\\b`, 'g')
    );
    setPronounsLength(locatedPronouns.length);
  }

  function getLongestWord(str) {
    const words = str.match(/\S+/g);

    if (words.length !== 0) {
      const longest = words.reduce((a, b) => (a.length >= b.length ? a : b));
      setLongestWord(longest);
    } else {
      setWordLength('');
    }
  }

  function getReadTime(str) {
    const words = str.match(/\S+/g);
    /* avg reading time is 185 words per minute */
    const avgReadingTime = 185 / 60;

    if (words.length !== 0) {
      const timeInSeconds = words.length / avgReadingTime;
      const timeString = `${(timeInSeconds / 60) | 0} mins and ${
        timeInSeconds % 60 | 0
      } secs`;
      setReadTime(timeString);
    } else {
      setReadTime('');
    }
  }

  function updateSpecs(inputValue) {
    getCharLength(inputValue);
    getWordLength(inputValue);
    getLongestWord(inputValue);
    // getPronounsLength(inputValue);
    getReadTime(inputValue);
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
      <div>Time to Read Msg {readTime}</div>
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
