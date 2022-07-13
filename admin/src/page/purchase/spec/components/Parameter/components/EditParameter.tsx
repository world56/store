import { Input, Form } from "antd";
import { formNestedFields } from '@/utils';
import styles from '../../../index.module.sass';
import { FormValueCheck } from "@/components/Form";
import { checkSpecParameterFields } from "@/api/purchase";

import type { TypeSpec } from "@/interface/purchase/spec";
import type { FormListFieldData } from 'antd/es/form/FormList';
import type { FormInstance } from 'antd/lib/form/hooks/useForm';

interface TypeEditSpecParameterItemProps {
  itemProps: FormListFieldData;
  form: FormInstance<TypeSpec.EditSpecParameter>;
};

/**
 * @name EditParameter 编辑规格详情
 */
const EditParameter: React.FC<TypeEditSpecParameterItemProps> = ({ form, itemProps }) => {

  const { id } = form.getFieldValue('parameter')[itemProps.name];

  return (
    <div className={styles.item}>
      <div>
        <span>*</span>
        规格（{itemProps.name + 1}）
      </div>
      <FormValueCheck
        id={id}
        placeholder='请输入规格名'
        checkFieldsFn={checkSpecParameterFields}
        {...formNestedFields(itemProps, 'name')}
      />
      <Form.Item {...formNestedFields(itemProps, 'remark')}>
        <Input placeholder="规格备注" />
      </Form.Item>
    </div>
  );
};

export default EditParameter;
