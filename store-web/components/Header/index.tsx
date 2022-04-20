import Logo from './Logo';
import Search from './Search';
import Functions from './Functions';
import styles from './index.module.sass';


/**
 * @name Header 主页顶部导航
 */
const Header = () => (
  <header className={styles.header}>
    <div className={styles.content}>
      <Logo />
      <Search />
      <Functions />
    </div>
  </header>
);

export default Header;