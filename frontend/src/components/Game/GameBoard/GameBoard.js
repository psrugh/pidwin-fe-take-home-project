import Tiles from './Tiles/Tiles';
import GameKeyboard from './GameKeyboard/GameKeyboard';
import Button from '../../ui/Button/Button';
import { useState, useEffect } from 'react'
import styles from './GameBoard.module.css';

const rowLength = 5;
const numRows = 6;
const maxRowIdx = numRows - 1;
const emptyRow = new Array(rowLength).fill('');

async function fetchGuessResult(word) {
  const res = await fetch(`http://localhost:5001/api/word?guess=${word}`);
  return await res.json();
}

function GameBoard() {
  const [gameStatus, setGameStatus] = useState('active')
  const [guesses, setGuesses] = useState(new Array(numRows).fill(emptyRow));
  const [guessResults, setGuessResults] = useState(new Array(numRows).fill(emptyRow));
  const [guess, setGuess] = useState('');
  const [activeRowIdx, setActiveRowIdx] = useState(0)

  async function guessWord() {
    if(guess.length < rowLength) {
      return;
    }
    const apiGuessResult = await fetchGuessResult(guess);
    if(apiGuessResult.success) {
      const localGuessResults = [...guessResults]
      localGuessResults[activeRowIdx] = apiGuessResult.result.split('')
      setGuessResults(localGuessResults)
      if(apiGuessResult.result === '11111') {
        setGameStatus('pass')
      } else if(activeRowIdx === maxRowIdx) {
        setGameStatus('fail')
      } else {
        setGuess('');
        setActiveRowIdx((prevState) => {
          return prevState + 1;
        })
      }
    }
  }

  useEffect(() => {
    const guessRow = [...emptyRow]
    const currentGuesses = [...guesses];
    for(let i = 0; i < rowLength; i++) {
      guessRow[i] = guess[i] || ''
    }
    currentGuesses[activeRowIdx] = guessRow;
    setGuesses(currentGuesses)
  }, [guess])

  return (
    <div className={styles.gameBoard}>
      <section className={styles.tiles}>
        <Tiles guesses={guesses} guessResults={guessResults} />
      </section>
      {
        gameStatus === 'active' ? 
        <Button guessWord={guessWord} disabledButton={guess.length < maxRowIdx}>
          Guess Word
        </Button> : null
      }
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
