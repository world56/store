import Image from 'next/image';
import ICON_logo from 'public/logo.png';
import styles from './index.module.sass';

/**
 * @name Logo 商城图标
 */
const Logo = () => (
  <div className={styles.logo}>
    <Image src={ICON_logo} alt="#" width={50} height={50} />
    <h2>Lover
      <span>github.com</span>
    </h2>
  </div>
);

export default Logo;
