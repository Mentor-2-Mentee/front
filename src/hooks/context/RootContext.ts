import { createContext, Dispatch, SetStateAction } from "react";
import { UserProfile } from "../queries/auth";

export interface RootContextState extends UserProfile {}

interface RootContextProps extends RootContextState {
  setRootContextState: Dispatch<SetStateAction<RootContextState>>;
}

export const RootContext = createContext<RootContextProps>({
  id: undefined,
  userName: undefined,
  userGrade: undefined,
  setRootContextState: () => {},
});
