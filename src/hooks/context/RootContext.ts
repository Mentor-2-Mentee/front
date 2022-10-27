import { createContext, Dispatch, SetStateAction } from "react";

export interface RootContextState {
  id?: string;
  userName?: string;
  userGrade?: string;
}

interface RootContextProps extends RootContextState {
  setRootContextState: Dispatch<SetStateAction<RootContextState>>;
}

export const RootContext = createContext<RootContextProps>({
  id: undefined,
  userName: undefined,
  userGrade: undefined,
  setRootContextState: () => {},
});
