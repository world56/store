import { message } from "antd";
import Cookies from "js-cookie";
import { encryption } from "@/utils";
import { ActionsUser } from "../user";
import { TOKEN_KEY } from "@/config/user";
import ActionsMiddleware from "./actions";
import { login, getUserInfo, getPublicKey } from "@/api/auth";
import { put, call, throttle, takeLatest } from "redux-saga/effects";

import { SAGA_DEBOUNCE } from "@/config/request";

import type { TypeAdminUser } from "@/interface/system/user";

function* taskInUserLogin(data: ReturnType<typeof ActionsMiddleware.userLogin>) {
  try {
    const key: string = yield getPublicKey();
    data.payload.password = encryption(key, data.payload.password);
    const token: string = yield call(login, data.payload);
    Cookies.set(TOKEN_KEY, token, { sameSite: "strict" });
    yield put(ActionsMiddleware.getUserInfo());
  } catch {}
}

function* taskInGetUserInfo() {
  try {
    const user: TypeAdminUser.DTO = yield getUserInfo();
    yield put(ActionsUser.setUserInfo(user));
  } catch {
    message.error("获取用户信息失败");
    Cookies.remove(TOKEN_KEY);
    put(ActionsUser.delUserInfo());
    window.location.href = "/login";
  }
}

export default function* SagaUser() {
  yield takeLatest(ActionsMiddleware.userLogin.type, taskInUserLogin);
  yield throttle(
    SAGA_DEBOUNCE,
    ActionsMiddleware.getUserInfo.type,
    taskInGetUserInfo,
  );
}
