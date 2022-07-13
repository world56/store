import { Form, Input } from "antd";

import { DB_PRIMARY_KEY } from '@/config/db';

import type { TypeCommon } from "@/interface/common";

interface TypeFormNameCheckProps extends Partial<TypeCommon.DatabaseMainParameter> {
  /** @param name 字段英文名 */
  name: string | React.Key[];
  /** @param fieldKey 针对Form.List */
  fieldKey?: string | React.Key[];
  /** @param label 字段中文名 */
  label?: string;
  /** @param placeholder 输入框提示 */
  placeholder?: string;
  /** @name checkFieldsFn 检测字段接口 */
  checkFieldsFn: (param: any) => Promise<boolean>;
  /** @param pattern 正则 */
  pattern?: RegExp;
};

/**
 * @name FormValueCheck Form表单Input输入检测 校验字段是否重复
 */
const FormValueCheck: React.FC<TypeFormNameCheckProps> = ({
  id,
  name,
  label,
  pattern,
  placeholder,
  checkFieldsFn,
}) => {

  async function checkField(field: React.Key, value: string) {
    const bol = await checkFieldsFn({ [DB_PRIMARY_KEY]: id!, [field]: value });
    return bol ? Promise.reject('该字符已被占用，请更换后重试') : bol;
  };

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        { required: true, message: placeholder, pattern },
        { validator: async (r, v: string) => checkField(Array.isArray(name) ? name[1] : name, v) }
      ]}>
      <Input placeholder={placeholder || `请输入${label}`} allowClear />
    </Form.Item>
  );
};

export default FormValueCheck;
