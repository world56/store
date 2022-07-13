import Cookie from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

import { TOKEN_KEY } from "@/config/user";

import type { PayloadAction } from "@reduxjs/toolkit/dist";
import type { TypeSystemUser } from "@/interface/system/user";

export const DEFAULT_USER: Partial<TypeSystemUser.DTO> = {};

const userSlice = createSlice({
  name: "USER",
  initialState: DEFAULT_USER,
  reducers: {
    setUserInfo: (state, action: PayloadAction<TypeSystemUser.DTO, string>) =>
      action.payload,
    delUserInfo() {
      Cookie.remove(TOKEN_KEY);
      return {};
    },
  },
});

const ActionsUser = userSlice.actions;

export { userSlice, ActionsUser };

export default userSlice.reducer;
