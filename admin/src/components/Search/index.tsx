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
   * @description 不具体定义 参考antd官方文档对各类组件的定义
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
  extendBtn?: React.ReactChild;
  tailElement?: React.ReactChild | null;
};

const { Option } = Select;

const { COMPONENT_TYPE, COMPONENT_TO_VALUE } = ENUM_COMMON;

/**
 * @name SearchForm 搜索
 */
/* eslint-disable react-hooks/exhaustive-deps */
const SearchForm: React.FC<SearchFormProps> = ({
  form,
  size,
  columns,
  onSearch,
  initRequest,
  tailElement,
  spanSize = 5,
  extendBtn = [],
}) => {

  const onSumbit = async () => {
    const values = await form.validateFields();
    onSearch(values);
  };

  function onClear() {
    form.resetFields();
  };

  const Columns = useMemo(() => initColumns(columns), [columns]);

  const toComType = (value: Columns) => {
    const {
      type,
      list,
      props = {},
      placeholder,
      bindValue = COMPONENT_TO_VALUE.KEY,
    } = value;
    const allowClear = true;
    const traverse = Array.isArray(list) ? list : [];
    switch (type) {
      case COMPONENT_TYPE.INPUT:
        return (
          <Input
            size={size}
            onPressEnter={onSumbit}
            allowClear={allowClear}
            placeholder={placeholder}
            {...props} />
        );
      case COMPONENT_TYPE.SELECT:
        return (
          <Select
            showSearch
            size={size}
            allowClear={allowClear}
            placeholder={placeholder}
            filterOption={searchSelect}
            optionFilterProp="children" {...props}>
            {traverse.map(({ key, value: val }) => (
              <Option key={key} value={bindValue === COMPONENT_TO_VALUE.KEY ? key : val}>
                {val}
              </Option>
            ))}
          </Select>
        );
      case COMPONENT_TYPE.CASCADER:
        return (
          <Cascader
            options={traverse}
            expandTrigger='hover'
            placeholder={placeholder}
            fieldNames={CONF.CASCADER_FIELD}
            {...props} />
        );
      case COMPONENT_TYPE.TIME_SCOPE:
        return (
          <DatePicker.RangePicker
            className={styles.component}
            {...props} />
        );
      default:
        return <span>NULL</span>
    };
  };

  const init = useCallback(props =>
    Columns.map(v => {
      const ele = (
        <Col span={spanSize} key={v.key} flex={2} style={{ width: '100%' }}>
          <Form.Item
            name={v.key}
            label={v.name}
            rules={v.rules}
            initialValue={v.value}
          >
            {toComType(v)}
          </Form.Item>
        </Col>
      );
      if (v.noStyle && v.noStyle(props)) {
        return null;
      }
      return ele;
    }),
    [Columns, form]
  );

  useEffect(() => {
    if (initRequest) {
      onSumbit();
    };
  }, []);

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
                className="formSearchClear"
              >
                <DeleteOutlined />
                重置
              </Button>
              {extendBtn}
            </Col>
          </Row>
        )}
      </Form.Item>
      {tailElement && <div className={styles.tailEle}>
        {tailElement}
      </div>}
    </Form>
  );
};

export default memo(SearchForm);
