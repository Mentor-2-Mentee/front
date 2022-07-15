import { styled } from "@mui/system";
import { useState } from "react";
import { getLiveRoomList } from "../../api/getLiveRoomList";
import CreateQuestionRoomButton from "../../commonElements/CreateQuestionRoomButton";
import FilterOptionHandler, {
  FilterOption,
} from "../../commonElements/FilterOptionHandler";
import { CommonSpace } from "../../commonStyles/CommonSpace";

import DEV_DATA from "./DEV_DATA.json";
import { MentoringRoomListGrid } from "./MentoringRoomListGrid";

export const MentoringRoomsPage = (): JSX.Element => {
  const useFilterOptionState = useState<FilterOption>({
    rootFilterTag: undefined,
    childFilterTags: [],
    filterKeywords: [],
  });

  const testQuery: FilterOption = {
    childFilterTags: [
      {
        parentFilterTag: "NCS",
        tagName: "문제해결능력",
      },
    ],
    rootFilterTag: "NCS",
    filterKeywords: ["수"],
  };

  return (
    <MentoringRoomsPageContainer>
      <FilterOptionHandler
        tagList={DEV_DATA.FILTER_OPTION_ELEMENTS}
        useFilterOptionState={useFilterOptionState}
      />
      <hr />
      <button
        onClick={() => {
          getLiveRoomList({
            filter: testQuery,
            page: 0,
            limit: 5,
          });
        }}
      >
        임시호출버튼
      </button>
      <MentoringRoomListGrid />
      <CreateQuestionRoomButton />
    </MentoringRoomsPageContainer>
  );
};

const MentoringRoomsPageContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(
    4,
    CommonSpace.MARGIN,
    CommonSpace.MARGIN,
    CommonSpace.MARGIN
  ),
}));

export default MentoringRoomsPage;
