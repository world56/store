import styles from '../index.styl';
import Icon from '@/resource/icon.png';
import GayHubIcon from '@/resource/gayHub.png';

/**
 * @name Container 登录页容器
 */
const Container: React.FC = ({ children }) => (
  <>
    <header className={styles.header}>
      <div>
        <img src={Icon} alt="#" />
        <h2>购物街<span>Management System</span></h2>
      </div>
      <a href="https://github.com/world56/store">
        <img className={styles.gayhub} src={GayHubIcon} alt='#' />
      </a>
    </header>
    <div className={styles.login}>
      <div className={styles.loginCtx}>
        {children}
      </div>
    </div>
    <footer className={styles.footer}>
      Copyright © 2000-2021  @Ming 版权没有
    </footer>
  </>
);

export default Container;
