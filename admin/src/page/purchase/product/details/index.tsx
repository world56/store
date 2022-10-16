import { Tabs } from 'antd';
import { GoBack } from '@/layout/Button';
import styles from './index.module.sass';
import { useParams } from "react-router-dom";
import BasicInfo from './components/BasicInfo';

import type { TypeCommon } from '@/interface/common';

interface TypeSuplierProductDetailsRouteParam extends Partial<TypeCommon.DatabaseMainParameter<string>> { }

/**
 * @name SuplierProductDetails 供应商产品详情
 */
const SuplierProductDetails = () => {

  const routeParam = useParams<TypeSuplierProductDetailsRouteParam>();
  const id = parseInt(routeParam.id!);

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        className={styles.layout}
        items={[
          {
            key: '1',
            label: '基本详情',
            children: <BasicInfo id={id} />,
          },
          // { key: '2', label: '数据统计', children: null }
        ]}
      />
      <GoBack />
    </>
  );
};

export default SuplierProductDetails;
