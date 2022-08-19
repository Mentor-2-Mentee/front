import { QuestionTag } from "../../../models";
import { getQuestionTagList } from "../../../api/getQuestionTagList";

interface SetInitialMentoringRoomTagListParams {
  setTagList: React.Dispatch<React.SetStateAction<QuestionTag[]>>;
}
export const setInitialMentoringRoomTagList = async ({
  setTagList,
}: SetInitialMentoringRoomTagListParams) => {
  const { data } = await getQuestionTagList();
  setTagList(data);
};
