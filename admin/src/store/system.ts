import { isVoid } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { SYSTEM_NAV_STATUS_KEY } from "@/config/system";

import type { PayloadAction } from "@reduxjs/toolkit/dist";

export const DEFAULT_SYSTEM = {
  [SYSTEM_NAV_STATUS_KEY]: JSON.parse(
    localStorage.getItem(SYSTEM_NAV_STATUS_KEY) || "false",
  ) as boolean,
};

const systemSlice = createSlice({
  name: "SYSTEM",
  initialState: DEFAULT_SYSTEM,
  reducers: {
    setNavCollapsed(
      state: typeof DEFAULT_SYSTEM,
      action: PayloadAction<void | boolean, string>,
    ) {
      const { payload } = action;
      const status = isVoid(payload) ? !state[SYSTEM_NAV_STATUS_KEY] : payload!;
      localStorage.setItem(SYSTEM_NAV_STATUS_KEY, JSON.stringify(status));
      return { ...state, [SYSTEM_NAV_STATUS_KEY]: status };
    },
  },
});

const ActionsSystem = systemSlice.actions;

export { ActionsSystem, systemSlice };

export default systemSlice.reducer;
