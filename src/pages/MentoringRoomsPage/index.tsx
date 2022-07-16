import { styled } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { getLiveRoomList } from "../../api/getLiveRoomList";
import CreateQuestionRoomButton from "../../commonElements/CreateQuestionRoomButton";
import FilterOptionHandler, {
  FilterOption,
} from "../../commonElements/FilterOptionHandler";
import { RoomParams } from "../../commonElements/RoomList";
import { CommonSpace } from "../../commonStyles/CommonSpace";

import DEV_DATA from "./DEV_DATA.json";
import { MentoringRoomListGrid } from "./MentoringRoomListGrid";

const LIMIT = 2;

export const MentoringRoomsPage = (): JSX.Element => {
  const [appliedTagOptions, setAppliedTagOptions] = useState<FilterOption>({
    rootFilterTag: undefined,
    childFilterTags: [],
    filterKeywords: [],
  });

  const [roomList, setRoomList] = useState<RoomParams[]>([]);
  const [nowPage, setNowPage] = useState<number>(0);
  const nowPageRef = useRef(nowPage);
  nowPageRef.current = nowPage;

  // const [check, setCheck] = useState(false);
  // const checkRef = useRef(check);
  // checkRef.current = check;
  const addList = async () => {
    // if (checkRef.current) return;

    const result = await getLiveRoomList({
      filter: appliedTagOptions,
      page: nowPageRef.current,
      limit: LIMIT,
    });
    // setNowPage((cur) => cur + 1);

    // if (nowPageRef.current === 0) {
    //   setRoomList([...result]);
    //   return;
    // }
    setRoomList([...roomList, ...result]);
  };

  const getNextRoomList = async () => {
    console.log("getNextRoomList실행", nowPage);
    try {
      setNowPage((cur) => cur + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    addList();
    // setCheck(true);
  }, []);

  return (
    <MentoringRoomsPageContainer>
      <button
        onClick={() => {
          console.log(nowPage, roomList);
        }}
      >
        상태체크버튼
      </button>
      <FilterOptionHandler
        tagList={DEV_DATA.FILTER_OPTION_ELEMENTS}
        useFilterOptionState={[appliedTagOptions, setAppliedTagOptions]}
      />
      <hr />
      <MentoringRoomListGrid
        useRoomListState={[roomList, setRoomList]}
        fetchElementFunction={addList}
        limit={LIMIT}
        useNowPageState={[nowPage, setNowPage]}
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
