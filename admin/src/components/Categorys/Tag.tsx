import { useMemo } from 'react';
import { Tag, Tooltip } from 'antd';
import { createRandNum } from '@/utils';
import styles from './index.module.sass';

import type { TypeCommon } from "@/interface/common";

type TypeDefaultObject = Pick<TypeCommon.Category, 'id' | 'name' | 'remark'>;

export interface TypeCategorysTagProps<T extends TypeDefaultObject = TypeDefaultObject> {
  /** @param list category列表 */
  list?: T[];
  /** @param maxWidth 最多显示长度 跟Table误差40px左右 */
  maxWidth?: number | string;
};

const COLORS = [
  "magenta", "red", "volcano",
  "orange", "gold", "green",
  "cyan", "blue", "geekblue", "purple"
];

/**
 * @name CategorysTag 类目标签
 */
const CategorysTag: React.FC<TypeCategorysTagProps> = ({ maxWidth = '100%', list = [] }) => {

  const randomColors = useMemo(() => createRandNum(list.length).map(k => COLORS[k]), [list]);

  return (
    <div className={styles.tag} style={{ maxWidth }} title={list.map(v => v.name).join('、')}>
      {list.map((v, i) => <Tooltip key={v.id} title={v.remark}>
        <Tag color={randomColors[i]}>{v.name}</Tag>
      </Tooltip>)}
    </div>
  );
};

export default CategorysTag;
