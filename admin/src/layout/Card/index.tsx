import styles from './index.module.sass';
import { Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import React from 'react';

export type FormCardProps = React.FC<{
  show?: boolean;
  title: string;
  remove?(): void;
  children?: React.ReactNode;
}>;

const Card: FormCardProps = ({
  title,
  remove,
  children,
  show = true,
}) => (
  <div className={`${styles.layout} ${show ? '' : styles.conceal}`}>
    <div className={styles.formTitle}>
      <p>{title}</p>
      {remove ?
        <Popconfirm title="确定删除?" onConfirm={remove}>
          <DeleteOutlined />
        </Popconfirm>
        : <span />}
    </div>
    <div className={styles.formCtx}>
      {children}
    </div>
  </div>
);


export default Card;
