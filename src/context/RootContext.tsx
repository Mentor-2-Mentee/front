import { createContext } from "react";
import { UserProfile } from "../api/getUserProfile";

export interface RootContextProps extends UserProfile {}

export const RootContext = createContext<RootContextProps>({
  userId: undefined,
  userName: undefined,
});
