import Logo from './Logo';
import styles from './index.styl';
import UserHandler from './UserHandler';

/**
 * @name Header system header
 */
const Header = () => (
  <div className={styles.layout}>
    <Logo />
    <UserHandler />
  </div>
);

export default Header;
