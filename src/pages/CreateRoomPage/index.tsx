import { styled } from "@mui/system";
/**
 *
 * 지금 입력 받아야하는 값 : 제목, 테그, 간단한 문제 설명, 문제사진 1장
 */

export const CreateRoomPage = (): JSX.Element => {
  return (
    <CreateRoomPageContainer>
      <div>여기는 방 생성공간</div>
    </CreateRoomPageContainer>
  );
};

const CreateRoomPageContainer = styled("div")(({ theme }) => ({}));

export default CreateRoomPage;
