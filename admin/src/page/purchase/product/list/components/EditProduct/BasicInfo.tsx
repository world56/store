import { useEffect } from 'react';
import { useActions, useStore } from '@/hooks';
import Categorys from "@/components/Categorys";
import { Switch } from '@/components/Formatting';
import SelectSpec from '@/components/SpecTemplate';
import { Form, Input, Select, Tooltip } from "antd";
import { filterOptionTooltip } from '@/utils/filter';
import { checkSupplierProductFields } from '@/api/purchase';
import { FormHideKey, FormValueCheck } from "@/components/Form";

import { ENUM_STORE } from "@/enum/store";
import { ENUM_COMMON } from '@/enum/common';

import type { TypeEditProductProps } from ".";
import type { FormInstance } from 'antd/lib/form';
import type { TypeCommon } from '@/interface/common';
import type { TypeSupplierProduct } from "@/interface/purchase/product";

interface TypeProductBasicInfo extends Pick<TypeEditProductProps, 'id' | 'supplierId'> {
  form: FormInstance<TypeSupplierProduct.EditDTO>;
};

const { Option } = Select;
const selectShow = { keepParent: false };

/**
 * @name BasicInfo 产品基本信息
 */
const BasicInfo: React.FC<TypeProductBasicInfo> = ({ id, supplierId, form }) => {

  const actions = useActions();
  const { category: { SPEC, PURCHASE_SUPPLIER } } = useStore();

  function onSelectSpec(ids: TypeCommon.DatabaseMainParameter['id'][]) {
    const spec: number[] = form.getFieldValue('spec') || [];
    form.setFieldsValue({ spec: [...new Set([...spec, ...ids])] });
  };

  useEffect(() => {
    actions.getCategory([ENUM_STORE.CATEGORY.SPEC]);
  }, [actions]);

  return (
    <>
      <FormHideKey />

      <FormValueCheck
        id={id}
        name='name'
        label="产品名称"
        checkFieldsFn={checkSupplierProductFields}
      />

      <Form.Item
        name='brandId'
        rules={[{ required: true, message: '请选择产品品牌' }]}
        label={<>
          <span>品牌</span>
          <Categorys type={ENUM_STORE.CATEGORY.PRODUCT_BRAND} />
        </>}>
        <Categorys.Select type={ENUM_STORE.CATEGORY.PRODUCT_BRAND} />
      </Form.Item>

      <Form.Item
        name='category'
        rules={[{ required: true, message: '请选择供应商产品类型' }]}
        label={<>
          <span>产品类型</span>
          <Categorys type={ENUM_STORE.CATEGORY.PURCHASE_PRODUCT_TYPE} />
        </>}>
        <Categorys.Select mode='multiple' type={ENUM_STORE.CATEGORY.PURCHASE_PRODUCT_TYPE} />
      </Form.Item>

      <Form.Item
        name='unitId'
        rules={[{ required: true, message: '请选择计量单位类型' }]}
        label={<>
          <span>计量单位</span>
          <Categorys type={ENUM_STORE.CATEGORY.WAREHOUSE_UNIT} />
        </>}>
        <Categorys.Select type={ENUM_STORE.CATEGORY.WAREHOUSE_UNIT} />
      </Form.Item>

      <Form.Item
        name='spec'
        tooltip='例如服装规格 S M L XL'
        rules={[{ required: true, message: '请选产品规格' }]}
        label={<>
          <span>产品规格</span>
          <SelectSpec onChange={onSelectSpec} />
        </>}>
        <Select
          showSearch
          allowClear
          mode='multiple'
          optionFilterProp="children"
          placeholder='请选择该模板关联的规格'
          filterOption={filterOptionTooltip}>
          {SPEC?.LIST?.map(v => <Option key={v.id} value={v.id} >
            <Tooltip title={v.remark} destroyTooltipOnHide={selectShow}>
              <p>{v.name}</p>
            </Tooltip>
          </Option>)}
        </Select>
      </Form.Item>

      <Form.Item
        label='供应商'
        name='supplier'
        tooltip='产品可以有多个供应商参与供应'
        rules={[{ required: true, message: '请选择供应商' }]}
        initialValue={supplierId ? [supplierId] : undefined}>
        <Select
          showSearch
          allowClear
          mode='multiple'
          optionFilterProp="children"
          disabled={Boolean(supplierId)}
          placeholder='请选择该模板关联的规格'>
          {PURCHASE_SUPPLIER?.LIST?.map(v => <Option key={v.id} value={v.id}>{v.name}</Option>)}
        </Select>
      </Form.Item>

      <Form.Item
        label="状态"
        name='status'
        tooltip='冻结后无法对该产品发起采购'
        initialValue={ENUM_COMMON.STATUS.ACTIVATE}>
        <Switch />
      </Form.Item>

      <Form.Item name="remark" label="备注">
        <Input.TextArea rows={4} allowClear placeholder='请输入相关备注（选填）' />
      </Form.Item>

    </>
  );
}

export default BasicInfo;
