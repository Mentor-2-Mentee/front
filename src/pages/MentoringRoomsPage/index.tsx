import { styled } from "@mui/system";
import { useState } from "react";
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

  return (
    <MentoringRoomsPageContainer>
      <FilterOptionHandler
        tagList={DEV_DATA.FILTER_OPTION_ELEMENTS}
        useFilterOptionState={useFilterOptionState}
      />
      <hr />
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
