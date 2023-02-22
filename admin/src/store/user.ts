import cookie from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

import { TOKEN_KEY } from "@/config/user";

import type { PayloadAction } from "@reduxjs/toolkit/dist";
import type { TypeAdminUser } from "@/interface/system/user";

export const DEFAULT_USER: Partial<TypeAdminUser.DTO> = {};

const userSlice = createSlice({
  name: "USER",
  initialState: DEFAULT_USER,
  reducers: {
    setUserInfo: (state, action: PayloadAction<TypeAdminUser.DTO, string>) =>
      action.payload,
    delUserInfo() {
      cookie.remove(TOKEN_KEY);
      return {};
    },
  },
});

const ActionsUser = userSlice.actions;

export { userSlice, ActionsUser };

export default userSlice.reducer;
