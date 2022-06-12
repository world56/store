import {
  insertsSpecParameter,
  updatesSpecParameter,
  getSpecParameterDetails
} from "@/api/purchase";
import { Form, message } from "antd";
import { Drawer } from "@/layout/PopUp";
import { useGetDetails } from "@/hooks";
import EditParameter from "./EditParameter";
import { PopUpAddBtn } from "@/layout/Button";
import styles from '../../../index.module.sass';

import type { TypeCommon } from "@/interface/common";
import type { TypeSpec } from "@/interface/purchase/spec";

interface TypeEditSpecParameterProps {
  ids: TypeCommon.DatabaseMainParameter['id'][];
  visible: boolean;
  onClose(): void;
}

/**
 * @name EditSpecParameter 编辑规格参数
 */
const EditSpecParameter: React.FC<TypeEditSpecParameterProps> = ({
  ids,
  visible,
  onClose
}) => {

  const [form] = Form.useForm<TypeSpec.EditSpecParameter>();

  const { loading } = useGetDetails(async () => {
    if (ids.length) {
      const data = await getSpecParameterDetails({ ids });
      form.setFieldsValue({ parameter: data });
    }
  }, [visible, ids, form]);

  async function onSumbit() {
    const values = await form.validateFields();
    if (ids.length) await updatesSpecParameter(values);
    else await insertsSpecParameter(values);
    message.success('操作成功');
    onClose();
  };

  function addSpecParameterItem() {
    const value = form.getFieldValue('parameter');
    value.push({});
    form.setFields([{ name: 'parameter', value }]);
  };

  function onCancel() {
    form.resetFields();
    onClose();
  };

  const isAdd = visible && !ids.length;

  return (
    <Drawer
      visible={visible}
      loading={loading}
      onCancel={onCancel}
      onSumbit={onSumbit}
      className={styles.edit}
      title={`${isAdd ? '新增' : '编辑'}产品规格`}>
      <Form form={form}>
        <Form.List name='parameter' initialValue={[{}]}>
          {(fields) => fields.map(field => <EditParameter form={form} key={field.key} itemProps={field} />)}
        </Form.List>
        {isAdd ? <PopUpAddBtn onClick={addSpecParameterItem}>新增规格参数</PopUpAddBtn> : null}
      </Form>
    </Drawer>
  );
};

export default EditSpecParameter;
