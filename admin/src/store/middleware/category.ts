import * as API from "@/api/enum";
import ActionsMiddleware from "./actions";
import { toCategorys } from "@/utils/format";
import { ActiosnsCategory } from "../category";
import { all, call, put, takeEvery } from "redux-saga/effects";

import { ENUM_STORE } from "@/enum/store";

import type { TypeCommon } from "@/interface/common";
import type { PayloadAction } from "@reduxjs/toolkit/dist";
import type {
  TypeCategorysState,
  TypeCategorysBusiness,
  TypeCategorysUserDefind,
} from "../category";

type TypeCategorysBusinessKeys = keyof TypeCategorysBusiness;
type TypeCategorysUserDefindKeys = keyof TypeCategorysUserDefind;

export const REQUEST = {
  [ENUM_STORE.CATEGORY.ROLE]: API.getRoleSelectList,
  [ENUM_STORE.CATEGORY.SPEC]: API.getSpecAllParameter,
  [ENUM_STORE.CATEGORY.ADMIN_USER]: API.getAllAdminUserList,
  [ENUM_STORE.CATEGORY.DEPARTMENT]: API.getAllDepartmentList,
  [ENUM_STORE.CATEGORY.WAREHOUSE_POSITION]: API.getWarehouseAllList,
  [ENUM_STORE.CATEGORY.PURCHASE_SUPPLIER]: API.getPurchaseSupplierList,
};

function* handlerCategory(
  action: PayloadAction<
    `${ENUM_STORE.CATEGORY}`[],
    ENUM_STORE.ACTION_CATEGORY.QUERY
  >,
) {
  try {
    const data: Partial<TypeCategorysState> = {} as const;
    const batch: Array<TypeCategorysBusinessKeys> = [];
    const type: TypeCategorysUserDefindKeys[] = [];
    for (const key of action.payload) {
      if (REQUEST.propertyIsEnumerable(key)) {
        batch.push(key as TypeCategorysBusinessKeys);
      } else {
        type.push(key as TypeCategorysUserDefindKeys);
      }
    }
    if (type.length) {
      const list: Array<TypeCommon.Category[]> = yield call(
        API.getCategoryList,
        { type },
      );
      list.forEach((v, i) => (data[type[i]] = toCategorys(v)));
    }
    if (batch.length) {
      const list: TypeCategorysBusiness[keyof TypeCategorysBusiness][][0]["LIST"][] =
        yield all(batch.map((v) => call(REQUEST[v])));
      list.forEach((v = [], i) => (data[batch[i]] = toCategorys(v as [])));
    }
    yield put(ActiosnsCategory.setCategory({ data }));
  } catch (e) {
    console.log(e);
  }
}

export default function* SagaDictionaries() {
  yield takeEvery(ActionsMiddleware.getCategory.type, handlerCategory);
}
