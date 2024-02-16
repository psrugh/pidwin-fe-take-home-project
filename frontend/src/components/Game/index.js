import GameBoard from './GameBoard/';
import styles from './styles.module.css';

function Game() {
  return (
    <div className={styles.game}>
      <h1 className={styles.h1}>Wordle</h1>
      <section className={styles.gameBoard}>
        <GameBoard />
      </section>
    </div>
  );
}

export default Game;
