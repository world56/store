import { Descriptions } from "antd";
import Status from '@/layout/Status';
import { useCategorys } from "@/hooks";
import { toTime } from "@/utils/format";
import styles from './index.module.sass';
import { Details, User } from '@/components/Tooltip';

import { ENUM_PURCHASE } from "@/enum/purchase";

import type { TypeOrderStatisticsProps } from ".";
import type { TypePurchaseOrder } from "@/interface/purchase/order";

interface TypeBasicInfoProps extends TypeOrderStatisticsProps {
  data?: TypePurchaseOrder.DTO;
};

const { ENUM_CATEGORY } = useCategorys;

/**
 * @name BasicInfo 采购单基本信息
 */
const BasicInfo: React.FC<TypeBasicInfoProps> = ({
  data,
  show,
  className,
  actualTotal,
  actualTotalPrice
}) => {

  const {
    ADMIN_USER,
    LOGISTSCS_COMPANY,
    PURCHASE_PROCESS_STATUS,
    PURCHASE_SHIPPING_METHOD,
    PURCHASE_SETTLEMENT_METHOD,
  } = useCategorys([ENUM_CATEGORY.ADMIN_USER, ENUM_CATEGORY.LOGISTSCS_COMPANY]);

  // 是否为物流快递
  const isLogistics = data?.shippingMethod === ENUM_PURCHASE.PURCHASE_SHIPPING_METHOD.LOGISTICS;

  return (
    <div className={styles.card}>

      <Descriptions bordered column={1}>
        <Descriptions.Item label="流水号">{data?.no}</Descriptions.Item>
        <Descriptions.Item label="订单状态">
          <Status status={data?.status} matching={PURCHASE_PROCESS_STATUS.OBJ} />
        </Descriptions.Item>
        <Descriptions.Item label="结算方式">
          <Status status={data?.settlement} matching={PURCHASE_SETTLEMENT_METHOD.OBJ} />
        </Descriptions.Item>
        <Descriptions.Item label="订单创建人">
          <User user={ADMIN_USER?.OBJ?.[data?.creatorId!]} />
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">{toTime(data?.createTime)}</Descriptions.Item>
        <Descriptions.Item label="运输方式">
          {PURCHASE_SHIPPING_METHOD?.OBJ[data?.shippingMethod!]?.name}
        </Descriptions.Item>
        <Descriptions.Item label="采购备注">{data?.remark || '无'}</Descriptions.Item>
      </Descriptions>

      <Descriptions bordered column={2} className={styles.horizontal}>
        <Descriptions.Item label="采购总量">{data?.total}</Descriptions.Item>
        <Descriptions.Item label="实到总量">
          <span className={className}>{show ? actualTotal : '未清点'}</span>
        </Descriptions.Item>
        <Descriptions.Item label="采购总价">{(data?.totalPrice || 0) / 100} 元</Descriptions.Item>
        <Descriptions.Item label="实际应付">
          <span className={className}>{show ? `${actualTotalPrice} 元` : '未清点'}</span>
        </Descriptions.Item>
      </Descriptions>

      {isLogistics ? <Descriptions bordered column={2} className={styles.horizontal}>
        <Descriptions.Item label="物流(快递)公司">
          <Details data={LOGISTSCS_COMPANY?.OBJ[data?.logisticsCompanyId!]} />
        </Descriptions.Item>
        <Descriptions.Item label="物流(快递)单号">{data?.shippingNoteNumber || '-'}</Descriptions.Item>
      </Descriptions> : null}

      <Descriptions bordered column={1}>
        <Descriptions.Item label="确认收货人">
          <User user={ADMIN_USER?.OBJ?.[data?.warehousing?.consigneeId!]} />
        </Descriptions.Item>
        <Descriptions.Item label="入库清点人">
          <User user={ADMIN_USER?.OBJ?.[data?.warehousing?.inspectorId!]} />
        </Descriptions.Item>
        <Descriptions.Item label="仓储备注">{data?.warehousing?.remark || '-'}</Descriptions.Item>
      </Descriptions>

      {/* <Descriptions bordered title="付款信息" column={1}>
        <Descriptions.Item label="结算方式">
          <Status status={data?.settlement} matching={Status.type.PURCHASE_ORDER_SETTLEMENT} />
        </Descriptions.Item>
        <Descriptions.Item label="打款人">申通快递</Descriptions.Item>
        <Descriptions.Item label="备注">192873912371283</Descriptions.Item>
      </Descriptions> */}
    </div>
  );
};

export default BasicInfo;
