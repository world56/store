import type { TypeCommon } from "../common";

import { ENUM_SYSTEM } from "@/enum/system";
import { ENUM_COMMON } from "@/enum/common";

/**
 * @name TypeSystemPermission 系统管理-权限
 */
export namespace TypeSystemPermission {
  /**
   * @name DTO 权限基本信息
   * @param name 中文名称
   * @param code 英文名称
   * @param parentId 所属模块
   * @param type 权限类型
   * @param status 激活状态
   * @param fStatus 父级激活状态
   * @param remark 备注
   */
  export interface DTO extends TypeCommon.DTO {
    code: string;
    type: ENUM_SYSTEM.PERMISSION_TYPE;
    fStatus: ENUM_COMMON.STATUS;
  }

  /**
   * @name QueryList 获取-权限管理列表
   */
  export interface QueryList extends Pick<DTO, "name" | "status"> {}

  /**
   * @name CheckFields 检查字段是否重复
   */
  export interface CheckFields extends Partial<Pick<DTO, "id" | "name">> {}
}
