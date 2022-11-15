import Supplier from './Supplier';
import Products from './Products';
import { Button, Tabs } from 'antd';
import BasicInfo from './BasicInfo';
import Logs from '@/components/Logs';
import { Modal } from "@/layout/PopUp";
import { useGetDetails } from '@/hooks';
import styles from './index.module.sass';
import { memo, useMemo, useState } from 'react';
import { SyncOutlined } from '@ant-design/icons';
import StatisticsBanner from "../StatisticsBanner";
import { purchaseWaitWarehoused } from '@/utils/status';
import { getWarehouseAuditPurchaseDetails } from '@/api/warehouse';

import { ENUM_COMMON } from '@/enum/common';

import type { ModalProps } from 'antd/lib/modal';
import type { TypePurchaseOrder } from '@/interface/purchase/order';
import type { TypeWarehouseWarehousing } from '@/interface/warehouse/warehousing';

interface TypePurchaseOrderProps {
  /**
   * @param id 入库单ID
   */
  id?: TypeWarehouseWarehousing.DTO['id'];
  /** 
   * @name onClose 关闭弹窗
   */
  onClose(): void;
  /**
   * @param children 扩展Modal Footer按钮
   */
  children?: ModalProps['footer'];
};

export interface TypeOrderStatisticsProps extends Pick<TypePurchaseOrder.DTO, 'actualTotal' | 'actualTotalPrice'> {
  /**
   * @param show 是否计算显示真实际到货数量、总价
   */
  show: boolean;
  /**
   * @param className 统计结果样式
   */
  className: string;
};

const { calculation } = StatisticsBanner;

const width: Record<string, number> = {
  '0': 1000, // 基本信息
  '1': 1800, // 采购产品列表
  '2': 1200, // 供应商
  '3': 700 // 日志
};

/**
 * @name PurchaseOrder 采购订详情
 * @description 用于查看采购订单相关信息
 */
const PurchaseOrder: React.FC<TypePurchaseOrderProps> = ({ id, onClose, children }) => {

  const open = Boolean(id);

  const [activeKey, setActiveKey] = useState('0');

  const { value, loading, run } = useGetDetails(async () => {
    const params = { warehousingOrderId: id! };
    return await getWarehouseAuditPurchaseDetails(params);
  }, [id]);

  function onCancel() {
    setActiveKey('0');
    onClose();
  };

  const statistics = useMemo(() => {
    let className = styles.uncountered;
    let actualTotal = 0; // 实际总数
    let actualTotalPrice = 0; // 实际总价格
    const show = !purchaseWaitWarehoused(value?.order!); // 已清点
    if (show) {
      const [total, totalPrice] = calculation(value?.order.products, 'actualQuantity');
      actualTotal = value?.order?.actualTotal || total;
      actualTotalPrice = (value?.order?.actualTotalPrice || totalPrice || 0) / 100;
      className = Number(value?.order?.total) !== actualTotal ? styles.actualDifference : '';
    }
    return { show, className, actualTotal, actualTotalPrice };
  }, [value]);

  return (
    <Modal
      open={open}
      title='采购详情'
      loading={loading}
      onCancel={onCancel}
      destroyOnClose={open}
      width={width[activeKey]}
      className={styles.layout}
      footer={<>
        <Button disabled={loading} icon={<SyncOutlined spin={loading} />} onClick={run}>刷新</Button>
        {children}
        <Button onClick={onCancel}>关闭</Button>
      </>}>
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        items={[
          {
            key: '0',
            label: '基本信息',
            forceRender: true,
            children: <BasicInfo data={value?.order}  {...statistics} />,
          },
          {
            key: '1',
            label: '采购列表',
            children: <Products order={value?.order} {...statistics} />,
          },
          {
            key: '2',
            label: '供应商',
            children: <Supplier data={value?.order?.supplier} />,
          },
          {
            key: '3',
            label: '日志',
            children: <Logs id={id} module={ENUM_COMMON.LOG_MODULE.PURCHASE} />
          },
        ]}
      />
    </Modal>
  );
};

/**
 * @name shouldComponentUpdate 防止传递React.children导致组件重复渲染
 * @description Modal footer 可以新增审核组件（业务）
 */
function shouldComponentUpdate(prev: TypePurchaseOrderProps, next: TypePurchaseOrderProps) {
  return prev.id === next.id;
};

export default memo(PurchaseOrder, shouldComponentUpdate);
