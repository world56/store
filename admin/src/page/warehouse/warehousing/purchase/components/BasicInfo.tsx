import { useRequest } from "ahooks";
import Status from "@/layout/Status";
import { toTime } from "@/utils/format";
import { Card, Descriptions } from "antd";
import styles from '../index.module.sass';
import { getWarehousingInfo } from "@/api/warehouse";

import type { TypeWarehousingPurchaseQuery } from '../';

const { Item } = Descriptions;

/**
 * @name BasicInfo 采购单基本信息
 */
const BasicInfo: React.FC<TypeWarehousingPurchaseQuery> = ({ id }) => {

  const { data } = useRequest(() => getWarehousingInfo({ id }), { refreshDeps: [id] });

  return (
    <Card title='基本信息'>
      <Descriptions bordered column={1} className={styles.basic}>
        <Item label="流水号">{data?.no}</Item>
        <Item label="发起时间">{toTime(data?.createTime)}</Item>
        <Item label="入库清点人">{data?.inspector?.name || '-'}</Item>
        <Item label="入库类型">
          <Status status={data?.type} matching={Status.type.WAREHOUSING_TYPE} />
        </Item>
        <Item label="入库状态">
          <Status status={data?.status} matching={Status.type.WAREHOUSING_STATUS} />
        </Item>
        <Item label="备注">{data?.remark || '-'}</Item>
      </Descriptions>
    </Card>
  );
};

export default BasicInfo;
