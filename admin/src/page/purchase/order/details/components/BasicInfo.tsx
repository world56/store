import { Btn } from '@/layout/Button';
import { toTime } from '@/utils';
import { Card, Descriptions } from 'antd';
import { useHistory } from 'react-router-dom';

import type { TypePurchaseOrderDetailsDisplayProps } from '..';

const { Item } = Descriptions;

/**
 * @name BasicInfo 基本信息
 */
const BasicInfo: React.FC<TypePurchaseOrderDetailsDisplayProps> = ({ data }) => {

  const history = useHistory();

  function onSkipSupplier() {
    history.push(`/purchase/supplierDetails/${data?.supplier?.id}`);
  };

  return (
    <>
      <Card title='基本信息'>
        <Descriptions bordered column={1}>
          <Item label="供应商名称">
            <Btn onClick={onSkipSupplier}>{data?.supplier?.name}</Btn>
          </Item>
          <Item label="创建人">{data?.creator?.name}</Item>
          <Item label="创建时间">{toTime(data?.createTime)}</Item>
          <Item label="备 注">{data?.remark}</Item>
        </Descriptions>
      </Card>
    </>
  );
};

export default BasicInfo;
