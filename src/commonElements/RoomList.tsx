import { Box, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { SignatureColor } from "../commonStyles/CommonColor";
import { MentoringRoom } from "../hooks/queries/mentoringRoom";
import DateFormatting from "../utils/dateFormatting";

export interface RoomListProps {
  roomList: MentoringRoom[];
}

export const RoomListRow = ({ roomList }: RoomListProps): JSX.Element => {
  return (
    <RoomListRowContainer>
      {roomList.map((roomValue) => {
        return (
          <RoomElement
            key={roomValue.mentoringRoomId}
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
  roomValue: MentoringRoom;
  isLive: boolean;
}

export const RoomElement = ({
  roomValue,
  isLive,
}: RoomElementProps): JSX.Element => {
  const ELEMENT_WIDTH = 340;
  const SKELETON_WIDTH = 330;
  const SKELETON_HEIGHT = 150;
  const navigation = useNavigate();

  return (
    <Box
      onClick={() => {
        navigation(`../room/${roomValue.mentoringRoomId}`);
      }}
      sx={{
        borderRadius: 5,
        padding: 1,
        width: ELEMENT_WIDTH,
        "&:hover": {
          boxShadow: `0 0 0 1px ${SignatureColor.BLUE} inset`,
        },
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          fontWeight: "bold",
          marginBottom: 0.5,
        }}
      >
        {roomValue.mentoringRoomTitle}
      </Typography>
      <Box
        sx={{
          display: "flex",
          height: 16,
          mb: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            color: SignatureColor.RED,

            paddingRight: 1,
            marginRight: 1,
            borderRight: `2px solid ${SignatureColor.BLACK_80}`,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          {roomValue.author}
        </Typography>
        {isLive ? (
          <Typography
            variant="subtitle2"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {new DateFormatting(null).prettyTimeStamp(roomValue.startedAt)}
          </Typography>
        ) : (
          <Typography>
            {new DateFormatting(null).prettyTimeStamp(roomValue.createdAt)}
          </Typography>
        )}
      </Box>
      <Skeleton
        variant="rectangular"
        width={SKELETON_WIDTH}
        height={SKELETON_HEIGHT}
      />
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
    </Box>
  );
};

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
