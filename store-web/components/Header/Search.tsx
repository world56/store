import styles from './index.module.sass';
import Image from 'next/image';
import ICON_del from 'public/del.png';
import ICON_search from 'public/search.png';

console.log();


/**
 * @name Search 筛选种类输入框
 */
const Search = () => {
  return (
    <div className={styles.search}>
      <input type="text" placeholder='请输入商品关键字' />
      <img src={ICON_search.src} alt="#" />
      {/* <img src={ICON_del.src} alt="#" /> */}
    </div>
  );
};

export default Search