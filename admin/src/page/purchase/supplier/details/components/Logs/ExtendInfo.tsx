import styles from '../../index.module.sass';

import type { TypePurchaseSupplier } from "@/interface/purchase/supplier";

interface TypeSupplierExtendInfoProps {
  data: TypePurchaseSupplier.LogDTO;
};

/**
 * @name ExtendInfo 扩展信息
 */
const ExtendInfo: React.FC<TypeSupplierExtendInfoProps> = ({ data }) => (
  <div className={styles.extendInfo}>
    <span>{data.content}</span>
  </div>
);

export default ExtendInfo;
