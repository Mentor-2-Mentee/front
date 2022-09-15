interface UserListProps {
  userList: number[];
}

export const UserList = ({ userList }: UserListProps) => {
  return (
    <>
      <div>
        {userList.map((userId) => {
          return <div>{userId}</div>;
        })}
      </div>
    </>
  );
};

export default UserList;
