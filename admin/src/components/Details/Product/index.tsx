import { memo } from "react";
import Status from "@/layout/Status";
import { useGetDetails } from '@/hooks';
import styles from './index.module.sass';
import Categorys from "@/components/Categorys";
import { Modal, Descriptions, Button } from "antd";
import { getSupplierProductDetails } from '@/api/purchase';

import { TypeSupplierProduct } from '@/interface/purchase/product';

interface TypeProductDetailsProps extends Partial<Pick<TypeSupplierProduct.DTO, 'id'>> {
  onClose(): void;
}

/**
 * @name ProductDetails 产品详情（采购）
 */
const ProductDetails: React.FC<TypeProductDetailsProps> = ({ id, onClose }) => {

  const { value } = useGetDetails(async () => {
    return await getSupplierProductDetails({ id: 1 });
  }, [id]);

  function onSkip() {
    window.open(`/purchase/supplierProductDetails/${id}`);
  };

  return (
    <Modal
      title='产品详情'
      visible={Boolean(id)}
      className={styles.layout}
      onCancel={() => onClose()}
      footer={[
        <Button onClick={onSkip} key='0'>详情</Button>,
        <Button onClick={() => onClose()} key='1'>关闭</Button>,
      ]}>

      <Descriptions layout="vertical" bordered size='middle'>
        <Descriptions.Item span={3} label="产品名称">
          {value?.name}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions
        bordered
        size='middle'
        layout="vertical">
        <Descriptions.Item label="品牌">
          {value?.brand?.name}
        </Descriptions.Item>
        <Descriptions.Item label="单位">
          {value?.unit?.name}
        </Descriptions.Item>
        <Descriptions.Item label="状态">
          <Status status={value?.status} />
        </Descriptions.Item>
      </Descriptions>

      <Descriptions
        bordered
        size='middle'
        layout="vertical">
        <Descriptions.Item label="类目" span={3}>
          <Categorys.Tag maxWidth={720} list={value?.category} />
        </Descriptions.Item>

        <Descriptions.Item label="规格" span={3}>
          <Categorys.Tag maxWidth={720} list={value?.spec} />
        </Descriptions.Item>

        <Descriptions.Item label="备注" span={3}>
          {value?.remark || '无'}
        </Descriptions.Item>
        <Descriptions.Item span={3} label="图片">
          LI-NING 女小童飞䲜小童运动鞋YKNS082-4
        </Descriptions.Item>
      </Descriptions>


    </Modal>
  );
};

export default memo(ProductDetails);
