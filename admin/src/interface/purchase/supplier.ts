import { TypeCommon } from "../common";

/**
 * @name TypePurchaseSupplier 采购管理-供应商
 */
export namespace TypePurchaseSupplier {
  /**
   * @name Query 查询
   */
  export interface Query extends Pick<DTO, "name">, TypeCommon.PageTurning {}

  /**
   * @name Contacts 联系人
   * @param name 名称
   * @param phone 联系电话
   * @param address 地址
   * @param remark 备注
   */
  export interface Contacts
    extends Record<"phone", string>,
      Pick<TypeCommon.DTO, "name" | "remark">,
      TypeCommon.DatabaseMainParameter {
    address: string;
  }

  /**
   * @name DTO 供应商
   * @param contacts 联系人
   * @param type 供应类型
   */
  export interface DTO
    extends Pick<TypeCommon.DTO, "id" | "name" | "status" | "remark"> {
    contacts: Contacts[];
    type: TypeCommon.Category[];
  }

  /**
   * @name EditSupplierDTO 编辑供应商
   */
  export interface EditSupplierDTO extends Omit<DTO, "type"> {
    type: number[];
  }
}
