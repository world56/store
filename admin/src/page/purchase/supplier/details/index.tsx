import { Tabs } from 'antd';
import Logs from './components/Logs';
import styles from './index.module.sass';
import { useParams } from "react-router-dom";
import BasicInfo from './components/BasicInfo';

import type { TypeCommon } from '@/interface/common';

const { TabPane } = Tabs;

/**
 * @name SupplierDetails 供应商详情
 */
const SupplierDetails = () => {

  const routeParam = useParams<TypeCommon.DatabaseMainParameter<string>>();
  const id = parseInt(routeParam.id);

  return (
    <Tabs defaultActiveKey="1" className={styles.tabs}>
      <TabPane tab="基本详情" key="1">
        <BasicInfo id={id} />
      </TabPane>

      <TabPane tab="供应产品" key="2" />

      <TabPane tab="数据分析" key="3" />

      <TabPane tab="跟进日志" key="4">
        <Logs id={id} />
      </TabPane>

    </Tabs>
  );
};

export default SupplierDetails;
