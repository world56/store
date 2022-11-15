import {
  insertWarehousePosition,
  updateWarehousePosition,
  checkWarehousePositionName,
  getWarehousePositionDetails,
} from "@/api/warehouse";
import { Modal } from "@/layout/PopUp";
import { Form, Input, message, Select } from "antd";
import { useGetDetails, useCategorys } from "@/hooks";
import { FormHideKey, FormValueCheck } from "@/components/Form";

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
  const { ADMIN_USER, WAREHOUSE_STATUS } = useCategorys();

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
      open={visible}
      title='编辑仓位'
      onOk={onSumbit}
      loading={loading}
      onCancel={onCancel}>
      <Form form={form} {...formStyle}>

        <FormHideKey />

        <FormValueCheck
          id={id}
          name='name'
          label="仓位名称"
          placeholder="请输入仓位名称"
          checkFieldsFn={checkWarehousePositionName} />

        <Form.Item name='personId' label='负责人' rules={rules}>
          <Select
            allowClear
            showSearch
            optionFilterProp='children'
            placeholder='请选择仓位负责人'
          >
            {ADMIN_USER?.LIST?.map(v => <Option key={v.id} value={v.id}>{v.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label='状态'
          name='status'
          rules={rules}
          initialValue={ENUM_WAREHOUSE.WAREHOUSE_STATUS.NORMAL}>
          <Select
            showSearch
            optionFilterProp='children'
            placeholder='请选择仓位状态'
          >
            {WAREHOUSE_STATUS?.LIST?.map(v => <Option key={v.id} value={v.id}>{v.name}</Option>)}
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
