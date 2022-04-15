import store from '@/store';
import Cookies from 'js-cookie';
import { TOKEN_KEY } from "@/config/user";
import { Redirect } from 'react-router-dom';
import { UserAction } from '@/store/action';
import { RedirectUrl } from '@/config/routes';
import { CreditWhiteList } from '@/config/routes';

import type { ReactNode } from 'react';
import type { TypeRoute } from '@/interface/route';
import type { RouteComponentProps } from "react-router-dom";

export default function SafeFilter(
  props: RouteComponentProps,
  { routes = [], component: C }: TypeRoute.RouteParamType
): ReactNode {
  const { user } = store.getState();
  const { pathname } = props.location;
  const token = Cookies.get(TOKEN_KEY);
  const Module = <C routes={routes} />;
  const urlState = !CreditWhiteList.includes(pathname);
  token && !user.account && store.dispatch(UserAction.getUserInfo());
  if (token) return urlState ? Module : <Redirect to={RedirectUrl} />;
  else return urlState ? <Redirect to='/user/login' /> : Module;
};
