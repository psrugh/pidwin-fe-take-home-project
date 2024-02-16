import Tiles from './Tiles';
import GameKeyboard from './GameKeyboard';
import Button from '../../ui/Button';
import { useState, useEffect } from 'react'
import styles from './styles.module.css';

const emptyRow = ['','','','','']
const maxRowIdx = 5;

function fetchGuessResult(word) {
  return fetch(`http://localhost:5001/api/word?guess=${word}`)
  .then((res) => {
    return res.json()
  })
}

function GameBoard() {
  const [gameStatus, setGameStatus] = useState('active')
  const [guesses, setGuesses] = useState(new Array(6).fill(emptyRow));
  const [guessResults, setGuessResults] = useState(new Array(6).fill(emptyRow));
  const [guess, setGuess] = useState('');
  const [activeRowIdx, setActiveRowIdx] = useState(0)

  async function guessWord() {
    if(guess.length < 5) {
      return;
    }
    const apiGuessResult = await fetchGuessResult(guess);
    if(apiGuessResult.success) {
      const localGuessResults = [...guessResults]
      localGuessResults[activeRowIdx] = apiGuessResult.result.split('')
      setGuessResults(localGuessResults)
      if(apiGuessResult.result === '11111') {
        setGameStatus('pass')
      } else if(activeRowIdx === 5) {
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
    const guessRow = new Array(5).fill('')
    const currentGuesses = [...guesses];
    for(let i = 0; i < 5; i++) {
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
        <Button guessWord={guessWord} disabledButton={guess.length < 5}>
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
