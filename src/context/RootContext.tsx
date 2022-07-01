import { createContext, Dispatch, SetStateAction, useState } from "react";
import { UserProfile } from "../api/getUserProfile";

export interface RootContextProps extends UserProfile {
  setRootContext: Dispatch<SetStateAction<UserProfile>>;
}

export const RootContext = createContext<RootContextProps>({
  userId: undefined,
  userName: undefined,
  setRootContext: () => {},
});
