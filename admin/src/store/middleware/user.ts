import Cookies from "js-cookie";
import { History } from "@/router";
import { UserAction } from "../action";
import { TOKEN_KEY } from "@/config/user";
import { encryption } from "@/utils/crypto";
import { login, getUserInfo, getPubilcKey } from "@/api/auth";
import { put, call, throttle, takeLatest } from "redux-saga/effects";

import * as CONFIG_REQUEST from "@/config/request";
import { ENUM_STORE_ACTION } from "@/enum/store";

import type { TypeSystemUser } from "@/interface/system/user";
import type { TypeStoreUserModule } from "@/interface/store";

function* taskInUserLogin(data: TypeStoreUserModule.ActionUserLogin) {
  try {
    const key: string = yield getPubilcKey();
    data.payload.password = encryption(key, data.payload.password);
    const token: string = yield call(login, data.payload);
    Cookies.set(TOKEN_KEY, token);
    History.push("/");
  } catch {}
}

function* taskInGetUserInfo() {
  try {
    const user: TypeSystemUser.DTO = yield getUserInfo();
    yield put(UserAction.setUserInfo(user));
  } catch {}
}

export default function* SagaUser() {
  yield takeLatest(ENUM_STORE_ACTION.LOGIN.USER_LOGIN, taskInUserLogin);
  yield throttle(
    CONFIG_REQUEST.SAGA_DEBOUNCE,
    ENUM_STORE_ACTION.LOGIN.GET_USER_INFO,
    taskInGetUserInfo,
  );
}
