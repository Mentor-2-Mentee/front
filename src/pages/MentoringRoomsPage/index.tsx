import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { getLiveRoomList } from "../../api/getLiveRoomList";
import CreateQuestionRoomButton from "../../commonElements/CreateQuestionRoomButton";
import FilterOptionHandler, {
  FilterOption,
} from "../../commonElements/FilterOptionHandler";
import { RoomParams } from "../../commonElements/RoomList";
import { CommonSpace } from "../../commonStyles/CommonSpace";

import DEV_DATA from "./DEV_DATA.json";
import { MentoringRoomListGrid } from "./MentoringRoomListGrid";

const maxPage = 5;

export const MentoringRoomsPage = (): JSX.Element => {
  const [appliedTagOptions, setAppliedTagOptions] = useState<FilterOption>({
    rootFilterTag: undefined,
    childFilterTags: [],
    filterKeywords: [],
  });

  const [roomList, setRoomList] = useState<RoomParams[]>([]);
  const [nowPage, setNowPage] = useState<number>(0);

  const addList = async () => {
    const result = await getLiveRoomList({
      filter: appliedTagOptions,
      page: nowPage,
      limit: 6,
    });
    setRoomList([...roomList, ...result]);
  };

  const getNextRoomList = async () => {
    console.log("getNextRoomList실행");
    try {
      setNowPage(nowPage + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    addList();
  }, [nowPage]);

  return (
    <MentoringRoomsPageContainer>
      <FilterOptionHandler
        tagList={DEV_DATA.FILTER_OPTION_ELEMENTS}
        useFilterOptionState={[appliedTagOptions, setAppliedTagOptions]}
      />
      <hr />
      <MentoringRoomListGrid
        useRoomListState={[roomList, setRoomList]}
        fetchElementFunction={getNextRoomList}
      />
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
