import Icon from '@/resource/icon.png';
import styles from '../index.module.sass';
import { GithubOutlined } from '@ant-design/icons';

/**
 * @name Container 登录页容器
 */
const Container: React.FC<{ children?: React.ReactNode; }> = ({ children }) => (
  <>
    <header className={styles.header}>
      <div>
        <img src={Icon} alt="#" />
        <h2>购物街<span>Management System</span></h2>
      </div>
      <a href="https://github.com/world56/store">
        <GithubOutlined className={styles.gayhub}  />
      </a>
    </header>
    <div className={styles.login}>
      <div className={styles.loginCtx}>
        {children}
      </div>
    </div>
    <footer className={styles.footer}>
      Copyright © 2000-2021  @Ming 版权所有
    </footer>
  </>
);

export default Container;
