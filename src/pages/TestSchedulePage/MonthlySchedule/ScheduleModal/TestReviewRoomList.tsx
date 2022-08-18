import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { SignatureColor } from "../../../../commonStyles/CommonColor";

const DEV_VALUE = [
  {
    name: "화공직",
    count: 20,
  },
  {
    name: "환경직",
    count: 37,
  },
];

export const TestReviewRoomList = (): JSX.Element => {
  return (
    <TestReviewRoomListContainer>
      <Typography variant="subtitle1" sx={{ fontWeight: "bolder", p: 1 }}>
        시험관련 질의응답
      </Typography>
      {DEV_VALUE.map((ele) => {
        return (
          <TestReviewRoom>
            <Typography variant="body2">{ele.name}</Typography>
            <Typography
              variant="body2"
              sx={{
                position: "absolute",
                right: 80,
              }}
            >{`${ele.count}명 참여중`}</Typography>
            <Button
              size="small"
              variant="text"
              sx={{
                position: "absolute",
                right: 0,
              }}
            >
              <Typography variant="body2">입장하기</Typography>
            </Button>
          </TestReviewRoom>
        );
      })}
    </TestReviewRoomListContainer>
  );
};

const TestReviewRoomListContainer = styled("div")(({ theme }) => ({
  background: SignatureColor.GRAY,
  border: `1px solid ${SignatureColor.GRAY_BORDER}`,

  boxSizing: "border-box",
}));

const TestReviewRoom = styled("div")(({ theme }) => ({
  background: SignatureColor.WHITE,
  borderTop: `1px solid ${SignatureColor.GRAY_BORDER}`,
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",

  position: "relative",
  height: theme.spacing(4),

  padding: theme.spacing(0, 2, 0, 2),
}));

export default TestReviewRoomList;
