import { CircularProgress } from "@mui/material";
import id from "date-fns/esm/locale/id/index.js";
import { useParams } from "react-router";
import { useGetUserInfoListQuery } from "../../../hooks/queries/examReviewRoom/useGetUserInfoListQuery";
import { getCookieValue } from "../../../utils/handleCookieValue";

export const UserList = () => {
  const examReviewRoomId = Number(useParams().examReviewRoomId);
  const userInfoListQuery = useGetUserInfoListQuery({
    token: getCookieValue("accessToken"),
    examReviewRoomId,
  });

  if (userInfoListQuery.status === "loading") return <CircularProgress />;
  if (userInfoListQuery.status === "error") return <div>Error</div>;

  return (
    <>
      <div>
        {userInfoListQuery.data.userList.adminUserId.map((admin) => {
          return <div>{admin}</div>;
        })}
      </div>
      <div>
        {userInfoListQuery.data.userList.participantUserId.map(
          (participantUser) => {
            return <div>{participantUser}</div>;
          }
        )}
      </div>
      <div>
        {userInfoListQuery.data.userList.nonParticipantUserId.map(
          (nonParticipantUser) => {
            return <div>{nonParticipantUser}</div>;
          }
        )}
      </div>
    </>
  );
};

export default UserList;
