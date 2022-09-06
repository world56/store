import { Tabs } from 'antd';
import { GoBack } from '@/layout/Button';
import styles from './index.module.sass';
import { useParams } from "react-router-dom";
import BasicInfo from './components/BasicInfo';

import type { TypeCommon } from '@/interface/common';

const { TabPane } = Tabs;

interface TypeSuplierProductDetailsRouteParam extends Partial<TypeCommon.DatabaseMainParameter<string>> { }

/**
 * @name SuplierProductDetails 供应商产品详情
 */
const SuplierProductDetails = () => {

  const routeParam = useParams<TypeSuplierProductDetailsRouteParam>();
  const id = parseInt(routeParam.id!);

  return (
    <>
      <Tabs defaultActiveKey="1" className={styles.layout}>
        <TabPane tab="基本详情" key="1">
          <BasicInfo id={id} />
        </TabPane>
        {/* <TabPane tab="数据统计" key="2" /> */}
      </Tabs>
      <GoBack />
    </>
  );
};

export default SuplierProductDetails;
