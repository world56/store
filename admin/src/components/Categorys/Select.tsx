import { Select } from "antd";
import { useStore } from "@/hooks";
import styles from './index.module.sass';

import type { TypeCategoryProps } from '.';
import type { SelectProps } from 'antd/lib/select';
import type { DefaultOptionType } from 'rc-select/lib/Select';

type TypeSelect = Partial<Pick<SelectProps, 'onChange' | 'value' | 'mode'>>;

type TypeCategorySelect = React.FC<Pick<TypeCategoryProps, 'type'> & TypeSelect>;

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
      {category[type]?.LIST.map(v => <Option title={v.remark} key={v.key} value={v.key}>
        {v.value}
      </Option>)}
    </Select>
  );

};

export default CategorySelect;
