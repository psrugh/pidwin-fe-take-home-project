import Tiles from './Tiles/Tiles';
import GameKeyboard from './GameKeyboard/GameKeyboard';
import Button from '../../ui/Button/Button';
import {useState, useEffect} from 'react';
import styles from './GameBoard.module.css';

const rowLength = 5;
const numRows = 6;
const maxRowIdx = numRows - 1;

function getEmptyRow() {
  return new Array(rowLength).fill('');
}

async function fetchGuessResult(word) {
  const res = await fetch(`http://localhost:5001/api/word?guess=${word}`);
  return await res.json();
}

function GameBoard() {
  const [gameStatus, setGameStatus] = useState('active');
  const [guesses, setGuesses] = useState(new Array(numRows).fill(getEmptyRow()));
  const [guessResults, setGuessResults] = useState(
    new Array(numRows).fill(getEmptyRow()),
  );
  const [guess, setGuess] = useState('');
  const [activeRowIdx, setActiveRowIdx] = useState(0);

  async function guessWord() {
    if (guess.length < rowLength) {
      return;
    }
    const apiGuessResult = await fetchGuessResult(guess);
    if (apiGuessResult.success) {
      const localGuessResults = [...guessResults];
      localGuessResults[activeRowIdx] = apiGuessResult.result.split('');
      setGuessResults(localGuessResults);
      if (apiGuessResult.result === '11111') {
        setGameStatus('pass');
      } else if (activeRowIdx === maxRowIdx) {
        setGameStatus('fail');
      } else {
        setGuess('');
        setActiveRowIdx((prevState) => {
          return prevState + 1;
        });
      }
    }
  }

  useEffect(() => {
    console.log(guess)
    const guessRow = getEmptyRow();
    const currentGuesses = [...guesses];
    if(currentGuesses[activeRowIdx].join('') !== guess) {
      for (let i = 0; i < rowLength; i++) {
        guessRow[i] = guess[i] || '';
      }
      currentGuesses[activeRowIdx] = guessRow;
      setGuesses(currentGuesses);
    }
  }, [guess, guesses, activeRowIdx]);

  return (
    <div className={styles.gameBoard}>
      <section className={styles.tiles}>
        <Tiles
          guesses={guesses}
          guessResults={guessResults}
        />
      </section>
      {gameStatus === 'active' ? (
        <Button
          guessWord={guessWord}
          disabledButton={guess.length < maxRowIdx}
        >
          Guess Word
        </Button>
      ) : null}
      <section className={styles.keyboard}>
        <GameKeyboard
          setGuess={setGuess}
          guessWord={guessWord}
          guessResults={guessResults}
          gameStatus={gameStatus}
        />
      </section>
    </div>
  );
}

export default GameBoard;
