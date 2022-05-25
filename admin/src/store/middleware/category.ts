import * as API from "@/api/enum";
import ActionsMiddleware from "./actions";
import { toDictionaries } from "@/utils";
import { ActiosnsCategory } from "../category";
import { all, call, put, takeEvery } from "redux-saga/effects";

import { ENUM_STORE } from "@/enum/store";

import type { TypeCategoryState } from "../category";
import type { PayloadAction } from "@reduxjs/toolkit/dist";
import type { TypeDefaultConversionFields } from "@/utils";

const REQUEST = {
  [ENUM_STORE.CATEGORY.ROLE]: API.getRoleSelectList,
  [ENUM_STORE.CATEGORY.ADMIN_USER]: API.getAllAdminUserList,
  [ENUM_STORE.CATEGORY.DEPARTMENT]: API.getAllDepartmentList,
  [ENUM_STORE.CATEGORY.WAREHOUSE_POSITION]: API.getWarehouseAllList,
};

type TypeRequestAPI = keyof typeof REQUEST;

type TypeCategoryKeys = keyof typeof ENUM_STORE.CATEGORY;

function* handlerCategory(
  action: PayloadAction<
    Array<TypeCategoryKeys>,
    ENUM_STORE.ACTION_CATEGORY.QUERY
  >,
) {
  try {
    const type: TypeCategoryKeys[] = [];
    const batch: TypeCategoryKeys[] = [];
    let data: TypeCategoryState = {};
    for (const key of action.payload) {
      if (REQUEST[key as TypeRequestAPI]) batch.push(key);
      else type.push(key);
    }
    if (type.length) {
      const list: Array<TypeDefaultConversionFields[]> = yield call(
        API.getCategoryList,
        { type },
      );
      list.forEach((v, i) => (data[type[i]] = toDictionaries(v)));
    }
    if (batch.length) {
      const list: Array<TypeDefaultConversionFields[]> = yield all(
        batch.map((v) => call(REQUEST[v as TypeRequestAPI])),
      );
      list.forEach((v, i) => (data[batch[i]] = toDictionaries(v)));
    }
    yield put(ActiosnsCategory.setCategory({ data }));
  } catch (e) {
    console.log(e);
  }
}

export default function* SagaDictionaries() {
  yield takeEvery(ActionsMiddleware.getCategory.type, handlerCategory);
}
