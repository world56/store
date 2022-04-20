import React from 'react';
import styles from './index.module.sass';

export interface TypeIconNameProps {
  icon: string;
  children?: React.ReactFragment;
};

/**
 * @name Icon 菜单图标
 */
const Icon: React.FC<TypeIconNameProps> = ({ icon, children }) => (
  <div className={styles.icon}>
    <img src={icon} alt="商品类目" />
    <span>{children}</span>
  </div>
);

export default Icon;
