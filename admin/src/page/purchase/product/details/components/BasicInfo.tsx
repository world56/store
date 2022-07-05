import { useRequest } from 'ahooks';
import styles from '../index.module.sass';
import Categorys from '@/components/Categorys';
import StatusColor from '@/layout/StatusColor';
import { getSupplierProductDetails } from '@/api/purchase';
import { Carousel, Card, Image, Descriptions, Table } from 'antd';

import { DB_PRIMARY_KEY } from '@/config/db';
import { STATIC_RESOURCE } from '@/config/request';

import type { TypeCommon } from '@/interface/common';

const { Item } = Descriptions;

const specColumns = [
  { key: 'name', dataIndex: 'name', title: '参数名称' },
  { key: 'remark', dataIndex: 'remark', title: '备注' },
];

const supplierColumns = [
  { key: 'name', dataIndex: 'name', title: '供应商名称' },
  { key: 'remark', dataIndex: 'remark', title: '备注' },
];

interface TypeSupplierProductBasicInfoProps extends TypeCommon.DatabaseMainParameter { }

/**
 * @name BasicInfo 供应产品基本信息
 */
const BasicInfo: React.FC<TypeSupplierProductBasicInfoProps> = ({ id }) => {

  const { data } = useRequest(() => getSupplierProductDetails({ id }));

  return (
    <>
      <Card title='产品详情' className={styles.basic}>
        <Descriptions bordered column={1}>
          <Item label="产品名称">{data?.name}</Item>
          <Item label="品牌">{data?.brand?.name}</Item>
          <Item label="计量单位">{data?.unit?.name}</Item>
          <Item label="所属类目">
            <Categorys.Tag list={data?.category!} />
          </Item>
          <Item label="当前状态">
            <StatusColor status={data?.status} />
          </Item>
          <Item label="备 注">{data?.remark}</Item>
        </Descriptions>
        <Image.PreviewGroup>
          <Carousel autoplay>
            {data?.pictures?.map(v => <Image key={v.id} src={`${STATIC_RESOURCE}/${v.path}`} />)}
          </Carousel>
        </Image.PreviewGroup>
      </Card>

      <Card title='产品规格'>
        <Table
          size='middle'
          pagination={false}
          scroll={{ y: 300 }}
          columns={specColumns}
          rowKey={DB_PRIMARY_KEY}
          dataSource={data?.spec} />
      </Card>

      <Card title='供应商'>
        <Table
          size='middle'
          pagination={false}
          scroll={{ y: 300 }}
          rowKey={DB_PRIMARY_KEY}
          columns={supplierColumns}
          dataSource={data?.supplier} />
      </Card>
    </>
  );
};

export default BasicInfo;
