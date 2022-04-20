import React from 'react';
import Icon from './Icon';
import styles from './index.module.sass';

interface TypeMenuProps extends React.FC<{
  /**
   * @param mode horizontal:水平 vertical:竖
   */
  mode?: 'horizontal' | 'vertical';
  className?: string;
  children?: React.ReactNode;
}> {
  Icon: typeof Icon;
};


const Menu: TypeMenuProps = ({ mode = 'vertical', className, children }) => (
  <div className={`${styles.menu} ${styles[mode]} ${className || ''}`}>
    <div>
      {React.Children.map(children, (item) => item)}
    </div>
  </div>
);

Menu.Icon = Icon;

export default Menu