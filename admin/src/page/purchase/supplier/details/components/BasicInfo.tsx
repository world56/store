import { toTime } from '@/utils';
import { useGetDetails } from '@/hooks';
import Uploads from '@/components/Uploads';
import Categorys from '@/components/Categorys';
import StatusColor from '@/layout/StatusColor';
import { Card, Descriptions, message } from "antd";
import { addPurchaseSupplierFile, getPurchaseSupplierDetails } from '@/api/purchase';

import type { TypeCommon } from '@/interface/common';

const { Item } = Descriptions;

/**
 * @name BasicInfo 供应商基本信息
 */
const BasicInfo: React.FC<TypeCommon.DatabaseMainParameter> = ({ id }) => {

  const { value, run } = useGetDetails(async () => {
    return await getPurchaseSupplierDetails({ id });
  }, [id]);

  async function onUpload(file: TypeCommon.File) {
    await addPurchaseSupplierFile({ id, file });
    message.success('上传成功');
    run();
  };

  return (
    <>
      <Card title='供应商信息'>
        <Descriptions bordered column={1}>
          <Item label="公司名称">{value?.name}</Item>
          <Item label="公司电话">{value?.phone}</Item>
          <Item label="公司地址">{value?.address}</Item>
          <Item label="经营类型">
            <Categorys.Tag list={value?.category!} />
          </Item>
          <Item label="合作状态">
            <StatusColor status={value?.status} />
          </Item>
          <Item label="创建时间">{toTime(value?.createTime)}</Item>
          <Item label="备 注">{value?.remark}</Item>
        </Descriptions>
      </Card>

      <Card title='联系人'>
        {value?.contacts.map(v => <Descriptions key={v.id} size='small' bordered column={3}>
          <Item label="名称">{v.name}</Item>
          <Item label="联系电话">{v.phone}</Item>
          <Item label="备注">{v.remark}</Item>
        </Descriptions>)}
      </Card>

      <Card title='附件' extra={<Uploads.Single onFile={onUpload} type='any' />}>
        <Uploads.Table onCreate={run} list={value?.files} />
      </Card>

    </>
  );
};

export default BasicInfo;
