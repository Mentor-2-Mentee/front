import { createContext, Dispatch, SetStateAction } from "react";
import { UserProfile } from "../queries/auth";

export interface RootContextProps extends UserProfile {
  setRootContext: Dispatch<SetStateAction<UserProfile>>;
}

export const RootContext = createContext<RootContextProps>({
  userId: undefined,
  username: undefined,
  userGrade: undefined,
  setRootContext: () => {},
});
