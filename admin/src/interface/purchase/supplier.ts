import { ENUM_COMMON } from "@/enum/common";
import { ENUM_PURCHASE } from "@/enum/purchase";

import type { TypeCommon } from "../common";
import type { TypeSystemUser } from "../system/user";

/**
 * @name TypePurchaseSupplier 采购管理-供应商
 */
export namespace TypePurchaseSupplier {
  /**
   * @name DTO 供应商
   * @param contacts 联系人
   * @param type 供应类型
   * @param createTime 创建时间
   */
  export interface DTO
    extends Record<"phone" | "address", string>,
      Pick<TypeCommon.DTO, "id" | "name" | "category" | "status" | "remark"> {
    createTime: string;
    contacts: Contacts[];
    files: TypeCommon.File[];
  }

  /**
   * @name Query 查询
   * @param contactsName 联系名称
   * @param phone 联系人电话
   */
  export interface Query
    extends Pick<DTO, "name" | "category" | "status">,
      TypeCommon.PageTurning {
    contactsName: string;
  }

  /**
   * @name Contacts 联系人
   * @param name 名称
   * @param phone 联系电话
   * @param remark 备注
   */
  export interface Contacts
    extends Record<"phone", string>,
      Pick<TypeCommon.DTO, "name" | "remark">,
      TypeCommon.DatabaseMainParameter {}

  /**
   * @name EditDTO 编辑供应商
   */
  export interface EditDTO extends Omit<DTO, "category"> {
    category: number[];
  }

  /**
   * @name LogDTO 供应商日志
   * @param content 内容（原因）
   * @param user 用户信息
   * @param type 日志类型
   */
  export interface LogDTO extends Pick<TypeCommon.DTO, "id" | "createTime"> {
    /** @param type 日志类型 */
    content: string;
    type: ENUM_PURCHASE.SUPPLIER_LOG_TYPE;
    user: Pick<TypeSystemUser.DTO, "id" | "name" | "avatar">;
  }

  /** @name QueryLog 查询日志列表 */
  export interface QueryLog extends Partial<Pick<LogDTO, "id" | "type">> {}

  /**
   * @name EditStatus 改变供应商状态
   * @param status 状态 激活、冻结
   */
  export interface EditStatus extends Omit<LogDTO, "type"> {
    status: ENUM_COMMON.STATUS;
  }

  /**
   * @name AddFile 新增文件
   */
  export interface AddFile extends TypeCommon.DatabaseMainParameter {
    file: TypeCommon.File;
  }
}
