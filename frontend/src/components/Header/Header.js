import StatusBar from '../StatusBar/StatusBar';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <StatusBar />
    </header>
  );
}

export default Header;
