import { useParams } from "react-router";
import { useGetUserInfoListQuery } from "../../../hooks/queries/examReviewRoom/useGetUserInfoListQuery";
import { getCookieValue } from "../../../utils/handleCookieValue";

export const UserList = () => {
  const { examScheduleId, examField } = useParams();
  const userInfoListQuery = useGetUserInfoListQuery({
    token: getCookieValue("accessToken"),
    examScheduleId,
    examField,
  });

  if (userInfoListQuery.status !== "success") return <div>Loading...</div>;

  return (
    <>
      <div>
        {userInfoListQuery.data.userInfoList.map((userInfo) => {
          return <div>{userInfo.userName}</div>;
        })}
      </div>
    </>
  );
};

export default UserList;
