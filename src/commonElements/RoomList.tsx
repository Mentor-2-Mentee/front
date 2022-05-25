import { Skeleton } from "@mui/material";
import { styled } from "@mui/system";

export interface RoomParams {
  roomId: string;
  title: string;
  author: string;
  authorColor: string;
  createdAt: string;
  startedAt: string;
  thumbnailImgURL: string;
}

interface RoomListProps {
  roomList: RoomParams[];
  isLive: boolean;
}

export const RoomList = ({ roomList, isLive }: RoomListProps): JSX.Element => {
  return (
    <RoomListContainer>
      {roomList.map((roomValue) => {
        return (
          <RoomElement
            key={roomValue.roomId}
            roomValue={roomValue}
            isLive={isLive}
          />
        );
      })}
    </RoomListContainer>
  );
};

interface RoomElementProps {
  roomValue: RoomParams;
  isLive: boolean;
}

const RoomElement = ({ roomValue, isLive }: RoomElementProps): JSX.Element => {
  //   const [liveRoomThumbnailImage, setLiveRoomThumbnailImage] =
  //     useState<HTMLImageElement>();

  //   const loadThumbnailImage = async (url: string) => {
  //     const imageElement = await imageUrlLoad(roomValue.thumbnailImgURL);
  //     setLiveRoomThumbnailImage(imageElement);
  //   };

  return (
    <RoomElementContainer>
      <RoomElementTitle>{roomValue.title}</RoomElementTitle>
      <RoomElementAuthorValue>
        <Author sx={{ color: `${roomValue.authorColor}` }}>
          {roomValue.author}
        </Author>
        {isLive ? (
          <TimeStamp>{roomValue.startedAt.replace("T", " ")}</TimeStamp>
        ) : (
          <TimeStamp>{roomValue.createdAt.replace("T", " ")}</TimeStamp>
        )}
      </RoomElementAuthorValue>
      <Skeleton variant="rectangular" width={360} height={180} />
    </RoomElementContainer>
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

const RoomElementContainer = styled("div")(({ theme }) => ({
  minWidth: 360,
}));

const RoomElementTitle = styled("div")(({ theme }) => ({
  width: "100%",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
  fontWeight: "bold",
  marginBottom: theme.spacing(0.5),
}));

const RoomElementAuthorValue = styled("div")(({ theme }) => ({
  display: "flex",
  marginBottom: theme.spacing(0.5),
}));

const Author = styled("div")(({ theme }) => ({
  paddingRight: theme.spacing(1),
  marginRight: theme.spacing(1),
  borderRight: "2px solid black",
  fontWeight: "bold",
}));

const TimeStamp = styled("div")(({ theme }) => ({
  color: "rgba(0,0,0,0.5)",
}));

export default RoomList;
