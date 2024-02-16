import Header from './components/Header';
import Game from './components/Game';
import styles from './App.module.css';


function App() {
  return (
    <div className={styles.App}>
      <div className={styles.hugMe}>
        <Header/>
        <Game />
      </div>
    </div>
  );
}

export default App;
