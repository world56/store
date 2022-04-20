import React from 'react';
import Image from 'next/image';
import ICON_like from 'public/like.png';
import ICON_personal from 'public/personal.png';
import ICON_shopping from 'public/shopping.png';
import styles from './index.module.sass';


/**
 * @name Functions header功能 购物车 我喜欢 个人信息 
 */
const Functions = () => {
  return (
    <div className={styles.func}>
      <Image src={ICON_like} width={32} height={30} />
      <Image src={ICON_shopping}  width={32} height={30} />
      <Image src={ICON_personal}  width={32} height={30} />
    </div>
  );
};

export default Functions;
