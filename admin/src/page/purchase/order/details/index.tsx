import { Spin, Tabs } from 'antd';
import { useGetDetails } from '@/hooks';
import styles from './index.module.sass';
import BasicInfo from './components/BasicInfo';
import { useRouteMatch } from 'react-router-dom';
import { getPirchaseOrderDetails } from '@/api/purchase';

import type { TypePurchaseOrder } from '@/interface/purchase/order';

const { TabPane } = Tabs;

interface TypePurchaseOrderRouteParam extends Pick<TypePurchaseOrder.DTO, 'id'> { }

export interface TypePurchaseOrderDetailsDisplayProps {
  data?: TypePurchaseOrder.DTO;
};

/**
 * @name PurchaseOrderDetails
 */
const PurchaseOrderDetails = () => {

  const { params: { id } } = useRouteMatch<TypePurchaseOrderRouteParam>();

  const { value, loading } = useGetDetails(async () => {
    return await getPirchaseOrderDetails({ id });
  }, [id]);

  console.log(value);

  return (
    <Spin spinning={loading}>
      <Tabs defaultActiveKey="1" className={styles.layout}>
        <TabPane tab="基本详情" key="1">
          <BasicInfo data={value} />
        </TabPane>
      </Tabs>
    </Spin>
  );
};

export default PurchaseOrderDetails;
