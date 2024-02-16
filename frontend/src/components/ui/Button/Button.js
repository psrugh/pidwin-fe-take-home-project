import styles from './Button.module.css';

function Button({ guessWord, children, disabledButton }) {
  return (
    <button type="button" className={`${styles.button} ${disabledButton ? styles.disabled : null}`} onClick={guessWord}>
      {children}
    </button>
  );
}

export default Button;
