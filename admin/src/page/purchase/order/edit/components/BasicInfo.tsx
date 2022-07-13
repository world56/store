import { useStore } from '@/hooks';
import styles from '../index.module.sass';
import SwitchSupplier from './SwitchSupplier';
import Categorys from "@/components/Categorys";
import { FormHideKey } from '@/components/Form';
import { Form, Row, Col, Input, Card } from "antd";

import { ENUM_STORE } from "@/enum/store";
import { ENUM_PURCHASE } from '@/enum/purchase';

export const rules = [{ required: true }];

/**
 * @name BasicInfo 基本信息
 */
const BasicInfo = () => {

  const { category } = useStore();

  return (
    <Card title='基本信息'>
      <Form.Item shouldUpdate>
        {(form) => {
          const id = form.getFieldValue('id');
          const logisticsCompanyId = form.getFieldValue('logisticsCompanyId');
          const showLogistics = form.getFieldValue('shippingMethod')
            === ENUM_PURCHASE.SUPPLIER_SHIPPING_METHOD.LOGISTICS;

          return <Row gutter={24}>

            <FormHideKey />
            <FormHideKey name='name' />

            <Col span={8}>
              <Form.Item
                rules={rules}
                label='所属供应商'
                name='supplierId'
                tooltip='采购订单只能选择固定唯一的供应商'>
                <SwitchSupplier disabled={id} form={form} category={category.PURCHASE_SUPPLIER} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                rules={rules}
                label='结算方式'
                name='settlement'
                tooltip='确定结算方式后不得更改'>
                <Categorys.Select disabled={id} type={ENUM_STORE.CATEGORY_DEFAULT.SUPPLIER_SETTLEMENT} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label='运输方式' name='shippingMethod' rules={rules}>
                <Categorys.Select type={ENUM_STORE.CATEGORY_DEFAULT.SUPPLIER_SHIPPING_METHOD} />
              </Form.Item>
            </Col>

            {showLogistics ? <Col span={8}>
              <Form.Item
                label={<>
                  <span>物流（快递）公司</span>
                  <Categorys type={ENUM_STORE.CATEGORY.LOGISTSCS_COMPANY} />
                </>}
                className={styles.func}
                name='logisticsCompanyId'>
                <Categorys.Select type={ENUM_STORE.CATEGORY.LOGISTSCS_COMPANY} />
              </Form.Item>
            </Col> : null}

            {logisticsCompanyId ? <Col span={8}>
              <Form.Item label='物流（快递）单号' name='shippingNoteNumber'>
                <Input placeholder="清输入物流（快递）单号" />
              </Form.Item>
            </Col> : null}

            <Col span={24}>
              <Form.Item label='备注' name='remark'>
                <Input.TextArea placeholder="清输入备注" allowClear />
              </Form.Item>
            </Col>

          </Row>
        }}
      </Form.Item>
    </Card>
  );
};

export default BasicInfo;
