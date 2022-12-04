import { useCategorys } from "@/hooks";
import { Modal } from "@/layout/PopUp";
import { FormHideKey } from "@/components/Form";
import { auditWarehouse } from "@/api/warehouse";
import { AuditOutlined } from '@ant-design/icons';
import { memo, useEffect, useMemo, useState } from "react";
import { Button, Form, Input, message, Select } from "antd";

import { ENUM_WAREHOUSE } from "@/enum/warehouse";

import type { TypeCommon } from "@/interface/common";
import type { TypeWarehousingAudit } from "@/interface/warehouse/audit";
import type { TypeWarehouseWarehousing } from "@/interface/warehouse/warehousing";

type TypeFormWatchAuditType = TypeWarehousingAudit.AuditBusiness['status'];

interface TypeAuditBusiness extends Partial<Pick<TypeWarehouseWarehousing.DTO, 'id'>> {
  /**
   * @name onClose 关闭审核意见提交弹窗
   */
  onClose?(): void;
};

const { Option } = Select;

/**
 * @name AuditBusiness 审核业务
 * @description 审核 采购入库、审核入库等
 */
const AuditBusiness: React.FC<TypeAuditBusiness> = ({ id }) => {

  const { WAREHOUSING_AUDIT_STATUS } = useCategorys();

  const [auditId, setAuditId] = useState<TypeCommon.PrimaryKey>();

  const [form] = Form.useForm<TypeWarehousingAudit.AuditBusiness>();

  const AuditType = Form.useWatch<TypeFormWatchAuditType>('status', form);

  async function onSumbit() {
    const values = await form.validateFields();
    await auditWarehouse(values);
    message.success('操作成功');
    onCancel();
  };

  function onCancel() {
    form.resetFields();
    setAuditId(undefined);
  };

  function onAudit() {
    setAuditId(id!);
  };

  // 只能选择通、拒绝
  const AuditTypeList = useMemo(() => (
    WAREHOUSING_AUDIT_STATUS.LIST.filter(v => v.id !== ENUM_WAREHOUSE.WAREHOUSING_AUDIT_STATUS.PENDING)
  ), [WAREHOUSING_AUDIT_STATUS]);

  useEffect(() => {
    id && form.setFieldsValue({ id });
  }, [id, form]);

  const open = Boolean(auditId);

  const isReject = AuditType === ENUM_WAREHOUSE.WAREHOUSING_AUDIT_STATUS.REJECT;

  return (
    <>
      <Button onClick={onAudit} type="primary" icon={<AuditOutlined />}>审核</Button>
      <Modal title='审核意见' open={open} onOk={onSumbit} onCancel={onCancel}>
        <Form form={form} layout='vertical'>
          <FormHideKey />
          <Form.Item label='审核意见' name='status' rules={[{ required: true }]}>
            <Select placeholder='请选择审核意见'>
              {AuditTypeList.map(v => <Option key={v.id} value={v.id}>{v.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label='备注（原因）' name='remark' rules={isReject ? [{ required: true }] : undefined}>
            <Input.TextArea placeholder="请输入备注（原因、理由）" rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default memo(AuditBusiness);
