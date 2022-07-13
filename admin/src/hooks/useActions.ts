import store from '@/store';
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionsUser } from "@/store/user";
import { ActionsSystem } from "@/store/system";
import { ActiosnsCategory } from "@/store/category";
import { ActionsMiddleware } from "@/store/middleware";

const ACTIONS = {
  ...ActionsUser,
  ...ActionsSystem,
  ...ActiosnsCategory,
  ...ActionsMiddleware,
};

export default function useActions() {
  const dispatch = useDispatch<typeof store.dispatch>();
  return useMemo(() => bindActionCreators(ACTIONS, dispatch), [dispatch]);
}
