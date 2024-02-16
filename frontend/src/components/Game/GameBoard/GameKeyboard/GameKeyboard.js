import { useEffect, useState, useRef } from 'react';
import Keyboard from 'react-simple-keyboard';
import styles from './GameKeyboard.module.css';
import 'react-simple-keyboard/build/css/index.css';

// the following file is formatted as a theme file for the Keyboard library
import './wordle.theme.css';

const buttonLayout = {
  'default': [
    'q w e r t y u i o p',
    'a s d f g h j k l',
    '{enter} z x c v b n m {bksp}',
  ],
}

// keyboard library specific
const highlightedClasses = 'hg-button hg-standardBtn hg-guessedLetter';

function GameKeyboard({ setGuess, guessWord, guessResults, gameStatus }) {
  const keyboardRef = useRef(null);
  const [buttonAttributes, setButtonAttributes] = useState([])
  
  function onChange(value = '') {
    if(gameStatus !== 'active') {
      return;
    }
    const highlightedButtons = value.split('').map((letter) => {
      return {
        attribute: 'class',
        value: highlightedClasses,
        buttons: letter
      }
    })
    setGuess(value)
    setButtonAttributes(highlightedButtons)
  }

  function onKeyReleased(key) {
    if(key === '{enter}'){
      guessWord()
    }
  }

  useEffect(() => {
    setButtonAttributes([]);
    keyboardRef.current.clearInput();
  }, [guessResults, gameStatus])

  return (
    <div className={styles.keyboard}>
      <Keyboard
        keyboardRef={(r) => (keyboardRef.current = r)}
        onChange={onChange}
        onKeyReleased={onKeyReleased}
        layout={buttonLayout}
        maxLength={5}
        display={{
          "{bksp}": '⌫',
          "{enter}": 'enter'
        }}
        buttonAttributes={[
          ...buttonAttributes,
          {
            attribute: 'class',
            value: 'hg-button hg-standardBtn hg-enterButton',
            buttons: '{enter}'
          }
        ]}
        theme="hg-theme-default hg-theme-wordle"
      />
    </div>
  );
}

export default GameKeyboard;
