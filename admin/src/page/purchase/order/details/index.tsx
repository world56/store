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
        defaultActiveKey={query.get('activeKey')!}
        items={[
          {
            key: '1',
            label: '基本详情',
            children: <BasicInfo data={value} />,
          },
          {
            key: '2',
            label: '采购产品',
            children: <Products data={value} />,
          },
          {
            key: '3',
            label: '跟踪日志',
            children: <Logs id={id} module={ENUM_COMMON.LOG_MODULE.PURCHASE} />
          },
        ]}
      />
      <GoBack />
    </Spin>
  );
};

export default PurchaseOrderDetails;
