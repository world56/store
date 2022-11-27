import styles from './index.module.sass';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DatePicker } from '@/components/Formatting';
import OperatingButton from './components/OperatingButton';
import { Row, Col, Form, Input, Select, Cascader, TreeSelect } from 'antd';
import { initColumns, searchSelect, filterFormQueryValue, getInitQuery } from './utils';

import type { FormInstance } from 'antd/es';
import type { TypeCommon } from '@/interface/common';
import type { Rule } from 'rc-field-form/lib/interface';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';

import * as CONF from './config';
import { ENUM_SEARCH } from './enum';

export interface Columns {
  name: string;
  label: string;
  rules?: Rule[];
  placeholder?: string;
  initialValue?: React.Key;
  type: ENUM_SEARCH.COMP_TYPE;
  list?: TypeCommon.DefaultKey[];
  hide?: (f: FormInstance) => boolean;
  /**
   * @param props 各类组件props
   * @description 暂不具体定义 参考antd组件文档 https://ant.design/components/overview-cn/
   */
  props?: any;
};

export interface SearchFormProps {
  size?: SizeType;
  onSearch(): void;
  spanSize?: number;
  form: FormInstance;
  columns: Columns[];
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

export interface TypeSearchProps extends React.FC<SearchFormProps> {
  ENUM: typeof ENUM_SEARCH;
};

function toComType(value: Columns, callback: () => void, size: SizeType) {
  const { type, list, placeholder, props = {} } = value;
  switch (type) {
    case ENUM_SEARCH.COMP_TYPE.INPUT:
      return (
        <Input
          allowClear
          size={size}
          onPressEnter={callback}
          placeholder={placeholder}
          {...props} />
      );
    case ENUM_SEARCH.COMP_TYPE.SELECT:
      return (
        <Select
          allowClear
          showSearch
          size={size}
          placeholder={placeholder}
          filterOption={searchSelect}
          optionFilterProp="children" {...props}>
          {list?.map(v => <Select.Option key={v.id} value={v.id}>{v.name}</Select.Option>)}
        </Select>
      );
    case ENUM_SEARCH.COMP_TYPE.CASCADER:
      return (
        <Cascader
          options={list}
          expandTrigger='hover'
          placeholder={placeholder}
          fieldNames={CONF.CASCADER_FIELD}
          {...props} />
      );
    case ENUM_SEARCH.COMP_TYPE.TIME_SCOPE:
      return (
        <DatePicker className={styles.component} {...props} />
      );
    case ENUM_SEARCH.COMP_TYPE.TREE_SELECT:
      return (
        <TreeSelect
          allowClear
          treeData={list}
          treeDefaultExpandAll
          placeholder={placeholder}
          {...props} />
      );
    default:
      return <span>NULL</span>
  };
}


/**
 * @name Search 搜索
 * @description 快速创建一个搜索组件(Form) 支持query参数读写
 */
const Search: TypeSearchProps = ({
  form,
  size,
  style,
  columns,
  onSearch,
  children,
  spanSize = 6,
}) => {

  const [query, setQuery] = useSearchParams();

  const Columns = useMemo(() => initColumns(columns), [columns]);

  const iniaializa = useMemo(() => Columns.map(v => (
    <Col
      flex={2}
      key={v.name}
      span={spanSize}
      style={{ width: '100%' }}
      className={v?.hide?.(form) ? 'none' : ''}>
      <Form.Item
        name={v.name}
        label={v.label}
        rules={v.rules}
        initialValue={v.initialValue}>
        {toComType(v, onSearch, size)}
      </Form.Item>
    </Col>
  )), [form, spanSize, Columns, onSearch, size]);

  function onFinish(value: Record<string, string>) {
    const { update, clear } = filterFormQueryValue(query, value);
    setQuery(update, { replace: true });
    clear.forEach(key => query.delete(key));
  };

  function onClear() {
    form.resetFields();
  };

  useEffect(() => {
    // 这里只负责初始化读取query参数
    const store = getInitQuery(query, columns);
    form.setFieldsValue(store);
    // eslint-disable-next-line
  }, [form, query]);

  return (
    <Form
      form={form}
      style={style}
      onFinish={onFinish}
      {...CONF.FORM_LAYOUT}
      className={styles.layout}>
      <Form.Item shouldUpdate className={styles.shouldUpdate}>
        {() => <Row gutter={24}>
          {iniaializa}
          <OperatingButton onEmpty={onClear} onSumbit={onSearch}>
            {children ? children : null}
          </OperatingButton>
        </Row>}
      </Form.Item>
    </Form>
  );
};

Search.ENUM = ENUM_SEARCH;

export default Search;
