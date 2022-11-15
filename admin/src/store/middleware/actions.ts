import { userSlice } from "../user";
import { categorySlice } from "../category";
import { createAction } from "@reduxjs/toolkit";

import { ENUM_STORE } from "@/enum/store";

import type { TypeAdminUser } from "@/interface/system/user";

const userLogin = createAction<TypeAdminUser.Login>(
  `${userSlice.name}/USER_LOGIN`,
);

const getUserInfo = createAction<void>(`${userSlice.name}/GET_USER_INFO`);

const getCategory = createAction<`${ENUM_STORE.CATEGORY}`[]>(
  `${categorySlice.name}/${ENUM_STORE.ACTION_CATEGORY.QUERY}`,
);

const Actions = {
  userLogin,
  getUserInfo,
  getCategory,
};

export default Actions;
