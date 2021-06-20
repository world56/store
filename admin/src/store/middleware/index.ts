import { History } from "@/router";
import { encryption } from "@/utils/crypto";
import * as USER_ACTION from "../action/user";
import { login, getPubilcKey } from "@/api/user";
import { setUserInfo } from "../distributed/user";
import { takeEvery, put, call, fork } from "redux-saga/effects";

import type { Action } from "redux";
import type * as UserType from "@/interface/user";

export interface UserAction extends Action<USER_ACTION.USER_LOGIN.USER_LOGIN> {
  params: UserType.Login.AccountSecret;
}

function* dispatchLogin(data: UserAction) {
  try {
    const key: string = yield getPubilcKey();
    const params = encryption(key, JSON.stringify(data.params));
    const res: UserType.Login.UserInfo = yield call(login, params);
    yield put(setUserInfo(res));
    History.push("/");
  } catch (e) {}
}

function* userRoot() {
  yield takeEvery<UserAction>(USER_ACTION.USER_LOGIN.USER_LOGIN, dispatchLogin);
}

function* sagaRun() {
  yield fork(userRoot);
}

export default sagaRun;
