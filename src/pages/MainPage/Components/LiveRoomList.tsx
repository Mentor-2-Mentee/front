import { Box, Typography, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import LiveAlarmBox from "../../../commonElements/LiveAlarmBox";
import { RoomListRow } from "../../../commonElements/RoomList";
import { MainPageContentsColor } from "../../../commonStyles/CommonColor";
import { CommonSpace } from "../../../commonStyles/CommonSpace";
import { useGetMentoringRoomQuery } from "../../../hooks/queries/mentoringRoom";

export const LiveRoomList = (): JSX.Element => {
  const isWidthShort = useMediaQuery("(max-width:900px)");
  const mentoringRoomQuery = useGetMentoringRoomQuery({
    filter: {
      rootFilterTag: undefined,
      childFilterTags: [],
      filterKeywords: [],
    },
    page: 0,
    limit: 10,
  });

  if (mentoringRoomQuery.status === "loading") return <div>Loading</div>;
  if (mentoringRoomQuery.status === "error") return <div>Error</div>;

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: MainPageContentsColor.LIVE_ROOM_LIST,
        padding: isWidthShort
          ? theme.spacing(4)
          : theme.spacing(CommonSpace.MARGIN),
      })}
    >
      <Header>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", mr: 3 }}
        >
          현재 진행중인 질의응답
        </Typography>
        <LiveAlarmBox />
      </Header>
      <RoomListRow roomList={mentoringRoomQuery.data.mentoringRoomList} />
    </Box>
  );
};

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

export default LiveRoomList;
