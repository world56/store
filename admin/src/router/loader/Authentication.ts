import store from "@/store";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";
import { ActionsMiddleware } from "@/store/middleware";

import { TOKEN_KEY } from "@/config/user";

import type { LoaderFunctionArgs } from "@remix-run/router";

let uninstall: () => void;

/**
 * @name Authentication 路由鉴权
 * @param _arg 自带参数
 */
export default async function Authentication(_arg: LoaderFunctionArgs) {
  return new Promise((reslove) => {
    const token = Cookies.get(TOKEN_KEY);
    const { id } = store.getState().user;
    if (token && !id) {
      store.dispatch(ActionsMiddleware.getUserInfo());
      uninstall = store.subscribe(
        () => (store.getState().user.id && uninstall()) || reslove(undefined),
      );
    } else if (!token) {
      reslove(redirect("/login"));
    } else {
      reslove(undefined);
    }
  });
}
