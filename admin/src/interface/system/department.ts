import type { TypeCommon } from "../common";
import type { TypeSystemUser } from "./user";

/**
 * @name TypeSystemDepartment 系统管理-部门
 */
export namespace TypeSystemDepartment {
  /**
   * @name QueryList 查询部门列表
   */
  export interface QueryList extends Partial<DTO>, TypeCommon.PageTurning {}

  /**
   * @name DTO 部门基本信息
   */
  export interface DTO extends Pick<TypeCommon.DTO, "id" | "name" | "remark"> {
    users: TypeSystemUser.DTO[];
  }

  /**
   * @name EditDTO 编辑部门
   */
  export interface EditDTO extends Omit<DTO, "users"> {
    users: Array<TypeCommon.DatabaseMainParameter["id"]>;
  }
}
