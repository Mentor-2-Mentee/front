import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router";
import { UserProfile } from "../../../../api/user/getUserProfile";
import { SignatureColor } from "../../../../commonStyles/CommonColor";
import { RootContext } from "../../../../hooks/context/RootContext";
import {
  CreateTestMentoringRoomRequest,
  TestMentoringRoom,
  TestScheduleCacheDataEntity,
} from "../../../../hooks/queries/testSchedule";
import { getTestMentoringRoomList } from "../../../../hooks/queries/testSchedule/getTestMentoringRoomList";
import { getTestMentoringRoomRequestList } from "../../../../hooks/queries/testSchedule/getTestMentoringRoomRequestList";
import RequestCreateTestMentoringRoomModal from "../CreateTestMentoringRoomRequestModal";
import CreateTestMentoringRoomRequestList from "./CreateTestMentoringRoomRequestList";

export const TestMentoringRoomList = (): JSX.Element => {
  const { userId, userGrade } = useContext(RootContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigation = useNavigate();
  const { hash } = useLocation();
  const handleOpen = () => setIsOpen(true);
  const testScheduleId = Number(hash.substr(1));

  const [
    createTestMentoringRoomRequestList,
    setCreateTestMentoringRoomRequestList,
  ] = useState<CreateTestMentoringRoomRequest[]>([]);
  const [testMentoringRoomList, setTestMentoringRoomList] = useState<
    TestMentoringRoom[]
  >([]);

  const { data, isStale } = useQuery<TestScheduleCacheDataEntity>([
    testScheduleId,
  ]);

  const getData = async (testScheduleId: number) => {
    const res1 = await getTestMentoringRoomRequestList({
      testScheduleId,
    });
    const res2 = await getTestMentoringRoomList({
      testScheduleId,
    });
    console.log(res1.data, res2.data);
    setCreateTestMentoringRoomRequestList([...res1.data]);
    setTestMentoringRoomList([...res2.data]);
  };

  useEffect(() => {
    getData(testScheduleId);
  }, [testScheduleId, data]);

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
      <CreateTestMentoringRoomRequestList
        createTestMentoringRoomRequestList={createTestMentoringRoomRequestList}
      />
      <div>
        {testMentoringRoomList.map((ele) => {
          return (
            <TestMentoringRoomElement>
              <Typography variant="body2">{ele.testField}</Typography>
              <Typography
                variant="body2"
                sx={{
                  position: "absolute",
                  right: 80,
                }}
              >{`${ele.userList.length}명 참여중`}</Typography>
              <Button
                size="small"
                variant="text"
                sx={{
                  position: "absolute",
                  right: 0,
                }}
                onClick={() => {
                  navigation(`/test-mentoring-room/${ele.testMentoringRoomId}`);
                }}
              >
                <Typography variant="body2">입장하기</Typography>
              </Button>
            </TestMentoringRoomElement>
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

const TestMentoringRoomElement = styled("div")(({ theme }) => ({
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
