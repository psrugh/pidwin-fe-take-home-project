import Tile from './Tile/Tile';
import styles from './Tiles.module.css';

function Tiles({guesses, guessResults}) {
  return (
    <div>
      {guesses ? (
        <div className={styles.tiles}>
          {guesses.map((guessRow, rowIdx) => {
            const guessResultsRow = guessResults[rowIdx];
            return (
              <ol
                className={styles.ol}
                key={rowIdx}
              >
                {guessRow
                  ? guessRow.map((guess, letterIdx) => {
                      return (
                        <Tile
                          guess={guess}
                          status={guessResultsRow[letterIdx]}
                          key={letterIdx}
                          activeTile={
                            guessRow.join('').length === letterIdx + 1
                          }
                        />
                      );
                    })
                  : null}
              </ol>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Tiles;
