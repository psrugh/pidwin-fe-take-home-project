import StatusBar from '../StatusBar';
import styles from './styles.module.css';

function Header() {
  return (
    <header className={styles.header}>
        <StatusBar />
    </header>
  );
}

export default Header;
