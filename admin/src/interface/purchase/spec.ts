import { TypeCommon } from "../common";

/**
 * @name TypeSpec 采购管理-产品规格模板
 */
export namespace TypeSpec {
  /**
   * @name Query 查询产品规格列表
   */
  export interface Query
    extends Partial<Pick<DTO, "name" | "status">>,
      TypeCommon.PageTurning {}

  /**
   * @name DTO 产品规格模板DTO
   */
  export interface DTO
    extends Pick<TypeCommon.DTO, "id" | "name" | "status" | "remark"> {
    parameter: SpecParameterDTO[];
  }

  /**
   * @name EditDTO 编辑产品规格模板
   */
  export interface EditDTO extends Omit<DTO, "parameter"> {
    parameter: number[];
  }

  /**
   * @name ChangeStatus 改变规格状态
   * @description 被冻结后无法选择
   */
  export interface ChangeStatus extends Pick<DTO, "id" | "status"> {}

  /**
   * @name CheckFields 检查规格名称是否重复
   */
  export interface CheckFields extends Pick<DTO, "id" | "name"> {}

  /**
   * @name SpecParameterDTO 产品规格参数
   */
  export interface SpecParameterDTO
    extends Pick<TypeCommon.DTO, "id" | "name" | "remark" | "createTime"> {
    spec: DTO[];
  }

  /**
   * @name EditSpecParameter 编辑产品规格（列表）
   */
  export interface EditSpecParameter {
    parameter: SpecParameterDTO[];
  }

  /**
   * @name ParameterRelationCategory 关联类目
   */
  export interface ParameterRelationCategory
    extends Pick<SpecParameterDTO, "id"> {
    spec: number[];
  }
}
