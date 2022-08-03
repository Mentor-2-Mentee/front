import { LiveChatCacheDataEntitiy } from ".";
import { PreviousChatResponse } from "./subscribePreviousChatSocket";

interface updateOldChatDataParams {
  oldData: LiveChatCacheDataEntitiy;
  insertData: PreviousChatResponse;
}

export const updateOldChatData = ({
  oldData,
  insertData,
}: updateOldChatDataParams): LiveChatCacheDataEntitiy => {
  const aliveOldChatDataStartIndex = oldData.chatList.findIndex(
    (chatElement) =>
      chatElement.createdAt.toString() === insertData.targetTimeStamp
  );
  const aliveOldChatData =
    aliveOldChatDataStartIndex === -1
      ? []
      : [...oldData.chatList.slice(aliveOldChatDataStartIndex)];

  const newInsertChatStartIndex = insertData.previousChatListData.findIndex(
    (chatElement) =>
      chatElement.createdAt.toString() === insertData.targetTimeStamp
  );
  const newInsertChatData = [
    ...insertData.previousChatListData.slice(
      0,
      newInsertChatStartIndex === -1 ? undefined : newInsertChatStartIndex
    ),
  ];

  const sortedByCreatedAtNewChatList = [
    ...newInsertChatData,
    ...aliveOldChatData,
  ].sort((leftElement, RightElement) => {
    if (new Date(leftElement.createdAt) > new Date(RightElement.createdAt))
      return 1;
    if (new Date(leftElement.createdAt) < new Date(RightElement.createdAt))
      return -1;
    return 0;
  });

  return {
    chatList: sortedByCreatedAtNewChatList,
    latestChatIndex: insertData.latestChatIndex,
  };
};
