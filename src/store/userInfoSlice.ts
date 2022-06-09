import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfoSliceState {
  isSignIn: boolean;
  isLoading: boolean;
  uid?: string;
  nickName?: string;
}

const initialState: UserInfoSliceState = {
  isSignIn: false,
  isLoading: false,
  uid: undefined,
  nickName: undefined,
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    getAuthTokenPending: (state, action: PayloadAction<any>) => {
      state.isLoading = true;
    },
  },
});

export const { actions } = userInfoSlice;

export default userInfoSlice.reducer;
