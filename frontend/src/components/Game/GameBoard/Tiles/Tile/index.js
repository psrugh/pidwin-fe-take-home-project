import styles from './styles.module.css';

const classMap = {
  1: styles.correct,
  0: styles.wrongPlace,
  x: styles.incorrect,
}
function Tile({ guess, status }) {
  return (
    <li className={styles.li}>
      <div className={`${styles.tileContent} ${classMap[status]}`}>
        <div className={styles.face}>
          {guess}
        </div>
        <div className={styles.back}>
          {guess}
        </div>
      </div>
    </li>
  );
}

export default Tile;