import { toTime } from '@/utils/format';
import styles from './index.module.sass';
import { Descriptions, Tooltip } from "antd";
import { Status } from '@/components/Status';
import Categorys from '@/components/Categorys';

import type { TypePurchaseSupplier } from "@/interface/purchase/supplier";

const { Item } = Descriptions;

interface TypeSupplierProps {
  data?: TypePurchaseSupplier.DTO;
}

/**
 * @name Supplier 供应商简介
 */
const Supplier: React.FC<TypeSupplierProps> = ({ data }) => {

  function onJumpSupplier() {
    window.open(`/purchase/supplierDetails/${data?.id}`);
  };

  return (
    <div className={styles.card}>
      <Descriptions bordered column={1}>
        <Item label="公司名称">
          <Tooltip title='点击查看供应商详情'>
            <span
              onClick={onJumpSupplier}
              className='processing cp'>
              {data?.name}
            </span>
          </Tooltip>
        </Item>
        <Item label="公司电话">{data?.phone}</Item>
        <Item label="公司地址">{data?.address}</Item>
        <Item label="经营类型">
          <Categorys.Tag list={data?.category!} />
        </Item>
        <Item label="合作状态">
          <Status status={data?.status} />
        </Item>
        <Item label="创建时间">{toTime(data?.createTime)}</Item>
        <Item label="备 注">{data?.remark}</Item>
      </Descriptions>

      {data?.contacts.map((v, i) => <Descriptions
        bordered
        key={v.id}
        column={3}
        size='small'
        className={styles.contacts}
      >
        <Item label={<>联系人 <span>({i + 1})</span></>}>{v.name}</Item>
        <Item label="联系电话">{v.phone}</Item>
        <Item label="备注">
          <Tooltip title={v.remark}>
            {v.remark}
          </Tooltip>
        </Item>
      </Descriptions>)}
    </div>
  );
}

export default Supplier;
