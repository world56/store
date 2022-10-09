import { Spin, Tabs } from 'antd';
import { useGetDetails } from '@/hooks';
import styles from './index.module.sass';
import { GoBack } from '@/layout/Button';
import Logs from '@/components/Logs/Logs';
import Products from './components/Products';
import BasicInfo from './components/BasicInfo';
import { getPurchaseOrderDetails } from '@/api/purchase';
import { useParams, useSearchParams } from 'react-router-dom';

import { ENUM_COMMON } from '@/enum/common';

import type { TypeCommon } from '@/interface/common';
import type { TypePurchaseOrder } from '@/interface/purchase/order';

const { TabPane } = Tabs;

interface TypePurchaseOrderRouteParam extends Partial<TypeCommon.DatabaseMainParameter<string>> { }

export interface TypePurchaseOrderDetailsDisplayProps {
  data?: TypePurchaseOrder.DTO;
};

/**
 * @name PurchaseOrderDetails
 */
const PurchaseOrderDetails = () => {

  const params = useParams<TypePurchaseOrderRouteParam>();
  const id = parseInt(params.id!)

  const { value, loading } = useGetDetails(() => getPurchaseOrderDetails({ id }), [id]);

  const [query, setQuery] = useSearchParams({ activeKey: '1' },);

  function onChange(activeKey: string) {
    setQuery({ activeKey }, { replace: true });
  };

  return (
    <Spin spinning={loading}>
      <Tabs
        onChange={onChange}
        className={styles.layout}
        defaultActiveKey={query.get('activeKey')!}>
        <TabPane tab="基本详情" key="1">
          <BasicInfo data={value} />
        </TabPane>
        <TabPane tab="采购产品" key="2">
          <Products data={value} />
        </TabPane>
        <TabPane tab="跟踪日志" key="3">
          <Logs id={id} module={ENUM_COMMON.LOG_MODULE.PURCHASE} />
        </TabPane>
      </Tabs>
      <GoBack />
    </Spin>
  );
};

export default PurchaseOrderDetails;
