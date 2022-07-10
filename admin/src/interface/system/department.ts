import { TypeCommon } from "../common";

/**
 * @name TypeSystemDepartment 系统管理-部门
 */
export namespace TypeSystemDepartment {
  /**
   * @name DTO 部门基本信息
   */
  export interface DTO extends TypeCommon.DTO {}

  /**
   * @name QueryList 查询部门列表
   */
  export interface QueryList extends Partial<DTO>, TypeCommon.PageTurning {}

}
