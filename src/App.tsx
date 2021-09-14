import React, {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import "./App.css";
import minecraft from "./minecraft.svg";

const wordValueLookup: Record<string, number> = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
};

export const getWordValue = (word: string) => {
  return [...word].reduce(
    (acc: number, letter: keyof typeof wordValueLookup) => {
      return acc + wordValueLookup[letter];
    },
    0
  );
};

function App() {
  const [cents, setCents] = useState(0);
  const [word, setWord] = useState("");
  const updateWord: ChangeEventHandler<HTMLInputElement> = (e) => {
    setWord(e.target.value);
  };
  const calculateValue: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCents(getWordValue(word));
  };

  const [wordListUrl, setWordListUrl] = useState(
    "https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json"
  );
  const updateUrl: ChangeEventHandler<HTMLInputElement> = (e) => {
    setWordListUrl(e.target.value);
  };

  const [list, setList] = useState<string[]>([]);
  const handleUrlForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    fetchUrl();
  };
  const fetchUrl = useCallback(async () => {
    const json = await (await fetch(wordListUrl)).json();
    const listOfWordsEqualingA100Cents = Object.keys(json).filter(
      (word) => getWordValue(word) === 100
    );
    setList(listOfWordsEqualingA100Cents);
  }, [wordListUrl]);
  useEffect(() => {
    fetchUrl();
  }, [fetchUrl]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={minecraft} className="App-logo" alt="logo" />
        <h1>Enter a word!</h1>
        <form onSubmit={calculateValue}>
          <input type="text" value={word} onChange={updateWord} />
        </form>
        <p>Value: {cents} </p>
      </header>
      <h2>{list.length} $1 Words</h2>
      <form onSubmit={handleUrlForm}>
        <input type="text" value={wordListUrl} onChange={updateUrl} />
      </form>
      <div className="word-list">
        {list.map((word) => {
          return (
            <div className="word" key={word}>
              {word}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
