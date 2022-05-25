import {
  insertWarehousePosition,
  updateWarehousePosition,
  getWarehousePositionDetails,
} from "@/api/warehouse";
import { Modal } from "@/layout/PopUp";
import { FormHideKey } from "@/components/Form";
import { useGetDetails, useStore } from "@/hooks";
import { Form, Input, message, Select } from "antd";

import { ENUM_WAREHOUSE } from "@/enum/warehouse";

import type { TypeCommon } from "@/interface/common";
import type { TypeWarehousePosition } from "@/interface/warehouse/position";

interface TypeEditPositionProps extends Partial<TypeCommon.DatabaseMainParameter> {
  visible: boolean;
  onClose(): void;
};

const { Option } = Select;
const rules = [{ required: true }];
const formStyle = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

/**
 * @name EditPosition 编辑仓位
 */
const EditPosition: React.FC<TypeEditPositionProps> = ({ id, visible, onClose }) => {

  const [form] = Form.useForm<TypeWarehousePosition.DTO>();
  const { category: { ADMIN_USER, WAREHOURE_STATUS } } = useStore();

  const { loading } = useGetDetails(async () => {
    const data = await getWarehousePositionDetails({ id: id! });
    form.setFieldsValue(data);
  }, [id, form]);

  async function onSumbit() {
    const values = await form.validateFields();
    if (id) await updateWarehousePosition(values);
    else await insertWarehousePosition(values);
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

export default EditPosition;
