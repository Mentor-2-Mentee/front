import { EffectCallback } from "react";
import { QuestionTag } from "../../../models";
import { injectPreventLeavePageEvent } from "./injectPreventLeavePageEvent";
import { setInitialMentoringRoomTagList } from "./setInitialMentoringRoomTagList";

interface InjectInitialEffectCallbackParams {
  setTagList: React.Dispatch<React.SetStateAction<QuestionTag[]>>;
}

export const injectInitialEffectCallback = ({
  setTagList,
}: InjectInitialEffectCallbackParams): EffectCallback => {
  return () => {
    setInitialMentoringRoomTagList({ setTagList });
    window.addEventListener("beforeunload", injectPreventLeavePageEvent);
    return () => {
      window.removeEventListener("beforeunload", injectPreventLeavePageEvent);
    };
  };
};

export const injectCreatedUrlEffectCallback = (): EffectCallback => {
  return () => {
    window.removeEventListener("beforeunload", injectPreventLeavePageEvent);
  };
};
