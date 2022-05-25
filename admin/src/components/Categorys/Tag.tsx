import { useMemo } from 'react';
import { Tag, Tooltip } from 'antd';
import { createRandNum } from '@/utils';
import styles from './index.module.sass';

import type { TypeCommon } from "@/interface/common";

export interface TypeCategorysTagProps {
  /** @param list category列表 */
  list: TypeCommon.Category[];
  /** @param maxWidth 最多显示长度 */
  maxWidth?: number;
};

const COLORS = ["magenta", "red", "volcano", "orange", "gold", "green", "cyan", "blue", "geekblue", "purple"];

/**
 * @name CategorysTag 类目标签
 */
const CategorysTag: React.FC<TypeCategorysTagProps> = ({ maxWidth = 250, list = [] }) => {

  const randomColors = useMemo(() => createRandNum().map(k => COLORS[k]), []);

  return (
    <Tooltip title={list.map(v => v.name).join('、')}>
      <div className={styles.tag} style={{ maxWidth }}>
        {list.map((v, i) => <Tag key={v.id} color={randomColors[i]}>{v.name}</Tag>)}
      </div>
    </Tooltip>
  );
};

export default CategorysTag;
