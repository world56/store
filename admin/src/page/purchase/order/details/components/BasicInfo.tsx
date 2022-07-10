import { toTime } from '@/utils';
import Status from '@/layout/Status';
import { Card, Descriptions } from 'antd';
import { NavLink } from 'react-router-dom';

import { ENUM_PURCHASE } from '@/enum/purchase';

import type { TypePurchaseOrderDetailsDisplayProps } from '..';

const { Item } = Descriptions;

/**
 * @name BasicInfo 基本信息
 */
const BasicInfo: React.FC<TypePurchaseOrderDetailsDisplayProps> = ({ data }) => {

  const isLgistics = data?.shippingMethod === ENUM_PURCHASE.SUPPLIER_SHIPPING_METHOD.LOGISTICS;

  return (
    <>
      <Card title='基本信息'>
        <Descriptions bordered column={1}>
          <Item label="订单号">{data?.id}</Item>
          <Item label="供应商名称">
            <NavLink to={`/purchase/supplierDetails/${data?.supplier?.id}`}>
              {data?.supplier?.name}
            </NavLink>
          </Item>
          <Item label="创建人">{data?.creator?.name}</Item>
          <Item label="创建时间">{toTime(data?.createTime)}</Item>
          <Item label="结算方式">
            <Status status={data?.settlement} matching={Status.type.PURCHASE_ORDER_SETTLEMENT} />
          </Item>
          <Item label="订单状态">
            <Status status={data?.status} matching={Status.type.PURCHASE_ORDER} />
          </Item>
          <Item label="采购数量">{data?.total || 0}</Item>
          <Item label="订单总价">{(data?.totalPrice || 0) / 100}元 </Item>
          <Item label="备 注">{data?.remark}</Item>
        </Descriptions>
      </Card>

      <Card title='供应商联系人'>
        {data?.supplier?.contacts.map(v => <Descriptions key={v.id} size='small' bordered column={3}>
          <Item label="名称">{v.name}</Item>
          <Item label="联系电话">{v.phone}</Item>
          <Item label="备注">{v.remark}</Item>
        </Descriptions>)}
      </Card>

      {isLgistics ? < Card title='物流（快递）信息'>
        <Descriptions bordered >
          <Item label="委托公司">{data?.logisticsCompany?.name}</Item>
          <Item label="业务单号">{data?.shippingNoteNumber}</Item>
        </Descriptions>
      </Card> : null}

    </>
  );
}

export default BasicInfo;
