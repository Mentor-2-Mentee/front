import { ChatElement } from "../../../pages/RoomPage/LiveChat/LiveChatElement";
import { ChatSocketCacheEntity } from ".";
import { PreviousChatResponse } from "./subscribePreviousChatSocket";
import { LiveChatResponse } from "./subscribeLiveChatSocket";

type SortDataOption = keyof ChatElement;

interface updateOldChatDataParams {
  oldData: ChatSocketCacheEntity;
  insertData: PreviousChatResponse;
}

export const updateOldChatData = ({
  oldData,
  insertData,
}: updateOldChatDataParams): ChatSocketCacheEntity => {
  const aliveOldChatDataStartIndex = oldData.chatList.findIndex(
    (chatElement) =>
      chatElement.createAt.toString() === insertData.targetTimeStamp
  );
  const aliveOldChatData =
    aliveOldChatDataStartIndex === -1
      ? []
      : [...oldData.chatList.slice(aliveOldChatDataStartIndex)];

  const newInsertChatStartIndex = insertData.previousChatListData.findIndex(
    (chatElement) =>
      chatElement.createAt.toString() === insertData.targetTimeStamp
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
    if (new Date(leftElement.createAt) > new Date(RightElement.createAt))
      return 1;
    if (new Date(leftElement.createAt) < new Date(RightElement.createAt))
      return -1;
    return 0;
  });

  return {
    chatList: sortedByCreatedAtNewChatList,
    latestChatIndex: insertData.latestChatIndex,
  };
};
