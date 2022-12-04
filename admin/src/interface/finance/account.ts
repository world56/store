import type { TypeCommon } from "../common";
import type { TypePurchaseSupplier } from "../purchase/supplier";

/**
 * @name TypeFinancePaymentAccount 财务管理-供应商首款账户
 */
export namespace TypeFinancePaymentAccount {
  /**
   * @name DTO 供应商收款账户
   * @param accountName 收款人名称
   * @param accountNumber 收款人账户
   * @param supplierId 供应商ID
   * @param organizationId 账户类型（比如支付宝、各种银行）
   * @param supplier 供应商DTO
   */
  export interface DTO extends Pick<TypeCommon.DTO, "id" | "remark"> {
    accountName: string;
    accountNumber: string;
    supplierId: TypeCommon.PrimaryKey;
    organizationId: TypeCommon.PrimaryKey;
    supplier: TypePurchaseSupplier.DTO;
  }

  /**
   * @name Query 查询供应商首款账户列表
   */
  export interface Query
    extends TypeCommon.PageTurning,
      Partial<
        Pick<
          DTO,
          "accountName" | "accountNumber" | "supplierId" | "organizationId"
        >
      > {}
}
