import {
  insertSpecTemplate,
  updateSpecTemplate,
  getSpecTemplateDetails,
  checkSpecTemplateFields,
} from '@/api/purchase';
import { useGetDetails } from '@/hooks';
import { Drawer } from "@/layout/PopUp";
import styles from '../../index.module.sass';
import { SpecServiceToFrom } from '../../utils';
import { Form, Input, Select, Tooltip } from "antd";
import { filterOptionTooltip } from '@/utils/filter';
import { FormHideKey, FormValueCheck } from "@/components/Form";

import type { TypeCommon } from "@/interface/common";
import type { TypeSpec } from '@/interface/purchase/spec';

export interface TypeEditSpecTemplateProps extends Partial<TypeCommon.DatabaseMainParameter> {
  visible: boolean;
  onClose(): void;
  spec?: TypeCommon.Store['category']['SPEC'];
};

const { Option } = Select;
const selectShow = { keepParent: false };
/**
 * @name EditTemplate 编辑规格
 */
const EditTemplate: React.FC<TypeEditSpecTemplateProps> = ({
  id,
  spec,
  visible,
  onClose
}) => {

  const [form] = Form.useForm<TypeSpec.EditDTO>();

  async function onSumbit() {
    const values = await form.validateFields();
    if (id) await updateSpecTemplate(values);
    else await insertSpecTemplate(values);
    onCancel();
  };

  const { loading } = useGetDetails(async () => {
    const data = await getSpecTemplateDetails({ id: id! });
    form.setFieldsValue(SpecServiceToFrom(data));
  }, [id, form]);

  function onCancel() {
    form.resetFields();
    onClose();
  };

  return (
    <Drawer
      width={550}
      open={visible}
      title='编辑规格模板'
      loading={loading}
      onSumbit={onSumbit}
      onCancel={onCancel}
      className={styles.edit}>
      <Form form={form} layout='vertical'>
        <FormHideKey />
        <FormValueCheck
          id={id}
          name='name'
          label="规格类目"
          placeholder="请输入规格类目（例：鞋码）"
          checkFieldsFn={checkSpecTemplateFields} />
        <Form.Item name='parameter' label='关联规格参数'>
          <Select
            showSearch
            allowClear
            mode='multiple'
            optionFilterProp="children"
            placeholder='请选择该模板关联的规格'
            filterOption={filterOptionTooltip}>
            {spec?.LIST?.map(v => <Option key={v.id} value={v.id} >
              <Tooltip title={v.remark} destroyTooltipOnHide={selectShow}>
                <p>{v.name}</p>
              </Tooltip>
            </Option>)}
          </Select>
        </Form.Item>

        <Form.Item name='remark' label='规格说明'>
          <Input.TextArea placeholder="请输入规格说明" rows={5} allowClear />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditTemplate;

