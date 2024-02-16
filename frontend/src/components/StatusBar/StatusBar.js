import CellularSignalStrength from '../ui/Icons/CellularSignalStrength';
import WifiSignalStrength from '../ui/Icons/WifiSignalStrength';
import BatteryStatus from '../ui/Icons/BatteryStatus';
import styles from './StatusBar.module.css';

function StatusBar() {
  return (
    <div className={styles.positioner}>
      <div className={styles.statusBar}>
        <time
          dateTime='9:41'
          className={styles.time}
        >
          9:41
        </time>
        <div className={styles.statuses}>
          <CellularSignalStrength/>
          <WifiSignalStrength/>
          <BatteryStatus />
        </div>
      </div>
    </div>
  );
}

export default StatusBar;
