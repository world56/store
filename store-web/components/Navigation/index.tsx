// import Menu from './Menu';
import ICON_hot from 'public/hot.png';
import styles from './index.module.sass';
import ICON_seckill from 'public/seckill.png';
import ICON_commodity from 'public/commodity.png';
import ICON_recommend from 'public/recommend.png';
import ICON_evaluation from 'public/evaluation.png'
import Menu from '../Menu'

/**
 * @name Navigation 导航
 */
const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.content}>
        <Menu>
          <Menu.Icon icon={ICON_commodity.src}>商品类目</Menu.Icon>
          <Menu.Icon icon={ICON_seckill.src}>在线秒杀</Menu.Icon>
          <Menu.Icon icon={ICON_seckill.src}>在线秒杀</Menu.Icon>
          <Menu.Icon icon={ICON_seckill.src}>在线秒杀</Menu.Icon>
          <Menu.Icon icon={ICON_seckill.src}>在线秒杀</Menu.Icon>
        </Menu>
        <Menu mode='horizontal'>
          <Menu.Icon icon={ICON_recommend.src}>今日推荐</Menu.Icon>
          <Menu.Icon icon={ICON_hot.src}>热销榜</Menu.Icon>
          <Menu.Icon icon={ICON_seckill.src}>特价秒杀</Menu.Icon>
          <Menu.Icon icon={ICON_evaluation.src}>测评家</Menu.Icon>
        </Menu>
      </div>
    </nav>
  );
};

export default Navigation;
