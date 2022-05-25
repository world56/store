import { Form, Input } from "antd";

import { DB_PRIMARY_KEY } from '@/config/db';
import { TypeCommon } from "@/interface/common";


interface TypeFormNameCheckProps extends Partial<TypeCommon.DatabaseMainParameter> {
  /** @param name 字段英文名 */
  name: string;
  /** @param label 字段中文名 */
  label: string;
  /** @name checkFieldsFn 检测字段接口 */
  checkFieldsFn: (param: Partial<TypeCommon.DatabaseMainParameter> & any) => Promise<boolean>;
};

/**
 * @name FormValueCheck Form表单Input输入检测 校验字段是否重复
 */
const FormValueCheck: React.FC<TypeFormNameCheckProps> = ({ id, name, label, checkFieldsFn }) => {

  async function checkField(field: string, value: string) {
    const bol = await checkFieldsFn({ [DB_PRIMARY_KEY]: id!, [field]: value });
    return bol ? Promise.reject('该字符已被占用，请更换后重试') : bol;
  };

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        { required: true, message: `${label}不得为空` },
        { validator: async (r, v: string) => checkField(name, v) }
      ]}>
      <Input placeholder="请输入供应商名称" allowClear />
    </Form.Item>
  );
};

export default FormValueCheck;
