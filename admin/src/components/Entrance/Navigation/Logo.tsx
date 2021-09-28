import styles from './index.styl';
import logo from '@/resource/icon.png';

interface LogoProps {
  collapsed?: boolean;
};

const Logo: React.FC<LogoProps> = ({
  collapsed
}) => (
  <div className={`${styles.icon} ${collapsed ? styles.iconClose : ''}`}>
    <img src={logo} alt="#" />
    <ul>
      <li>开源管理系统</li>
      <li>Open Management System</li>
    </ul>
  </div>
);

export default Logo;
