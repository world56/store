import { memo } from "react";
import { Modal } from "@/layout/PopUp";
import { useGetDetails } from '@/hooks';
import styles from './index.module.sass';
import { Status } from "@/components/Status";
import Categorys from "@/components/Categorys";
import { Descriptions, Button, Image } from "antd";
import { getSupplierProductDetails } from '@/api/purchase';

import { STATIC_RESOURCE } from '@/config/request'

import { TypeSupplierProduct } from '@/interface/purchase/product';

interface TypeProductDetailsProps extends Partial<Pick<TypeSupplierProduct.DTO, 'id'>> {
  onClose(): void;
}

/**
 * @name ProductDetails 产品详情（采购）
 */
const ProductDetails: React.FC<TypeProductDetailsProps> = ({ id, onClose }) => {

  const { value, loading } = useGetDetails(async () => {
    return await getSupplierProductDetails({ id: id! });
  }, [id]);

  function onSkip() {
    window.open(`/purchase/supplierProductDetails/${id}`);
  };

  return (
    <Modal
      width={800}
      title='产品详情'
      loading={loading}
      open={Boolean(id)}
      className={styles.layout}
      onCancel={() => onClose()}
      footer={[
        <Button onClick={onSkip} key='0'>更多详情</Button>,
        <Button onClick={() => onClose()} key='1'>关闭</Button>,
      ]}>

      <Descriptions bordered size='middle' layout="vertical">

        <Descriptions.Item span={3} label="名称">
          {value?.name}
        </Descriptions.Item>

        <Descriptions.Item label="品牌">
          {value?.brand?.name}
        </Descriptions.Item>
        <Descriptions.Item label="单位">
          {value?.unit?.name}
        </Descriptions.Item>
        <Descriptions.Item label="状态">
          <Status status={value?.status} />
        </Descriptions.Item>

        <Descriptions.Item label="类目" span={3}>
          <Categorys.Tag maxWidth={720} list={value?.category} />
        </Descriptions.Item>

        <Descriptions.Item label="规格" span={3}>
          <Categorys.Tag list={value?.spec} />
        </Descriptions.Item>

        <Descriptions.Item label="备注" span={3} className={styles.context}>
          {value?.remark || '无'}
        </Descriptions.Item>

        <Descriptions.Item span={3} label="图片" >
          <Image.PreviewGroup>
            {value?.pictures.map(v => <Image key={v.id} width='23.9%' src={`${STATIC_RESOURCE}/${v.path}`} />)}
          </Image.PreviewGroup>
        </Descriptions.Item>

      </Descriptions>

    </Modal>
  );
};

export default memo(ProductDetails);
