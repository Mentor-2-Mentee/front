import { UserProfile } from "../auth";

export type Inquery = {
  id: number;
  title: string;
  description: string;
  author: UserProfile | null;
  instantName: string | null;
  createdAt: string;
  isPrivate: boolean;
};

export type InqueryListElement = {
  id: number;
  title: string;
  author: UserProfile | null;
  instantName: string | null;
  createdAt: string;
  targetInquery: InqueryListElement;
  isPrivate: boolean;
};

export * from "./useGetInqueryListQuery";
export * from "./usePostInqueryMutation";
