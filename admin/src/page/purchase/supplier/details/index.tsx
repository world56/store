import { Tabs } from 'antd';
import BasicInfo from './BasicInfo';
import Logs from '@/components/Logs';
import { lazy, Suspense } from 'react';
import styles from './index.module.sass';
import { GoBack } from '@/layout/Button';
import Loading from '@/router/component/Loading';
import { useParams, useSearchParams } from "react-router-dom";

import { ENUM_COMMON } from '@/enum/common';

import type { TypeCommon } from '@/interface/common';

const SupplierOrder = lazy(() => import('../../order/list'));
const SupplierPaymentAccount = lazy(() => import('@/page/finance/account'));
const SupplierProductList = lazy(() => import("@/page/purchase/product/list"));

interface TypeSupplierDetailsRouteParam extends Partial<TypeCommon.DatabaseMainParameter<string>> { }

/**
 * @name SupplierDetails 供应商详情
 */
const SupplierDetails = () => {

  const routeParam = useParams<TypeSupplierDetailsRouteParam>();
  const id = parseInt(routeParam.id!);

  const [query, setQuery] = useSearchParams({ activeKey: '1' });

  function onChange(activeKey: string) {
    setQuery({ activeKey }, { replace: true });
  };

  return (
    <>
      <Tabs
        onChange={onChange}
        className={styles.layout}
        defaultActiveKey={query.get('activeKey')!}
        items={[
          {
            key: '1',
            label: '基本详情',
            children: <BasicInfo id={id} />
          },
          {
            key: '2',
            label: '供应产品',
            children: <Suspense fallback={<Loading />}>
              <SupplierProductList supplierId={id} />
            </Suspense>
          },
          {
            key: '3',
            label: '采购记录',
            children: <Suspense fallback={<Loading />}>
              <SupplierOrder supplierId={id} />
            </Suspense>
          },
          {
            key: '4',
            label: '付款账号',
            children: <Suspense fallback={<Loading />}>
              <SupplierPaymentAccount supplierId={id} />
            </Suspense>
          },
          {
            key: '5',
            label: '数据分析',
            children: null
          },
          {
            key: '6',
            label: '日志',
            children: <Logs id={id} module={ENUM_COMMON.LOG_MODULE.SUPPLIER} search spacing />
          }
        ]}
      />
      <GoBack />
    </>
  );
};

export default SupplierDetails;
