import {
  Box,
  Button,
  CircularProgress,
  SxProps,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useCallback, useContext, useState } from "react";
import { useParams } from "react-router";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { RootContext } from "../../../hooks/context/RootContext";
import { useUpdateUserPositionMutation } from "../../../hooks/queries/examReviewRoomUser/useUpdateUserPositionMutation";
import {
  ExamReviewRoomUser,
  useGetUserListQuery,
} from "../../../hooks/queries/examReviewRoomUser";
import { getCookieValue } from "../../../utils/handleCookieValue";

type Mode = "all" | "admin" | "helper" | "participant" | "nonParticipant";

export const UserList = () => {
  const examReviewRoomId = Number(useParams().examReviewRoomId);
  const { data, status: userListQueryStatus } = useGetUserListQuery({
    token: getCookieValue("accessToken"),
    examReviewRoomId,
  });
  const [mode, setMode] = useState<Mode>("all");
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: updateRoomUserPositionMutate } =
    useUpdateUserPositionMutation(examReviewRoomId, enqueueSnackbar);

  const assignNewPosition = useCallback(
    (targetUserId: string, newPosition: string) => {
      const token = getCookieValue("accessToken");
      if (!token) {
        enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
        return;
      }
      updateRoomUserPositionMutate({
        token,
        body: {
          examReviewRoomId,
          targetUserId,
          newPosition,
        },
      });
    },
    [examReviewRoomId, updateRoomUserPositionMutate]
  );

  if (userListQueryStatus === "loading") return <CircularProgress />;
  if (userListQueryStatus === "error") return <div>Error</div>;

  const { userList } = data;

  const adminList = userList.filter(
    (user) =>
      user.userProfile.userGrade === "admin" ||
      user.userProfile.userGrade === "master"
  );
  const helperList = userList.filter((user) => user.userPosition === "helper");
  const participantList = userList.filter((user) => user.isParticipant);
  const nonParticipantList = userList.filter((user) => !user.isParticipant);

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: SignatureColor.GRAY,
        }}
      >
        <Button
          sx={{ color: SignatureColor.BLACK, fontWeight: "bold" }}
          onClick={() => {
            setMode("all");
          }}
        >
          {`전체 (${userList.length})`}
        </Button>
        <Button
          sx={{ color: SignatureColor.RED, fontWeight: "bold" }}
          onClick={() => {
            setMode("admin");
          }}
        >
          {`관리자 (${adminList.length})`}
        </Button>
        <Button
          sx={{ color: SignatureColor.GREEN, fontWeight: "bold" }}
          onClick={() => {
            setMode("helper");
          }}
        >
          {`도우미 (${helperList.length})`}
        </Button>
        <Button
          sx={{ fontWeight: "bold" }}
          onClick={() => {
            setMode("participant");
          }}
        >
          {`응시자 (${participantList.length})`}
        </Button>
        <Button
          sx={{ color: SignatureColor.PURPLE, fontWeight: "bold" }}
          onClick={() => {
            setMode("nonParticipant");
          }}
        >
          {`미응시자 (${nonParticipantList.length})`}
        </Button>
      </Box>
      {mode === "all"
        ? userList.map((user) => {
            return (
              <UserElement
                userPositionChangeCallBack={assignNewPosition}
                user={user}
              />
            );
          })
        : null}

      {mode === "admin"
        ? adminList.map((user) => {
            return (
              <UserElement
                userPositionChangeCallBack={assignNewPosition}
                user={user}
              />
            );
          })
        : null}

      {mode === "helper"
        ? helperList.map((user) => {
            return (
              <UserElement
                userPositionChangeCallBack={assignNewPosition}
                user={user}
              />
            );
          })
        : null}

      {mode === "participant"
        ? participantList.map((user) => {
            return (
              <UserElement
                userPositionChangeCallBack={assignNewPosition}
                user={user}
              />
            );
          })
        : null}

      {mode === "nonParticipant"
        ? nonParticipantList.map((user) => {
            return (
              <UserElement
                userPositionChangeCallBack={assignNewPosition}
                user={user}
              />
            );
          })
        : null}
    </Box>
  );
};

interface UserElementProps {
  user: ExamReviewRoomUser;
  userPositionChangeCallBack: (
    targetUserId: string,
    newPosition: string
  ) => void;
}

const UserElement = ({
  user,
  userPositionChangeCallBack,
}: UserElementProps) => {
  const { id, userGrade } = useContext(RootContext);
  const handleAssignHelperButton =
    (targetUserId: string, newPosition: string) => () => {
      userPositionChangeCallBack(targetUserId, newPosition);
    };

  return (
    <Box
      sx={{
        background: SignatureColor.WHITE,
        borderBottom: `1px solid ${SignatureColor.GRAY_BORDER}`,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        p: 0.5,
        pl: 4,
      }}
    >
      <Box sx={PositionMarker(user.userPosition)} />
      <Box sx={ParticipantMarker(user.isParticipant)} />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="subtitle1" fontWeight={"500"} width={120}>
          {user.userProfile.userName}
        </Typography>
        {user.isParticipant ? (
          <Typography variant="subtitle2">{`문제 제출 수 : ${user.rawExamQuestionList.length}`}</Typography>
        ) : null}
      </Box>
      {user.userPosition === "user" &&
      (userGrade === "admin" || userGrade === "master") ? (
        <Button
          size="small"
          onClick={handleAssignHelperButton(user.userProfile.id, "helper")}
        >
          도우미 지정하기
        </Button>
      ) : null}
      {user.userPosition === "helper" &&
      (userGrade === "admin" || userGrade === "master") ? (
        <Button
          size="small"
          color="warning"
          onClick={handleAssignHelperButton(user.userProfile.id, "user")}
        >
          도우미 해제하기
        </Button>
      ) : null}
    </Box>
  );
};

const ParticipantMarker = (isParticipant: boolean): SxProps => ({
  width: 6,
  height: "80%",
  backgroundColor: isParticipant ? SignatureColor.BLUE : SignatureColor.PURPLE,
  position: "absolute",
  borderRadius: 1,
  left: 8,
});

const positionColor = (userPosition: string) => {
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

const PositionMarker = (userPosition: string): SxProps => ({
  width: 6,
  height: "80%",
  backgroundColor: positionColor(userPosition),
  position: "absolute",
  borderRadius: 1,
  left: 16,
});

export default UserList;
