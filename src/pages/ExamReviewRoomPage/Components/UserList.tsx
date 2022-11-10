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
import { useDeleteCurrentUserMutation } from "../../../hooks/queries/examReviewRoomUser/useDeleteCurrentUserMutation";
import { useUpdateExamParticipantMutation } from "../../../hooks/queries/examReviewRoomUser/useUpdateExamParticipantMutation";

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

  const { mutate: deleteCurrentUserMutate } = useDeleteCurrentUserMutation(
    examReviewRoomId,
    enqueueSnackbar
  );

  const { mutate: updateParticipantMutate } =
    useUpdateExamParticipantMutation(enqueueSnackbar);

  const changeParticipantState = useCallback(
    (isParticipant: boolean) => {
      const token = getCookieValue("accessToken");
      if (!token) {
        enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
        return;
      }
      updateParticipantMutate({
        token,
        body: {
          examReviewRoomId,
          isParticipant,
        },
      });
    },
    [examReviewRoomId, updateParticipantMutate]
  );

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

  const userKick = useCallback(
    (targetUserId: string) => {
      const token = getCookieValue("accessToken");
      if (!token) {
        enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
        return;
      }
      deleteCurrentUserMutate({
        token,
        examReviewRoomId,
        targetUserId,
      });
    },
    [examReviewRoomId, deleteCurrentUserMutate]
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
                userPositionChangeCallback={assignNewPosition}
                userKickCallback={userKick}
                changeParticipantStateCallback={changeParticipantState}
                user={user}
              />
            );
          })
        : null}

      {mode === "admin"
        ? adminList.map((user) => {
            return (
              <UserElement
                userPositionChangeCallback={assignNewPosition}
                userKickCallback={userKick}
                changeParticipantStateCallback={changeParticipantState}
                user={user}
              />
            );
          })
        : null}

      {mode === "helper"
        ? helperList.map((user) => {
            return (
              <UserElement
                userPositionChangeCallback={assignNewPosition}
                userKickCallback={userKick}
                changeParticipantStateCallback={changeParticipantState}
                user={user}
              />
            );
          })
        : null}

      {mode === "participant"
        ? participantList.map((user) => {
            return (
              <UserElement
                userPositionChangeCallback={assignNewPosition}
                userKickCallback={userKick}
                changeParticipantStateCallback={changeParticipantState}
                user={user}
              />
            );
          })
        : null}

      {mode === "nonParticipant"
        ? nonParticipantList.map((user) => {
            return (
              <UserElement
                userPositionChangeCallback={assignNewPosition}
                userKickCallback={userKick}
                changeParticipantStateCallback={changeParticipantState}
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
  userPositionChangeCallback: (
    targetUserId: string,
    newPosition: string
  ) => void;
  userKickCallback: (targetUserId: string) => void;
  changeParticipantStateCallback: (isParticiPant: boolean) => void;
}

const UserElement = ({
  user,
  userPositionChangeCallback,
  userKickCallback,
  changeParticipantStateCallback,
}: UserElementProps) => {
  const { id, userGrade } = useContext(RootContext);
  const handleAssignHelperButton =
    (targetUserId: string, newPosition: string) => () => {
      userPositionChangeCallback(targetUserId, newPosition);
    };

  const handleUserKickButton =
    (targetUserName: string, targetUserId: string) => () => {
      const isKick = confirm(`${targetUserName}님을 내보내겠습니까?`);
      if (!isKick) return;
      userKickCallback(targetUserId);
    };

  const toggleParticipantState = (isParticipant: boolean) => () => {
    changeParticipantStateCallback(isParticipant);
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
        flexWrap: "wrap",
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
      {user.userProfile.id === id ? (
        <Button
          size="small"
          sx={{
            color: user.isParticipant
              ? SignatureColor.PURPLE
              : SignatureColor.BLUE,
          }}
          onClick={toggleParticipantState(!user.isParticipant)}
        >
          {user.isParticipant ? "미응시 전환" : "응시 전환"}
        </Button>
      ) : null}
      {user.userPosition === "user" &&
      (userGrade === "admin" || userGrade === "master") ? (
        <Box>
          <Button
            size="small"
            color="warning"
            onClick={handleUserKickButton(
              user.userProfile.userName,
              user.userProfile.id
            )}
          >
            내보내기
          </Button>
          <Button
            size="small"
            onClick={handleAssignHelperButton(user.userProfile.id, "helper")}
          >
            도우미 지정하기
          </Button>
        </Box>
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
