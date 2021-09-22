import styles from './index.styl';
import logo from '@/resource/icon.png';

const Logo = () => (
  <div className={styles.logo}>
    <img src={logo} alt="#" />
    <ul>
      <li>购物街后台管理系统</li>
      <li>Shopping Street Management System</li>
    </ul>
  </div>
);

export default Logo;
