import { EffectCallback } from "react";

interface subscribePreviousQuestionSocketParams {
  examScheduleId: number;
  examField: string;
  subscribeChannelListRef: React.MutableRefObject<string[]>;
}

export const subscribePreviousQuestionSocket = ({
  examScheduleId,
  examField,
  subscribeChannelListRef,
}: subscribePreviousQuestionSocketParams): EffectCallback => {
  const subscribeChannel = `examMentoringRoom_question-${examScheduleId}_${examField}`;
  const isSubscribed =
    subscribeChannelListRef.current.findIndex(
      (ele) => ele === subscribeChannel
    ) !== -1;

  return () => {};
};
