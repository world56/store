import { Modal } from "@/layout/PopUp";
import { useGetDetails } from '@/hooks';
import { FormHideKey } from '../../Form';
import styles from '../index.module.sass';
import { getCategoryName } from '../utils';
import { Form, Input, message } from 'antd';
import { DB_PRIMARY_KEY } from '@/config/db';
import { insertCategory, updateCategory, getCategoryDetails, checkCategoryFields } from '@/api/enum';

import { ENUM_STORE } from '@/enum/store';

import type { TypeCommon } from '@/interface/common';

export interface TypeEditUnitProps extends Partial<TypeCommon.DatabaseMainParameter> {
  /** @param visible 开启弹窗 */
  visible: boolean;
  /** @name onClose 关闭弹窗 */
  onClose(): void;
  /** @param type 类型 */
  type: ENUM_STORE.CATEGORY;
};

const rules = [{ required: true }];

/**
 * @name EditUnit 编辑单位
 */
const EditUnit: React.FC<TypeEditUnitProps> = ({ id, type, visible, onClose }) => {

  const [form] = Form.useForm<TypeCommon.Category>();

  async function onSumbit() {
    const values = await form.validateFields();
    if (id) await updateCategory(values);
    else await insertCategory(values);
    message.success('操作成功');
    onCancel();
  };

  const { loading } = useGetDetails(async () => {
    const data = await getCategoryDetails({ id: id! });
    form.setFieldsValue(data);
  }, [id, form]);

  function onCancel() {
    form.resetFields();
    onClose();
  };

  async function checkField(field: string, value: string) {
    const bol = await checkCategoryFields({ [DB_PRIMARY_KEY]: id, [field]: value, type });
    return bol ? Promise.reject('该字符已被占用，请更换后重试') : bol;
  };

  const name = `${getCategoryName(type)}类目`;

  return (
    <Modal
      onOk={onSumbit}
      visible={visible}
      loading={loading}
      onCancel={onCancel}
      className={styles.edit}
      title={`${id ? '编辑' : '新增'}${name}`}>
      <Form form={form} layout='vertical'>
        <FormHideKey />
        <FormHideKey name='type' initialValue={type} />
        <Form.Item label='单位名称' name='name' rules={[
          { required: true, message: '不得为空' },
          { validator: async (r, v: string) => checkField('name', v) }
        ]}>
          <Input placeholder={`请输入${name}名称`} allowClear />
        </Form.Item>
        <Form.Item label='单位备注' name='remark' rules={rules}>
          <Input.TextArea placeholder={`请输入${name}备注`} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUnit;
