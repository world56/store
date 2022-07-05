import { Select } from "antd";
import { useStore } from "@/hooks";
import styles from './index.module.sass';

import type { TypeCategoryProps } from '.';
import type { SelectProps } from 'antd/lib/select';
import type { TypeCommon } from "@/interface/common";
import type { DefaultOptionType } from 'rc-select/lib/Select';

type TypeSelect = Partial<Pick<SelectProps, 'onChange' | 'value' | 'mode' | 'disabled'>>;

type TypeCategorySelect = React.FC<Pick<TypeCategoryProps<keyof TypeCommon.Store['category']>, 'type'> & TypeSelect>;

const { Option } = Select;

/**
 * @name CategorySelect 快速选择类目
 */
const CategorySelect: TypeCategorySelect = ({ type, ...props }) => {

  const { category } = useStore();

  const filterOption = (input: string, option?: DefaultOptionType) => {
    return option!.children!.toString().includes(input);
  };

  return (
    <Select
      {...props}
      allowClear
      showSearch
      className={styles.select}
      placeholder='请选择所属类目'
      filterOption={filterOption}
      getPopupContainer={triggerNode => triggerNode.parentNode}>
      {category[type]?.LIST.map(v => <Option title={v.remark} key={v.id} value={v.id}>
        {v.name}
      </Option>)}
    </Select>
  );

};

export default CategorySelect;
