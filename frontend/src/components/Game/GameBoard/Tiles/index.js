import Tile from './Tile';
import styles from './styles.module.css';

function Tiles({ guesses, guessResults }) {
  return (
    <div>
    {
      guesses ? <div className={styles.tiles}>
        {
          guesses.map((guessRow, rowIdx) => {
            const guessResultsRow = guessResults[rowIdx];
            return (<ol className={styles.ol} key={rowIdx}>
              {guessRow ? guessRow.map((guess, letterIdx) => {
                return <Tile guess={guess} status={guessResultsRow[letterIdx]} key={letterIdx} />
              }) : null}
              </ol>)
          })
        }

      </div> : null
    } 
    </div>
  );
}

export default Tiles;
