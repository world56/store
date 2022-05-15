import * as API_ENUM from "@/api/enum";
import { dataToDictionaries } from "@/utils";
import * as DictionariesAction from "../action/dictionary";
import { call, put, select, takeEvery } from "redux-saga/effects";

import { ENUM_STORE_ACTION } from "@/enum/store";

import type { TypeReduxStatus } from "@/interface/redux";
import type { TypeStoreDictionary } from "@/interface/redux/dictionary";

const REQUEST_API = {
  [ENUM_STORE_ACTION.DICTIONARIES.ROLE]: API_ENUM.getRoleSelectList,
  [ENUM_STORE_ACTION.DICTIONARIES.ADMIN_USER]: API_ENUM.getAllAdminUserList,
  [ENUM_STORE_ACTION.DICTIONARIES.DEPARTMENT]: API_ENUM.getAllDepartmentList,
  [ENUM_STORE_ACTION.DICTIONARIES.WAREHOUSE_POSITION]:
    API_ENUM.getWarehouseAllList,
};

function* filterDictionaries(param: TypeStoreDictionary.ActionGetDic) {
  try {
    if (REQUEST_API.propertyIsEnumerable(param.payload)) {
      const state: ReturnType<TypeStoreDictionary.Reducers> = yield select(
        (s) => s.dictionary,
      );
      if (!state?.[param.payload]?.LIST?.length) {
        const data: TypeReduxStatus.Dictionaries = dataToDictionaries(
          yield call(REQUEST_API[param.payload]),
        );
        yield put(
          DictionariesAction.setDictionaries({ data, type: param.payload }),
        );
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* SagaDictionaries() {
  yield takeEvery(ENUM_STORE_ACTION.DICTIONARIES.QUERY, filterDictionaries);
}
