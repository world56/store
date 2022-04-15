import { Tree as AntdTree } from 'antd';

import type { TreeProps } from 'antd/lib/tree/Tree';

interface TypeFormTreeProps<T = React.Key[]> extends Omit<TreeProps, 'onCheck' | 'checkedKeys'> {
  value?: T;
  onChange?(e: T): void;
};

type TypeOnCheckArgs = { checked: React.Key[]; halfChecked: React.Key[]; } | React.Key[];

const styles = { marginTop: 5 };

const Tree: React.FC<TypeFormTreeProps> = ({
  value,
  onChange,
  ...props
}) => {

  function onCheck(checked: TypeOnCheckArgs) {
    onChange?.(Array.isArray(checked) ? checked : []);
  };

  return (
    <AntdTree
      {...props}
      blockNode
      checkable
      style={styles}
      onCheck={onCheck}
      autoExpandParent
      defaultExpandAll
      checkedKeys={value}
    />
  );
};

export default Tree;
