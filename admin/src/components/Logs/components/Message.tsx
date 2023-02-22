import { toTime } from "@/utils/format";
import styles from '../index.module.sass';
import { User } from '@/components/Tooltip';

import { TypeAdminUser } from '@/interface/system/user';
import React from "react";

interface TypeMessageProps {
  /** @param time 日志生成时间 */
  time?: Date;
  /** @param 日志关联用户 */
  user?: TypeAdminUser.DTO;
  /** @param 日志操作状态 */
  status?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * @name Message 日志消息
 */
const Message: React.FC<TypeMessageProps> = ({ user, time, status, children }) => (
  <div className={styles.msg}>
    <div className={styles.icon}>
      <User user={user} type='avatar' />
    </div>
    <div className={styles.ctx}>
      <div className={styles.title}>
        <span>
          <User user={user} />
          <span>{toTime(time)}</span>
        </span>
        <span>{status}</span>
      </div>
      <p>{children}</p>
    </div>
  </div>
);

export default Message;
