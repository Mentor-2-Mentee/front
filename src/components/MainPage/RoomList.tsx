import { Skeleton } from "@mui/material";
import { styled } from "@mui/system";
import { LiveRoomParams } from "./LiveRoomList";

interface RoomListProps {
  roomList: LiveRoomParams[];
}

export const RoomList = ({ roomList }: RoomListProps): JSX.Element => {
  return (
    <RoomListContainer>
      {roomList.map((roomValue) => {
        return <LiveRoomElement key={roomValue.roomId} roomValue={roomValue} />;
      })}
    </RoomListContainer>
  );
};

interface LiveRoomElementProps {
  roomValue: LiveRoomParams;
}

const LiveRoomElement = ({ roomValue }: LiveRoomElementProps): JSX.Element => {
  return (
    <LiveRoomElementContainer>
      <LiveRoomElementTitle>{roomValue.title}</LiveRoomElementTitle>
      <LiveRoomElementAuthorValue>
        <Author sx={{ color: `${roomValue.authorColor}` }}>
          {roomValue.author}
        </Author>
        <StartedAt>{roomValue.startedAt.replace("T", " ")}</StartedAt>
      </LiveRoomElementAuthorValue>
      <Skeleton variant="rectangular" width={360} height={180} />
    </LiveRoomElementContainer>
  );
};

const RoomListContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  maxWidth: "100%",
  overflow: "scroll",

  "& > *": {
    marginRight: theme.spacing(4),
  },
}));

const LiveRoomElementContainer = styled("div")(({ theme }) => ({
  minWidth: 360,
}));

const LiveRoomElementTitle = styled("div")(({ theme }) => ({
  width: "100%",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
  fontWeight: "bold",
  marginBottom: theme.spacing(0.5),
}));

const LiveRoomElementAuthorValue = styled("div")(({ theme }) => ({
  display: "flex",
  marginBottom: theme.spacing(0.5),
}));

const Author = styled("div")(({ theme }) => ({
  paddingRight: theme.spacing(1),
  marginRight: theme.spacing(1),
  borderRight: "2px solid black",
  fontWeight: "bold",
}));

const StartedAt = styled("div")(({ theme }) => ({
  color: "rgba(0,0,0,0.5)",
}));

export default RoomList;
