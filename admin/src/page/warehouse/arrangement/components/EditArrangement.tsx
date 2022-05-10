import Modal from "@/layout/Modal";
import { FormHideKey } from "@/components/Form";
import { useGetDetails, useStore } from "@/hooks";
import { Form, Input, message, Select } from "antd";
import {
  insertWarehouseArrangement,
  updatetWarehouseArrangement,
  getWarehouseArrangementDetails,
} from "@/api/warehouse";

import { ENUM_WAREHOUSE } from "@/enum/warehouse";

import type { TypeCommon } from "@/interface/common";
import type { TypeWarehouseArrangement } from "@/interface/warehouse/arrangement";

interface TypeEditArrangementProps extends Partial<TypeCommon.DatabaseMainParameter> {
  visible: boolean;
  onClose(): void;
};

const { Option } = Select;
const rules = [{ required: true }];
const formStyle = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

/**
 * @name EditArrangement 编辑仓位
 */
const EditArrangement: React.FC<TypeEditArrangementProps> = ({ id, visible, onClose }) => {

  const [form] = Form.useForm<TypeWarehouseArrangement.DTO>();
  const { dictionaries: { ADMIN_USER, WAREHOURE_STATUS } } = useStore();

  const { loading } = useGetDetails(async () => {
    const data = await getWarehouseArrangementDetails({ id: id! });
    form.setFieldsValue(data);
  }, [id, form]);

  async function onSumbit() {
    const values = await form.validateFields();
    if (id) await updatetWarehouseArrangement(values);
    else await insertWarehouseArrangement(values);
    message.success('操作成功');
    onCancel();
  };

  function onCancel() {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title='编辑仓位'
      onOk={onSumbit}
      loading={loading}
      visible={visible}
      onCancel={onCancel}>
      <Form form={form} {...formStyle}>

        <FormHideKey />

        <Form.Item name='name' label='仓位名称' rules={rules}>
          <Input placeholder="请输入仓位名称" />
        </Form.Item>

        <Form.Item name='personId' label='负责人' rules={rules}>
          <Select
            allowClear
            showSearch
            optionFilterProp='children'
            placeholder='请选择仓位负责人'
          >
            {ADMIN_USER?.LIST?.map(v => <Option key={v.key} value={v.key}>{v.value}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label='状态'
          name='status'
          rules={rules}
          initialValue={ENUM_WAREHOUSE.STATUS.NORMAL}>
          <Select
            showSearch
            optionFilterProp='children'
            placeholder='请选择仓位状态'
          >
            {WAREHOURE_STATUS?.LIST?.map(v => <Option key={v.key} value={v.key}>{v.value}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item name='remark' label='备 注'>
          <Input.TextArea placeholder="请输入备注" />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default EditArrangement;
