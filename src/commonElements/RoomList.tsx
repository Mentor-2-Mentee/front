import { Skeleton } from "@mui/material";
import { styled } from "@mui/system";
import { SignatureColor } from "../commonStyles/CommonColor";

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
  const ELEMENT_WIDTH = 360;

  return (
    <RoomElementContainer>
      <RoomElementTitle sx={{ width: ELEMENT_WIDTH }}>
        {roomValue.title}
      </RoomElementTitle>
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
      <Skeleton variant="rectangular" width={ELEMENT_WIDTH} height={180} />
    </RoomElementContainer>
  );
};

const RoomListContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  overflow: "scroll",

  "& > *": {
    marginRight: theme.spacing(4),
  },
}));

const RoomElementContainer = styled("div")(({ theme }) => ({
  minWidth: 360,
  borderRadius: 5,
  padding: theme.spacing(1),
  "&:hover": {
    boxShadow: `0 0 0 1px ${SignatureColor.BLUE} inset`,
  },
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
