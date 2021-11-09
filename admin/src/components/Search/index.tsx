import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  Cascader,
  DatePicker,
} from 'antd';
import {
  memo,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import styles from './index.styl';
import { initColumns, searchSelect } from './utils';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';

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
  bindValue?: ENUM_COMMON.COMPONENT_TO_VALUE;
  type: keyof typeof ENUM_COMMON.COMPONENT_TYPE;
  list?: ReadonlyArray<CascaderList> | ConfCascaderList;
  /**
   * @name props 各类组件props
   * @description 暂不具体定义 参考antd官方文档对各类组件的定义
   */
  props?: any;
};

export interface SearchFormProps<T = TypeCommon.GenericObject> {
  size?: SizeType;
  spanSize?: number;
  form: FormInstance;
  columns: Columns[];
  initRequest?: boolean;
  onSearch(props: T): void;
  children?: React.ReactNode;
};

const { Option } = Select;

/**
 * @name SearchForm 搜索
 */
const SearchForm: React.FC<SearchFormProps> = ({
  form,
  size,
  columns,
  onSearch,
  children,
  initRequest,
  spanSize = 5,
}) => {

  const onSumbit = useCallback(async () => {
    const values = await form.validateFields();
    onSearch(values);
  }, [form, onSearch]);

  function onClear() {
    form.resetFields();
  };

  const Columns = useMemo(() => initColumns(columns), [columns]);

  const toComType = useCallback((value: Columns) => {
    const {
      type,
      list,
      props = {},
      placeholder,
      bindValue = ENUM_COMMON.COMPONENT_TO_VALUE.KEY,
    } = value;
    const allowClear = true;
    const traverse = Array.isArray(list) ? list : [];
    switch (type) {
      case ENUM_COMMON.COMPONENT_TYPE.INPUT:
        return (
          <Input
            size={size}
            onPressEnter={onSumbit}
            allowClear={allowClear}
            placeholder={placeholder}
            {...props} />
        );
      case ENUM_COMMON.COMPONENT_TYPE.SELECT:
        return (
          <Select
            showSearch
            size={size}
            allowClear={allowClear}
            placeholder={placeholder}
            filterOption={searchSelect}
            optionFilterProp="children" {...props}>
            {traverse.map(({ key, value: val }) => (
              <Option
                key={key}
                value={bindValue === ENUM_COMMON.COMPONENT_TO_VALUE.KEY ? key : val}>
                {val}
              </Option>
            ))}
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
          <DatePicker.RangePicker
            className={styles.component}
            {...props} />
        );
      default:
        return <span>NULL</span>
    };
  }, [size, onSumbit]);

  const init = useCallback(props =>
    Columns.map(v => {
      const ele = (
        <Col span={spanSize} key={v.key} flex={2} style={{ width: '100%' }}>
          <Form.Item
            name={v.key}
            label={v.name}
            rules={v.rules}
            initialValue={v.value}>
            {toComType(v)}
          </Form.Item>
        </Col>
      );
      if (v.noStyle && v.noStyle(props)) {
        return null;
      }
      return ele;
    }),
    [spanSize, Columns, toComType]
  );

  useEffect(() => {
    initRequest && onSumbit();
  }, [initRequest, onSumbit]);

  return (
    <Form
      form={form}
      {...CONF.FORM_LAYOUT}
      className={styles.layout}>
      <Form.Item
        shouldUpdate
        className={styles.shouldUpdate}>
        {props => (
          <Row gutter={24}>
            {init(props)}
            <Col className={styles.searchBtn}>
              <Button onClick={onSumbit} type="primary">
                <SearchOutlined />
                搜索
              </Button>
              <Button
                danger
                onClick={onClear}
                className="formSearchClear">
                <DeleteOutlined />
                重置
              </Button>
              {children ? children : null}
            </Col>
          </Row>
        )}
      </Form.Item>
    </Form>
  );
};

export default memo(SearchForm);
