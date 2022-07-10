interface TypeCalculationOrderPriceQuantityDefaultParam {
  unitPrice?: number;
  quantity?: number;
}

/**
 * @name calculation 计算总数量、总价格
 */
export function calculation<
  T extends TypeCalculationOrderPriceQuantityDefaultParam,
>(list: T[] = []) {
  let total = 0;
  let totalPrice = 0;
  for (const val of list) {
    total += val.quantity || 0;
    totalPrice +=
      parseInt(((val.unitPrice || 0) * 100).toString()) * (val.quantity || 0);
  }
  return { total, price: totalPrice / 100 };
}
