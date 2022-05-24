import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import LiveAlarmBox from "../../commonElements/LiveAlarmBox";

export const InProgressRoomList = (): JSX.Element => {
  return (
    <InProgressRoomListContainer>
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
    </InProgressRoomListContainer>
  );
};

const InProgressRoomListContainer = styled("div")(({ theme }) => ({
  backgroundColor: "rgba(0,0,0,0.1)",
  padding: theme.spacing(3, 5, 4, 5),
}));

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

export default InProgressRoomList;
