import { Select, Tooltip } from "antd";
import styles from './index.module.sass';
import { PlusCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { useRef, useState, forwardRef, useImperativeHandle } from "react";

import type { TypeProductDTO, TypeQueryProductProps } from ".";

export type TypeSelectProductSelectKey = ReturnType<typeof useState<number>>['1'];

type TypeSelectProductProps = React.ForwardRefRenderFunction<
  TypeSelectProductSelectKey,
  Omit<TypeQueryProductProps, 'onReset'>
>;

const { Option } = Select;

/**
 * @name SelectProduct 查询产品库
 */
const SelectProduct: TypeSelectProductProps = ({
  list,
  onCreate,
  onChange,
  disabled,
  width = 350,
}, ref) => {

  const cache = useRef<TypeProductDTO>();
  const [value, setValue] = useState<number>();
  
  function onInputChange(val: number) {
    setValue(val);
    cache.current = list?.find(v => v.id === val);
    if (cache.current) {
      onChange?.([cache.current]);
      val || onCreate?.();
    }
  };

  function repeatAdd() {
    cache.current && onChange?.([cache.current]);
  };

  const tool = (
    <>
      <Tooltip title='刷新筛选列表'>
        <SyncOutlined onClick={() => onCreate?.()} />
      </Tooltip>
      {value ? <Tooltip title='继续添加'>
        <PlusCircleOutlined onClick={repeatAdd} />
      </Tooltip> : null}
    </>
  );

  useImperativeHandle(ref, () => setValue, []);

  return (
    <Tooltip title={disabled ? '' : '请先选择供应商'}>
      <Select
        showSearch
        value={value}
        style={{ width }}
        suffixIcon={tool}
        onSearch={onCreate}
        filterOption={false}
        disabled={!disabled}
        onChange={onInputChange}
        className={styles.select}
        placeholder='请搜索添加产品'>
        {list?.map(v => <Option key={v.id} value={v.id}>{v.name}</Option>)}
      </Select>
    </Tooltip>
  )
};

export default forwardRef(SelectProduct);
