import {
  Box,
  Button,
  Modal,
  Skeleton,
  Theme,
  Typography,
  SxProps,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import { useSnackbar } from "notistack";
import React, { useCallback, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { SignatureColor } from "../../../../../commonStyles/CommonColor";
import { RootContext } from "../../../../../hooks/context/RootContext";
import { useGetExamReviewRoomListQuery } from "../../../../../hooks/queries/examReviewRoom";
import { usePostNewUserMutation } from "../../../../../hooks/queries/examReviewRoomUser/usePostNewUserMutation";
import { getCookieValue } from "../../../../../utils/handleCookieValue";

export const ExamReviewRoomList = (): JSX.Element => {
  const { id, userGrade } = useContext(RootContext);
  const navigation = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { hash } = useLocation();
  const hashedExamScheduleId = Number(hash.substr(1));
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [closedRoomEnterModalOpen, setClosedRoomEnterModalOpen] =
    useState<boolean>(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number>();
  const [enterCode, setEnterCode] = useState<string>("");
  const handleModalOpen = () => setIsOpen(true);
  const handleModalClose = () => {
    setSelectedRoomId(undefined);
    setIsOpen(false);
  };

  const handleClosedRoomEnterModalOpen = () =>
    setClosedRoomEnterModalOpen(true);
  const handleClosedRoomEnterModalClose = () => {
    setSelectedRoomId(undefined);
    setClosedRoomEnterModalOpen(false);
  };

  const {
    data: examReviewRoomListData,
    status: examReviewRoomListQueryStatus,
  } = useGetExamReviewRoomListQuery({
    examScheduleId: hashedExamScheduleId,
    userId: id,
  });
  const { mutate: postNewUserMutate } = usePostNewUserMutation(
    enqueueSnackbar,
    navigation,
    setIsOpen
  );

  const handleRoonEnterButtonClick =
    (examReviewRoomId: number, userPosition?: string) => () => {
      //여기서 admin, master는 바로입장
      setSelectedRoomId(examReviewRoomId);

      if (!userPosition) {
        handleModalOpen();
        return;
      }

      navigation(`/exam-review-room/${examReviewRoomId}#questions`);
    };

  const handleArchiveRoomEnterButton = (examReviewRoomId: number) => () => {
    //여기서 admin, master는 바로입장
    setSelectedRoomId(examReviewRoomId);
    if (userGrade === "master" || userGrade === "admin") {
      postNewUserMutate({
        token: getCookieValue("accessToken"),
        body: {
          isParticipant: false,
          examReviewRoomId,
        },
      });
      return;
    }
    navigation(`/exam-review-room/${examReviewRoomId}#questions`);
  };

  const handleClosedRoonEnterButtonClick =
    (examReviewRoomId: number, userPosition?: string) => () => {
      //여기서 admin, master는 바로입장
      setSelectedRoomId(examReviewRoomId);

      if (userGrade === "master" || userGrade === "admin" || userPosition) {
        postNewUserMutate({
          token: getCookieValue("accessToken"),
          body: {
            isParticipant: false,
            examReviewRoomId,
          },
        });
        return;
      }
      handleClosedRoomEnterModalOpen();
    };

  const handleNewEnterButtonClick = useCallback(
    (isParticipant: boolean) => () => {
      if (!selectedRoomId) return;

      const token = getCookieValue("accessToken");
      if (!token) {
        enqueueSnackbar("로그인 후 사용해주세요", { variant: "warning" });
        return;
      }

      postNewUserMutate({
        token,
        body: {
          isParticipant,
          examReviewRoomId: selectedRoomId,
          enterCode,
        },
      });
    },
    [postNewUserMutate, selectedRoomId, enterCode]
  );

  const handleEnterCodeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEnterCode(event.target.value);

  if (examReviewRoomListQueryStatus === "loading")
    return <Skeleton variant="rectangular" width={"100%"} />;
  if (examReviewRoomListQueryStatus === "error") return <div>Error</div>;

  return (
    <>
      {examReviewRoomListData.map(
        ({
          id,
          examType,
          totalUserCount,
          userPosition,
          isParticipant,
          isRestricted,
          isArchived,
        }) => {
          const isEnterDisableOnArchive = () => {
            if (userGrade === "master") return false;
            if (userGrade === "admin") return false;
            if (userPosition) return false;
            return true;
          };
          return (
            <ExamReviewRoomElement key={id}>
              <Box sx={PositionMarker(userPosition)} />
              <Box sx={ParticipantMarker(isParticipant)} />
              <Typography variant="body2">{examType}</Typography>
              <Typography
                variant="body2"
                sx={{
                  position: "absolute",
                  right: 80,
                }}
              >{`${totalUserCount}명 참여중`}</Typography>
              {isRestricted ? (
                <Button
                  size="small"
                  color="error"
                  variant="text"
                  sx={{
                    position: "absolute",
                    right: 0,
                  }}
                  onClick={handleClosedRoonEnterButtonClick(id, userPosition)}
                >
                  입장제한
                </Button>
              ) : isArchived ? (
                <Button
                  size="small"
                  variant="text"
                  sx={{
                    position: "absolute",
                    right: 0,
                  }}
                  onClick={handleArchiveRoomEnterButton(id)}
                  disabled={isEnterDisableOnArchive()}
                >
                  보관모드
                </Button>
              ) : (
                <Button
                  size="small"
                  variant="text"
                  sx={{
                    position: "absolute",
                    right: 0,
                  }}
                  onClick={handleRoonEnterButtonClick(id, userPosition)}
                >
                  입장하기
                </Button>
              )}
            </ExamReviewRoomElement>
          );
        }
      )}
      <Modal open={isOpen} onClose={handleModalClose}>
        <Box sx={ModalBoxSxProps}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            미응시자는 지정된 시간 중 참석체크에 응해야합니다.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleNewEnterButtonClick(false)}
            >
              미응시자 입장
            </Button>
            <Button
              variant="contained"
              onClick={handleNewEnterButtonClick(true)}
            >
              응시자 입장
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={closedRoomEnterModalOpen}
        onClose={handleClosedRoomEnterModalClose}
      >
        <Box sx={ModalBoxSxProps}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            입장제한중입니다. 입장 코드를 입력하세요.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              label="입장코드"
              value={enterCode}
              onChange={handleEnterCodeChange}
            />
            <Button
              variant="contained"
              onClick={handleNewEnterButtonClick(false)}
            >
              코드제출
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const participantColor = (isParticipant?: boolean) => {
  switch (isParticipant) {
    case true:
      return SignatureColor.BLUE;
    case false:
      return SignatureColor.PURPLE;
    default:
      return "unset";
  }
};
const ParticipantMarker = (isParticipant?: boolean): SxProps => ({
  width: 6,
  height: "80%",
  backgroundColor: participantColor(isParticipant),
  position: "absolute",
  borderRadius: 1,
  left: -18,
});

const positionColor = (userPosition?: string) => {
  switch (userPosition) {
    case "master":
      return SignatureColor.RED;
    case "admin":
      return SignatureColor.RED;
    case "helper":
      return SignatureColor.GREEN;
    default:
      return "unset";
  }
};

const PositionMarker = (userPosition?: string): SxProps => ({
  width: 6,
  height: "80%",
  backgroundColor: positionColor(userPosition),
  position: "absolute",
  borderRadius: 1,
  left: -10,
});

const roomHeadColor = (userPosition?: string) => {
  switch (userPosition) {
    case "master":
      return SignatureColor.RED;
    case "admin":
      return SignatureColor.RED;
    case "helper":
      return SignatureColor.GREEN;
    default:
      return "unset";
  }
};

const RoomHeadBoxSxProps = (userPosition?: string): SxProps => ({
  width: 6,
  height: "80%",
  backgroundColor: roomHeadColor(userPosition),
  position: "absolute",
  borderRadius: 1,
  left: -10,
});

const ModalBoxSxProps: SxProps<Theme> = (theme: Theme) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: SignatureColor.WHITE,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4, 4, 5, 4),
  marginBottom: theme.spacing(20),
  display: "flex",
  flexFlow: "column",

  width: theme.spacing(40),
});

const ExamReviewRoomElement = styled("div")(({ theme }) => ({
  background: SignatureColor.WHITE,
  borderTop: `1px solid ${SignatureColor.GRAY_BORDER}`,
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",

  position: "relative",
  height: theme.spacing(4),

  padding: theme.spacing(0, 2, 0, 2),
}));

export default ExamReviewRoomList;
