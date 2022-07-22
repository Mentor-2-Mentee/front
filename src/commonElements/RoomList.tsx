import { Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { SignatureColor } from "../commonStyles/CommonColor";
import DateFormatting from "../utils/dateFormatting";

export interface RoomParams {
  startedAt: string;
  createdAt: string;
  author: string;
  roomTitle: string;
  roomId: string;
  imageFiles: string[];
  roomTags?: string[];
  roomFilterTag: string;
  explainRoomText: string;
}

export interface RoomListProps {
  roomList: RoomParams[];
}

export const RoomListRow = ({ roomList }: RoomListProps): JSX.Element => {
  return (
    <RoomListRowContainer>
      {roomList.map((roomValue) => {
        return (
          <RoomElement
            key={roomValue.roomId}
            roomValue={roomValue}
            isLive={Boolean(roomValue.startedAt)}
          />
        );
      })}
    </RoomListRowContainer>
  );
};

const RoomListRowContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  overflow: "scroll",

  "&::-webkit-scrollbar": {
    display: "none",
  },

  "& > *": {
    marginRight: theme.spacing(4),
  },
}));

export interface RoomElementProps {
  roomValue: RoomParams;
  isLive: boolean;
}

export const RoomElement = ({
  roomValue,
  isLive,
}: RoomElementProps): JSX.Element => {
  const ELEMENT_WIDTH = 360;
  const navigation = useNavigate();

  return (
    <RoomElementContainer
      onClick={() => {
        navigation(`../room/${roomValue.roomId}`);
      }}
    >
      <RoomElementTitle sx={{ width: ELEMENT_WIDTH }}>
        {roomValue.roomTitle}
      </RoomElementTitle>
      <RoomElementAuthorValue>
        <Author sx={{ color: SignatureColor.RED }}>{roomValue.author}</Author>
        {isLive ? (
          <TimeStamp>
            {new DateFormatting().prettyTimeStamp(roomValue.startedAt)}
          </TimeStamp>
        ) : (
          <TimeStamp>
            {new DateFormatting().prettyTimeStamp(roomValue.createdAt)}
          </TimeStamp>
        )}
      </RoomElementAuthorValue>
      <Skeleton variant="rectangular" width={ELEMENT_WIDTH} height={180} />
      <TagsContainer>
        {roomValue.roomTags === undefined
          ? null
          : roomValue.roomTags.slice(0, 3).map((tag, index) => {
              return (
                <TagBox key={index}>
                  <Typography
                    variant="subtitle2"
                    component="div"
                    sx={{
                      maxWidth: "100%",
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    {tag}
                  </Typography>
                </TagBox>
              );
            })}
      </TagsContainer>
    </RoomElementContainer>
  );
};

const RoomElementContainer = styled("div")(({ theme }) => ({
  minWidth: 360,
  maxWidth: 360,
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

const TagsContainer = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  maxWidth: "100%",

  "& > *": {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const TagBox = styled("div")(({ theme }) => ({
  padding: theme.spacing(0.25, 2, 0.25, 2),
  borderRadius: theme.spacing(1.5),
  maxWidth: `calc(100% - ${theme.spacing(5)})`,
  boxShadow: `0 0 0 1px ${SignatureColor.BLACK_50} inset`,
}));
