import { Button, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router";
import { SignatureColor } from "../../../../commonStyles/CommonColor";
import {
  CreateTestMentoringRoomRequest,
  TestScheduleCacheDataEntity,
} from "../../../../hooks/queries/testSchedule";
import { getTestMentoringRoomRequestList } from "../../../../hooks/queries/testSchedule/getTestMentoringRoomRequestList";
import RequestCreateTestMentoringRoomModal from "./CreateTestMentoringRoomRequestModal";

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

export const TestMentoringRoomList = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { hash } = useLocation();
  const handleOpen = () => setIsOpen(true);
  const testScheduleId = Number(hash.substr(1));
  const [
    createTestMentoringRoomRequestList,
    setCreateTestMentoringRoomRequestList,
  ] = useState<CreateTestMentoringRoomRequest[]>([]);

  const { data } = useQuery<TestScheduleCacheDataEntity>([
    "createTestMentoringRoomRequest",
    testScheduleId,
  ]);

  useEffect(() => {
    getTestMentoringRoomRequestList({
      testScheduleId,
    });
  }, []);

  useEffect(() => {
    if (!data) return;
    const targetList = data.createTestMentoringRoomRequestMap.get(
      hash.substr(1)
    );
    if (targetList === undefined) return;
    setCreateTestMentoringRoomRequestList(targetList);
  }, [data]);

  return (
    <TestMentoringRoomListContainer>
      <TestMentoringRoomListHeader>
        <Typography variant="subtitle1" sx={{ fontWeight: "bolder" }}>
          시험관련 질의응답방
        </Typography>
        <Button size="small" variant="text" onClick={handleOpen}>
          질의응답방 생성신청
        </Button>
        <RequestCreateTestMentoringRoomModal
          useIsOpenState={[isOpen, setIsOpen]}
        />
      </TestMentoringRoomListHeader>
      <div>
        {createTestMentoringRoomRequestList.map((ele) => {
          return (
            <TestMentoringRoom>
              <Typography variant="body2">{ele.requestWorkField}</Typography>
              <Typography
                variant="body2"
                sx={{
                  position: "absolute",
                  right: 80,
                }}
              >{`${ele.requestUserList.length}명 참여대기중`}</Typography>
            </TestMentoringRoom>
          );
        })}
      </div>
      <div>
        {DEV_VALUE.map((ele) => {
          return (
            <TestMentoringRoom>
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
            </TestMentoringRoom>
          );
        })}
      </div>
    </TestMentoringRoomListContainer>
  );
};

const TestMentoringRoomListContainer = styled("div")(({ theme }) => ({
  background: SignatureColor.GRAY,
  border: `1px solid ${SignatureColor.GRAY_BORDER}`,

  boxSizing: "border-box",
}));

const TestMentoringRoomListHeader = styled("div")(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(1, 1, 1, 2),
  justifyContent: "space-between",
  alignItems: "center",
}));

const TestMentoringRoom = styled("div")(({ theme }) => ({
  background: SignatureColor.WHITE,
  borderTop: `1px solid ${SignatureColor.GRAY_BORDER}`,
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",

  position: "relative",
  height: theme.spacing(4),

  padding: theme.spacing(0, 2, 0, 2),
}));

export default TestMentoringRoomList;
