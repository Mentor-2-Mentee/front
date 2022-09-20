import { getQuestionTagList } from "../../../api/getQuestionTagList";
import { QuestionTag } from "../../../hooks/queries/questionTag";

interface SetInitialMentoringRoomTagListParams {
  setTagList: React.Dispatch<React.SetStateAction<QuestionTag[]>>;
}
export const setInitialMentoringRoomTagList = async ({
  setTagList,
}: SetInitialMentoringRoomTagListParams) => {
  const { data } = await getQuestionTagList();
  setTagList(data);
};
