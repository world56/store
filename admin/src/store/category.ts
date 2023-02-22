import { createSlice } from "@reduxjs/toolkit";

import { ENUM_STORE } from "@/enum/store";
import { REQUEST } from "./middleware/category";
import { CONSTANT_SYSTEM } from "@/constant/system";
import { CONSTANT_COMMON } from "@/constant/common";
import { CONSTANT_FINANCE } from "@/constant/finance";
import { CONSTANT_PURCHASE } from "@/constant/purchase";
import { CONSTANT_WAREHOUSE } from "@/constant/warehouse";

import type { TypeCommon } from "@/interface/common";
import type { PayloadAction } from "@reduxjs/toolkit/dist";

interface TypeDictionaries<T> {
  OBJ: Record<number, T>;
  LIST: Array<T>;
}

export type TypeCategorysBusiness = {
  [I in keyof typeof REQUEST]: Partial<
    TypeDictionaries<Awaited<ReturnType<typeof REQUEST[I]>>[0]>
  >;
};

export type TypeCategorysUserDefind = Record<
  Exclude<`${ENUM_STORE.CATEGORY}`, `${keyof typeof REQUEST}`>,
  TypeDictionaries<TypeCommon.Category>
>;

export interface TypeCategorysState
  extends Partial<TypeCategorysUserDefind>,
    Partial<TypeCategorysBusiness>,
    Required<typeof DEFAULT_DICTIONARY> {}

export const DEFAULT_DICTIONARY = {
  ...CONSTANT_COMMON,
  ...CONSTANT_SYSTEM,
  ...CONSTANT_FINANCE,
  ...CONSTANT_PURCHASE,
  ...CONSTANT_WAREHOUSE,
};

const categorySlice = createSlice({
  name: "CATEGORYS",
  initialState: DEFAULT_DICTIONARY as TypeCategorysState,
  reducers: {
    setCategory(
      state: TypeCategorysState,
      action: PayloadAction<{ data: Partial<TypeCategorysState> }>,
    ) {
      return { ...state, ...action.payload.data };
    },
  },
});

const ActiosnsCategory = categorySlice.actions;

export { categorySlice, ActiosnsCategory };

export default categorySlice.reducer;
