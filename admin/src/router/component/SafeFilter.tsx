import React from 'react';
import store from '@/store';
import { Redirect } from 'react-router-dom';
import { CreditWhiteList } from '@/config/routes';

import type * as RouteTypes from '@/interface/route';
import type { RouteComponentProps } from "react-router-dom";

export default function SafeFilter(
  props: RouteComponentProps,
  { routes = [], component: C }: RouteTypes.Routes
): React.ReactNode {
  const { token } = store.getState().user;
  const { pathname } = props.location
  const urlState = !CreditWhiteList.includes(pathname);
  const Module = <C routes={routes} />;
  if (token) return urlState ? Module : <Redirect to='/' />;
  else return urlState ? <Redirect to='/user/login' /> : Module;
};
