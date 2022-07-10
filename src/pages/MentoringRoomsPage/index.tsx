import { styled } from "@mui/system";
import { useState } from "react";
import CreateQuestionRoomButton from "../../commonElements/CreateQuestionRoomButton";
import FilterOptionHandler, {
  AppliedOptions,
} from "../../commonElements/FilterOptionHandler";
import { CommonSpace } from "../../commonStyles/CommonSpace";

import DEV_DATA from "./DEV_DATA.json";
import { MentoringRoomListGrid } from "./MentoringRoomListGrid";

export const MentoringRoomsPage = (): JSX.Element => {
  const [appliedFilterOptions, setAppliedFilterOptions] =
    useState<AppliedOptions>({
      parentElement: undefined,
      childElements: [],
      filterKeywords: [],
    });

  return (
    <MentoringRoomsPageContainer>
      <FilterOptionHandler
        filterElements={DEV_DATA.FILTER_OPTION_ELEMENTS}
        appliedOptions={appliedFilterOptions}
        setAppliedOptions={setAppliedFilterOptions}
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
