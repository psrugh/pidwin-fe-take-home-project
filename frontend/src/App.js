import Header from './components/Header/Header';
import Game from './components/Game/Game';
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
