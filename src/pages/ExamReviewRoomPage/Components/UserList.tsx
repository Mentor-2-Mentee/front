import { CircularProgress } from "@mui/material";
import id from "date-fns/esm/locale/id/index.js";
import { useParams } from "react-router";
import { useGetUserInfoListQuery } from "../../../hooks/queries/examReviewRoom/useGetUserInfoListQuery";
import { getCookieValue } from "../../../utils/handleCookieValue";

export const UserList = () => {
  const examReviewRoomId = Number(useParams().examReviewRoomId);
  const { data: userListData, status: userListQueryStatus } =
    useGetUserInfoListQuery({
      token: getCookieValue("accessToken"),
      examReviewRoomId,
    });

  if (userListQueryStatus === "loading") return <CircularProgress />;
  if (userListQueryStatus === "error") return <div>Error</div>;

  return (
    <>
      <div>
        {userListData.userList.map((user) => {
          return (
            <div>
              <div>{user.userProfile.userName}</div>
              <div>{user.userPosition}</div>
              <div>{`제출수 : ${user.rawExamQuestionList.length}`}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserList;
