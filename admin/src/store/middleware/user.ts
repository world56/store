import Cookies from "js-cookie";
import { History } from "@/router";
import { UserAction } from "../action";
import { TOKEN_KEY } from "@/config/user";
import { encryption } from "@/utils/crypto";
import { login, getUserInfo, getPubilcKey } from "@/api/user";
import { put, call, throttle, takeLatest } from "redux-saga/effects";

import * as CONFIG_REQUEST from "@/config/request";
import { ENUM_STORE_ACTION } from "@/enum/store";

import type { TypeUser } from "@/interface/user";
import type { TypeStoreUserModule } from "@/interface/store";

function* taskInUserLogin(data: TypeStoreUserModule.ActionUserLogin) {
  const key: string = yield getPubilcKey();
  const params = encryption(key, JSON.stringify(data.payload));
  const token: string = yield call(login, params);
  Cookies.set(TOKEN_KEY, token);
  History.push("/");
}

function* taskInGetUserInfo() {
  const user: TypeUser.UserInfo = yield getUserInfo();
  yield put(UserAction.setUserInfo(user));
}

export default function* () {
  yield takeLatest(ENUM_STORE_ACTION.LOGIN.USER_LOGIN, taskInUserLogin);
  yield throttle(
    CONFIG_REQUEST.SAGA_DEBOUNCE,
    ENUM_STORE_ACTION.LOGIN.GET_USER_INFO,
    taskInGetUserInfo,
  );
}
