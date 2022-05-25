import { createSlice } from "@reduxjs/toolkit";

import { ENUM_STORE } from "@/enum/store";
import { CONSTANT_SYSTEM } from "@/constant/system";
import { CONSTANT_COMMON } from "@/constant/common";
import { CONSTANT_WAREHOURE } from "@/constant/warehouse";

import type { TypeCommon } from "@/interface/common";
import type { PayloadAction } from "@reduxjs/toolkit/dist";

export interface TypeCategoryState
  extends Partial<
    Record<
      `${ENUM_STORE.CATEGORY}` | keyof typeof DEFAULT_DICTIONARY,
      TypeCommon.Dictionaries
    >
  > {}

export const DEFAULT_DICTIONARY = {
  ...CONSTANT_COMMON,
  ...CONSTANT_SYSTEM,
  ...CONSTANT_WAREHOURE,
};

const categorySlice = createSlice({
  name: "CATEGORYS",
  initialState: DEFAULT_DICTIONARY as TypeCategoryState,
  reducers: {
    setCategory(state, action: PayloadAction<{ data: TypeCategoryState }>) {
      return { ...state, ...action.payload.data };
    },
  },
});

const ActiosnsCategory = categorySlice.actions;

export { categorySlice, ActiosnsCategory };

export default categorySlice.reducer;
