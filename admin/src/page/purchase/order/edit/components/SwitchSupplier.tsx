import { Select, Modal } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';

import type { FormInstance } from "rc-field-form";
import type { TypeCommon } from '@/interface/common';

interface TypeSwitchSupplierProps {
  value?: number;
  form: FormInstance;
  onChange?(val?: number): void;
  category?: TypeCommon.Dictionaries;
};

const { Option } = Select;

/**
 * @name SwitchSupplier 切换供应商
 */
const SwitchSupplier: React.FC<TypeSwitchSupplierProps> = ({
  form,
  value,
  category,
  onChange,
}) => {

  function onSelectChange(e: number) {
    const products = form.getFieldValue('products');
    if (products?.length) {
      Modal.confirm({
        title: '警告！',
        icon: <ExclamationCircleOutlined />,
        content: '切换供应商会导致当前已选"产品列表"清空',
        onOk: () => {
          form.setFields([{ name: 'products', value: [] }]);
          onChange?.(e);
        }
      });
    } else {
      onChange?.(e);
    }
  };

  return (
    <Select
      showSearch
      value={value}
      onChange={onSelectChange}
      placeholder='请选择所属供应商'>
      {category?.LIST.map(v => <Option key={v.id} value={v.id}>{v.name}</Option>)}
    </Select>
  );
};

export default SwitchSupplier;
