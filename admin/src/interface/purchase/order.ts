import type { TypeSpec } from "./spec";
import type { TypeCommon } from "../common";
import type { TypeSupplierProduct } from "./product";
import type { TypeSystemUser } from "../system/user";
import type { TypePurchaseSupplier } from "./supplier";

import { ENUM_PURCHASE } from "@/enum/purchase";
import { ENUM_WAREHOUSE } from "@/enum/warehouse";
import { TypeWarehouseWarehousing } from "../warehouse/warehousing";

/**
 * @name TypePurchaseOrder  采购管理-采购订单
 */
export namespace TypePurchaseOrder {
  /**
   * @name DTO 采购订单DTO
   * @param estimatedDate 预计抵达时间
   * @param settlement 结算方式
   * @param shippingMethod 运输方式
   * @param shippingNoteNumber 物流单号
   * @param status 入库流程状态
   * @param supplierId 供应商ID
   * @param logisticsCompanyId 物流公司ID
   * @param products 采购产品列表
   * @param creator 订单创建人
   * @param supplier 供应商
   * @param logisticsCompany 物流公司名称
   * @param logs 状态日志
   * @param warehousing 入库流程详情
   * @param total 商品总量
   * @param totalPrice 总价
   */
  export interface DTO<T = TypeCommon.DatabaseMainParameter["id"]>
    extends TypeCommon.DatabaseMainParameter,
      Pick<TypeCommon.DTO, "remark" | "createTime"> {
    no?: string;
    estimatedDate: Date;
    shippingNoteNumber?: string;
    warehousing: TypeWarehouseWarehousing.DTO;
    settlement: ENUM_PURCHASE.SUPPLIER_SETTLEMENT;
    shippingMethod?: ENUM_PURCHASE.SUPPLIER_SHIPPING_METHOD;
    supplierId: T;
    logisticsCompanyId?: T;
    products: ProductDetails[];
    creator: TypeSystemUser.DTO;
    supplier: TypePurchaseSupplier.DTO;
    logisticsCompany: TypeCommon.Category;
    // logs: Log[];
    total: number;
    totalPrice: number;
    actualTotal?: number;
    actualTotalPrice?: number;
  }

  /**
   * @name ProductDetails 选购产品详情
   * @param quantity 采购量
   * @param unitPrice 单价
   * @param specId 规格
   * @param productId 产品ID
   * @param productOrderId 采购单号
   * @param product 供应商产品详情
   * @param purchaseOrder 订单详情
   * @param actualQuantity 实际数量
   */
  export interface ProductDetails
    extends Pick<DTO, "supplierId">,
      Pick<TypeCommon.DTO, "id" | "remark">,
      Record<"quantity" | "unitPrice", number>,
      Record<"specId" | "productId", TypeCommon.DatabaseMainParameter["id"]> {
    purchaseOrder: DTO;
    productOrderId: string;
    actualQuantity?: number;
    spec: TypeSpec.SpecParameterDTO;
    product: TypeSupplierProduct.DTO;
  }

  // /**
  //  * @name Log 状态日志
  //  * @param productId 供应产品ID
  //  * @param purchaseOrderId 采购单ID
  //  * @param voucher 凭证（例如付款凭证）
  //  * @param purchaseOrder 采购单详情
  //  * @param remark 备注
  //  */
  // export interface Log<T = TypeCommon.DatabaseMainParameter["id"]>
  //   extends Pick<TypeCommon.DTO, "id">,
  //     Pick<
  //       DTO,
  //       | "status"
  //       | "remark"
  //       | "createTime"
  //       | "shippingMethod"
  //       | "logisticsCompanyId"
  //     > {
  //   purchaseOrderId: T;
  //   voucher: TypeCommon.File[];
  //   productId: T;
  //   creator: TypeSystemUser.DTO;
  //   remark: string;
  //   purchaseOrder: DTO;
  // }

  /**
   * @name Query 查询采购订单列表
   * @param creatorId 创建人ID
   */
  export interface Query
    extends Partial<Pick<DTO, "id" | "supplierId">>,
      TypeCommon.PageTurning {
    status: ENUM_WAREHOUSE.WAREHOUSING_PROCESS;
    creatorId?: TypeCommon.DatabaseMainParameter["id"];
  }

  /**
   * @name EditDTO 编辑订单
   * @param products 选购产品列表
   */
  export interface EditDTO
    extends Omit<
      DTO,
      | "status"
      | "products"
      | "estimatedDate"
      | "creator"
      | "supplier"
      | "logisticsCompany"
      | "statusLog"
    > {
    products: Partial<
      Omit<
        ProductDetails,
        "spec" | "purchaseOrder" | "product" | "productOrderId"
      > & {
        name?: string; // 名称 （仅做显示）
        brand?: string; // 品牌 （仅做显示）
        unit?: string; // 单位 （仅做显示）
        surplus: number; // 剩余库存 （仅做显示）
        spec: ProductDetails["spec"][]; // 规格 （仅做显示）
      }
    >[];
  }
}
