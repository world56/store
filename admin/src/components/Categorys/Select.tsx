import { useState } from 'react';
import { Select, Tooltip } from "antd";
import styles from './index.module.sass';
import { useActions, useStore } from '@/hooks';
import { filterOptionTooltip } from '@/utils/filter';
import { SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { ENUM_STORE } from "@/enum/store";

import type { TypeCategoryProps } from '.';
import type { SelectProps } from 'antd/lib/select';
import type { TypeCommon } from "@/interface/common";
import type { TypeNestingComp } from '@/utils/filter';

type TypeCategoryKeys = Pick<TypeCategoryProps<keyof TypeCommon.Store['category']>, 'type'>;

type TypeCategoryValue = number | number[];

interface TypeCategorySelectProps<T = TypeCategoryValue> extends React.FC<TypeCategoryKeys & Omit<SelectProps<T, TypeNestingComp>, 'value' | 'onChange'> & {
  value?: T;
  onChange?(val: T | undefined): void;
}> { };

const { Option } = Select;
const selectShow = { keepParent: false };

/**
 * @name CategorySelect 快速选择类目
 */
const CategorySelect: TypeCategorySelectProps = ({ type, value, onChange, ...props }) => {

  const isCategory = Object.keys(ENUM_STORE.CATEGORY).includes(type);

  const [key, setKey] = useState<TypeCategoryValue>();

  const actions = useActions();
  const { category } = useStore();

  function onSelectChange(val?: TypeCategoryValue) {
    onChange ? onChange?.(val) : setKey(val);
  };

  // 重新获取最新类目
  function onRefresh() {
    actions.getCategory([type as ENUM_STORE.CATEGORY]);
  };

  const val = onChange ? value : key;

  const tool = (
    <>
      {isCategory ? <Tooltip title='更新筛选项'>
        <SyncOutlined onClick={onRefresh} />
      </Tooltip> : null}
      {(Array.isArray(val) ? val?.length : val) ?
        <Tooltip title='清空'>
          <CloseCircleOutlined onClick={() => onSelectChange()} />
        </Tooltip>
        : null}
    </>
  );

  return (
    <Select
      showArrow
      showSearch
      value={val}
      suffixIcon={tool}
      placeholder='请选择关联项'
      className={styles.select}
      onChange={onSelectChange}
      filterOption={filterOptionTooltip}
      getPopupContainer={triggerNode => triggerNode.parentNode}
      {...props}>
      {category[type]?.LIST?.map(v => <Option key={v.id} value={v.id} >
        <Tooltip title={v.remark} destroyTooltipOnHide={selectShow}>
          <p>{v.name}</p>
        </Tooltip>
      </Option>)}
    </Select>
  );

};

export default CategorySelect;
