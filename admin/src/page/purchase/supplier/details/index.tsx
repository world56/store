import { Tabs } from 'antd';
import Logs from './components/Logs';
import styles from './index.module.sass';
import { GoBack } from '@/layout/Button';
import BasicInfo from './components/BasicInfo';
import { useParams, useSearchParams } from "react-router-dom";
import SupplierProductList from "@/page/purchase/product/list";

import type { TypeCommon } from '@/interface/common';
import SupplierOrder from '../../order/list';

const { TabPane } = Tabs;

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
        defaultActiveKey={query.get('activeKey')!}>
        <TabPane tab="基本详情" key="1">
          <BasicInfo id={id} />
        </TabPane>

        <TabPane tab="供应产品" key="2">
          <SupplierProductList supplierId={id} />
        </TabPane>

        <TabPane tab="付款账号" key="3">
        </TabPane>

        <TabPane tab="采购记录" key="4">
          <SupplierOrder supplierId={id} />
        </TabPane>

        <TabPane tab="数据分析" key="5" />

        <TabPane tab="跟进日志" key="6">
          <Logs id={id} />
        </TabPane>

      </Tabs>
      <GoBack />
    </>
  );
};

export default SupplierDetails;
