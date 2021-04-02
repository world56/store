import React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom';
import type * as RouteTypes from '@/interface/route';
import { CreditWhiteList } from '@/config/routes';

export default function SafeFilter(
  props: RouteComponentProps,
  { routes = [], component: C }: RouteTypes.Routes
): React.ReactNode {
  const token = '';
  const { pathname } = props.location
  const urlState = CreditWhiteList.includes(pathname);
  const Module = <C {...props} routes={routes} />
  if (token) return urlState ? Module : <Redirect to='/' />;
  else return urlState ? <Redirect to='/user/login' /> : Module;
};