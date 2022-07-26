import { forwardRef } from 'react';
import SelectProduct from './Select';
import ProductBatchAdd from './Batch';
import styles from './index.module.sass';
import { Button, Popconfirm } from "antd";

import type { TypeSelectProductSelectKey } from './Select';
import type { TypeSupplierProduct } from "@/interface/purchase/product";

export type TypeProductDTO = Pick<TypeSupplierProduct.DTO, 'id' | 'name' | 'pictures' | 'spec'>;

export interface TypeQueryProductProps<T = TypeProductDTO> {
  list?: T[];
  /** @name onCreate 请求 */
  onCreate?(name?: string): void;
  /** @name onChange 选择的目标对象 */
  onChange?(val: T[]): void;
  /** @name onReset 重置 */
  onReset?(): void;
  /** @param disabled 是否可进行搜索 */
  disabled?: boolean;
  /** @param width Select框长度 */
  width?: number;
  /** @param 布局朝向 */
  flex?: 'right' | 'left';
};

interface QueryProductComponentsProps extends React.ForwardRefRenderFunction<
  TypeSelectProductSelectKey,
  TypeQueryProductProps
> {
  Select: typeof SelectProduct;
  Batch: typeof ProductBatchAdd;
};

/**
 * @name QueryProduct 查询、选择产品
 */
const QueryProduct: QueryProductComponentsProps = ({
  width,
  onReset,
  flex: justifyContent = 'right',
  ...restProps
}, ref) => (
  <div className={styles.func} style={{ justifyContent }}>
    <SelectProduct {...restProps} width={width} ref={ref} />
    <ProductBatchAdd {...restProps} />
    <Popconfirm onConfirm={onReset} title='确定操作？'>
      <Button danger>重置</Button>
    </Popconfirm>
  </div>
);

QueryProduct.Select = SelectProduct;
QueryProduct.Batch = ProductBatchAdd;

export default forwardRef(QueryProduct);
