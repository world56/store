import styles from './index.module.sass';
import { useMemo, useState } from 'react';
import { PreviewPicture } from '@/components/Details';
import { Input, Table, Modal, Button, Tooltip } from 'antd';

import { DB_PRIMARY_KEY } from '@/config/db';

import type { TypeProductDTO, TypeQueryProductProps } from '.';

type TypeSelectKey = Record<number, TypeProductDTO | undefined>;
interface TypeProductBatchAddProps extends Omit<TypeQueryProductProps, 'width' | 'onReset'> { };

const columns = [
  { title: '名称', dataIndex: 'name' },
  { title: '品牌', width: 250, dataIndex: ['brand', 'name'] },
  { title: '规格', width: 120, dataIndex: ['unit', 'name'] },
];

/**
 * @name ProductBatchAdd 批量选择添加产品
 */
const ProductBatchAdd: React.FC<TypeProductBatchAddProps> = ({
  list,
  onChange,
  onCreate,
  disabled,
}) => {

  const [name, setName] = useState<string>();
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState<TypeSelectKey>({});

  function onSumbit() {
    const value: Array<TypeProductDTO> = [];
    Object.entries(key).forEach(([k, v]) => v && value.push(v));
    onChange?.(value);
    onVisible();
  };

  function onVisible() {
    setVisible(b => !b);
    onCreate?.();
    if (visible) {
      setKey({});
      setName(undefined);
    }
  };

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setName(value);
    onCreate?.(value);
  };

  function onSelectChange(key: React.Key[], list: TypeProductDTO[]) {
    setKey(Object.fromEntries(list.map(v => [v.id, v])));
  };

  function onRowClick(row: TypeProductDTO) {
    setKey((e) => ({ ...e, [row.id]: e[row.id] ? undefined : row }));
  };

  const selectedRowKeys = useMemo(() => {
    const keys: number[] = [];
    Object.entries(key).forEach(([k, v]) => v && keys.push(Number(k)));
    return keys;
  }, [key]);

  return (
    <>
      <Tooltip title={disabled ? '' : '请先选择供应商'}>
        <Button
          onClick={onVisible}
          disabled={!disabled}>
          批量新增
        </Button>
      </Tooltip>

      <Modal
        onOk={onSumbit}
        visible={visible}
        title='批量选择产品'
        onCancel={onVisible}
        className={styles.modal}>

        <div className={styles.select}>
          <Input
            allowClear
            value={name}
            onChange={onInputChange}
            placeholder='请输入产品名称'
          />
          <span>当前已选：{selectedRowKeys.length}</span>
        </div>

        <Table
          size='middle'
          dataSource={list}
          columns={columns}
          pagination={false}
          scroll={{ y: 500 }}
          rowKey={DB_PRIMARY_KEY}
          expandable={{ expandedRowRender: r => <PreviewPicture pictures={r.pictures} /> }}
          onRow={(row) => ({ onClick: () => onRowClick(row) })}
          rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
        />
      </Modal>
    </>
  );
};

export default ProductBatchAdd;
