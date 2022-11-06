import { UserProfile } from "../auth";
import { RawExamQuestion } from "../rawExamQuestion";

export type ExamReviewRoomUser = {
  enteredAt: string;
  examReviewRoomId: number;
  userPosition: string;
  isParticipant: boolean;
  rawExamQuestionList: RawExamQuestion[];
  userProfile: UserProfile;
};

export * from "./useGetUserListQuery";
