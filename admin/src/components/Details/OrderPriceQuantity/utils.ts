interface TypeCalculationOrderPriceQuantity {
  /**
   * @param unitPrice 采购单价
   */
  unitPrice?: number;
  /**
   * @param quantity 采购数量
   */
  quantity?: number;
  /**
   * @param actualQuantity 实际到货数量
   */
  actualQuantity?: number;
}

/**
 * @name calculation 计算总数量、总价格
 */
export function calculation<
  T extends TypeCalculationOrderPriceQuantity,
  K extends Exclude<keyof TypeCalculationOrderPriceQuantity, "unitPrice">,
>(list: T[] = [], key?: K) {
  const keys = key ?? "quantity";
  let total = 0;
  let totalPrice = 0;
  for (const val of list) {
    const num = val[keys]!;
    total += num || 0;
    totalPrice +=
      parseInt(((val.unitPrice || 0) * 100).toString()) * (num || 0);
  }
  return [total, totalPrice / 100];
}
