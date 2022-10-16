import { useContext } from "react";
import { Modal } from "@/layout/PopUp";
import context from "../../../context";
import { useGetDetails } from "@/hooks";
import { FooterButton } from "@/layout/Button";
import styles from '../../../index.module.sass';
import { TypeCommon } from "@/interface/common";
import { FormHideKey } from "@/components/Form";
import { SyncOutlined } from '@ant-design/icons';
import { Button, Form, message, Select } from "antd";
import { specParameterServiceToFrom } from '../../../utils';
import { getSpecParameterDetails, updatesSpecParameterRelation } from "@/api/purchase";

import type { TypeSpec } from "@/interface/purchase/spec";

interface TypeRelationCategoryProps extends Partial<TypeCommon.DatabaseMainParameter> {
  onClose(): void;
};

/**
 * @name RelationCategory 关联类目
 */
const RelationCategory: React.FC<TypeRelationCategoryProps> = ({ id, onClose }) => {

  const [form] = Form.useForm<TypeSpec.ParameterRelationCategory>();

  const { category } = useContext(context);

  const { loading: load } = useGetDetails(async () => {
    const [data] = await getSpecParameterDetails({ ids: [id!] });
    form.setFieldsValue(specParameterServiceToFrom(data));
  }, [id, form]);

  async function onSumbit() {
    const values = await form.validateFields();
    await updatesSpecParameterRelation(values);
    message.success('操作完成');
    onCancel();
  };

  function onCancel() {
    form.resetFields();
    onClose();
  };

  const footer = (
    <FooterButton onSumbit={onSumbit} onCancel={onCancel}>
      <Button onClick={category?.run} icon={<SyncOutlined />}>更新类目</Button>
    </FooterButton>
  );

  return (
    <Modal
      loading={load}
      footer={footer}
      title='规格所属类目'
      open={Boolean(id)}
      onCancel={onCancel}
      className={styles.selectCategory}>
      <Form form={form}>
        <FormHideKey />
        <Form.Item name='spec'>
          <Select mode='multiple' loading={category?.loading} allowClear placeholder='请选择所属类目'>
            {category?.data?.map(v => <Select.Option key={v.id} value={v.id}>{v.name}</Select.Option>)}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RelationCategory;
