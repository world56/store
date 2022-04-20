import styles from './index.styl';
import { useMemo, useCallback } from 'react';
import { initColumns, searchSelect } from './utils';
import { DatePicker } from '@/components/Formatting';
import OperatingButton from './components/OperatingButton';
import { Row, Col, Form, Input, Select, Cascader, TreeSelect } from 'antd';

import type { FormInstance } from 'antd/es';
import type { TypeCommon } from '@/interface/common';
import type { Rule } from 'rc-field-form/lib/interface';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';

import * as CONF from './config';
import { ENUM_COMMON } from '@/enum/common';

type DefaultKeyTypeProps = TypeCommon.DefaultKey;

export type CascaderList = {
  children?: CascaderList[];
} & DefaultKeyTypeProps & TypeCommon.GenericObject;

export type ConfCascaderList = {
  data: CascaderList[];
} & DefaultKeyTypeProps;

export type ColumnsList = Readonly<CascaderList>[] | ConfCascaderList;

export interface Columns {
  key: string;
  name: string;
  value?: string;
  rules?: Rule[];
  placeholder?: string;
  noStyle?: (f: FormInstance) => void;
  type: keyof typeof ENUM_COMMON.COMPONENT_TYPE;
  bindValue?: `${ENUM_COMMON.COMPONENT_TO_VALUE}`;
  list?: ReadonlyArray<CascaderList> | ConfCascaderList;
  /**
   * @param props 各类组件props
   * @description 暂不具体定义 参考antd官方文档对各类组件的定义
   */
  props?: any;
};

export interface SearchFormProps {
  size?: SizeType;
  onSearch(): void;
  spanSize?: number;
  form: FormInstance;
  columns: Columns[];
};

const { Option } = Select;

/**
 * @name Search 搜索
 * @description 快速创建一个搜索组件（Form）
 */
const Search: React.FC<SearchFormProps> = ({
  form,
  size,
  columns,
  onSearch,
  children,
  spanSize = 5,
}) => {

  const Columns = useMemo(() => initColumns(columns), [columns]);

  const toComType = useCallback((value: Columns) => {
    const {
      type,
      list,
      props = {},
      placeholder,
      bindValue = ENUM_COMMON.COMPONENT_TO_VALUE.KEY,
    } = value;
    const traverse = Array.isArray(list) ? list : [];
    switch (type) {
      case ENUM_COMMON.COMPONENT_TYPE.INPUT:
        return (
          <Input
            allowClear
            size={size}
            onPressEnter={onSearch}
            placeholder={placeholder}
            {...props} />
        );
      case ENUM_COMMON.COMPONENT_TYPE.SELECT:
        const affirmVal = bindValue === ENUM_COMMON.COMPONENT_TO_VALUE.KEY;
        return (
          <Select
            allowClear
            showSearch
            size={size}
            placeholder={placeholder}
            filterOption={searchSelect}
            optionFilterProp="children" {...props}>
            {traverse.map(({ key, value: val }) => <Option key={key} value={affirmVal ? key : val}>{val}</Option>)}
          </Select>
        );
      case ENUM_COMMON.COMPONENT_TYPE.CASCADER:
        return (
          <Cascader
            options={traverse}
            expandTrigger='hover'
            placeholder={placeholder}
            fieldNames={CONF.CASCADER_FIELD}
            {...props} />
        );
      case ENUM_COMMON.COMPONENT_TYPE.TIME_SCOPE:
        return (
          <DatePicker className={styles.component} {...props} />
        );
      case ENUM_COMMON.COMPONENT_TYPE.TREE_SELECT:
        return (
          <TreeSelect
            allowClear
            treeData={traverse}
            treeDefaultExpandAll
            placeholder={placeholder}
            {...props}
          />
        );
      default:
        return <span>NULL</span>
    };
  }, [size, onSearch]);

  const init = useCallback(props => Columns.map(v => {
    const ele = <Col
      flex={2}
      key={v.key}
      span={spanSize}
      style={{ width: '100%' }}>
      <Form.Item
        name={v.key}
        label={v.name}
        rules={v.rules}
        initialValue={v.value}>
        {toComType(v)}
      </Form.Item>
    </Col>;
    if (v?.noStyle?.(props)) {
      return null;
    }
    return ele;
  }), [spanSize, Columns, toComType]);

  function onClear() {
    form.resetFields();
  };

  return (
    <Form form={form} className={styles.layout} {...CONF.FORM_LAYOUT}>
      <Form.Item shouldUpdate className={styles.shouldUpdate}>
        {props => <Row gutter={24}>
          {init(props)}
          <OperatingButton onEmpty={onClear} onSumbit={onSearch}>
            {children ? children : null}
          </OperatingButton>
        </Row>}
      </Form.Item>
    </Form>
  );
};

export default Search;
