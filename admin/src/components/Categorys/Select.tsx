import { Select, Tooltip } from "antd";
import styles from './index.module.sass';
import { useMemo, useState } from 'react';
import Badge from '@/layout/Status/Badge';
import { useActions, useStore } from '@/hooks';
import { filterOptionTooltip } from '@/utils/filter';
import { SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { ENUM_STORE } from "@/enum/store";

import type { TypeCategoryProps } from '.';
import type { SelectProps } from 'antd/lib/select';
import type { TypeCommon } from "@/interface/common";
import type { TypeNestingComp } from '@/utils/filter';

type TypeCategoryKeys = Pick<TypeCategoryProps<keyof TypeCommon.Store['category']>, 'type'>;

type TypeCategoryValue<T = TypeCommon.PrimaryKey> = T | T[];

interface TypeCategorySelectProps<T = TypeCategoryValue> extends React.FC<TypeCategoryKeys & Omit<SelectProps<T, TypeNestingComp>, 'value' | 'onChange'> & {
  value?: T;
  onChange?(val: T | undefined): void;
}> { };

const { Option } = Select;
const selectShow = { keepParent: false };

/**
 * @name CategorySelect 快速选择类目
 */
const CategorySelect: TypeCategorySelectProps = ({ type, value, onChange, disabled, ...props }) => {

  const [key, setKey] = useState<TypeCategoryValue>();

  const actions = useActions();
  const { category } = useStore();

  function onSelectChange(val?: TypeCategoryValue) {
    onChange ? onChange(val) : setKey(val);
  };

  // 重新获取最新类目
  function onRefresh() {
    actions.getCategory([type as ENUM_STORE.CATEGORY]);
  };

  const val = onChange ? value : key;

  const isCategory = useMemo(() => (
    Object.keys(ENUM_STORE.CATEGORY).includes(type)
  ), [type]);

  const tool = (
    disabled ? null : <>
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

  // id name remark 是category类型的交集（constant除外😂）
  const list = category[type]?.LIST as Omit<TypeCommon.Category, 'type'>[];

  const color = list?.find(v => v.color);

  return (
    <Select
      showArrow
      showSearch
      value={val}
      suffixIcon={tool}
      disabled={disabled}
      placeholder='请选择关联项'
      className={styles.select}
      onChange={onSelectChange}
      filterOption={filterOptionTooltip}
      getPopupContainer={triggerNode => triggerNode.parentNode} {...props}>
      {list?.map(v => <Option key={v.id} value={v.id} >
        <Tooltip title={v.remark} destroyTooltipOnHide={selectShow}>
          <p>
            {color ? <Badge color={v.color} /> : null}&nbsp;
            {v.name}
          </p>
        </Tooltip>
      </Option>)}
    </Select>
  );

};

export default CategorySelect;
