import Cookies from "js-cookie";
import { History } from "@/router";
import { ActionsUser } from "../user";
import { TOKEN_KEY } from "@/config/user";
import ActionsMiddleware from "./actions";
import { encryption } from "@/utils/crypto";
import { login, getUserInfo, getPubilcKey } from "@/api/auth";
import { put, call, throttle, takeLatest } from "redux-saga/effects";

import * as CONFIG_REQUEST from "@/config/request";

import type { PayloadAction } from "@reduxjs/toolkit/dist";
import type { TypeSystemUser } from "@/interface/system/user";

type TypeActionsTaskInUserLogin = PayloadAction<
  TypeSystemUser.Login,
  typeof ActionsMiddleware.userLogin.type
>;

function* taskInUserLogin(data: TypeActionsTaskInUserLogin) {
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
    yield put(ActionsUser.setUserInfo(user));
  } catch {}
}

export default function* SagaUser() {
  yield takeLatest(ActionsMiddleware.userLogin.type, taskInUserLogin);
  yield throttle(
    CONFIG_REQUEST.SAGA_DEBOUNCE,
    ActionsMiddleware.getUserInfo.type,
    taskInGetUserInfo,
  );
}
