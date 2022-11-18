import { Box, Typography } from "@mui/material";
import { Chat } from ".";
import { SignatureColor } from "../../commonStyles/CommonColor";
import DateFormatting from "../../utils/dateFormatting";
import DateSeparator from "./DateSeparator";

interface ChatProps {
  chat: Chat;
  imageSelect: (imageUrl: string) => void;
  isContinuous?: boolean;
  samePrevUser?: boolean;
  sameNextUser?: boolean;
  isDateChange?: boolean;
}

export const MyChat = ({
  chat,
  isContinuous,
  imageSelect,
  isDateChange,
}: ChatProps) => {
  const reFormattedCreatedAt = new DateFormatting(new Date(chat.createdAt));
  const isOldChat = new Date(chat.createdAt).getDate() !== new Date().getDate();

  const handleImageClick = (imageUrl: string) => () => imageSelect(imageUrl);
  return (
    <>
      {isDateChange ? (
        <DateSeparator key={chat.createdAt} timeStamp={chat.createdAt} />
      ) : null}
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "end",
          mb: 0.5,
          mr: 2,
          ml: 5,
        }}
      >
        {isContinuous ? null : (
          <Typography variant="subtitle2" sx={{ mr: 0.5 }}>
            {isOldChat
              ? `${reFormattedCreatedAt.YYYY_MM_DD} / ${reFormattedCreatedAt.HH_MM}`
              : reFormattedCreatedAt.HH_MM}
          </Typography>
        )}

        <Box
          sx={{
            backgroundColor: SignatureColor.LIGHT_YELLOW,
            p: 0.25,
            borderRadius: 1,
            display: "flex",
            flexFlow: "column",
            alignItems: "end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {chat.imageUrlList.length === 1 ? (
              <img
                src={chat.imageUrlList[0]}
                style={{
                  maxWidth: 300,
                  borderRadius: 4,
                  cursor: "pointer",
                }}
                loading="lazy"
                onClick={handleImageClick(chat.imageUrlList[0])}
              />
            ) : (
              chat.imageUrlList.map((imageUrl) => {
                return (
                  <img
                    src={imageUrl}
                    style={{
                      width: 100,
                      height: 100,
                      flex: "1 1 30%",
                      padding: 2,
                      cursor: "pointer",
                    }}
                    loading="lazy"
                    onClick={handleImageClick(imageUrl)}
                  />
                );
              })
            )}
          </Box>

          {chat.text.length === 0 ? null : (
            <Typography
              variant="subtitle2"
              sx={{
                m: 0.5,
                p: 0.5,
                borderRadius: 1,
                wordBreak: "break-all",
                display: "flex",
                flexFlow: "row",
              }}
            >
              {chat.text}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export const OtherChat = ({
  chat,
  samePrevUser,
  sameNextUser,
  isContinuous,
  imageSelect,
  isDateChange,
}: ChatProps) => {
  const reFormattedCreatedAt = new DateFormatting(new Date(chat.createdAt));
  const isOldChat = new Date(chat.createdAt).getDate() !== new Date().getDate();
  const handleImageClick = (imageUrl: string) => () => imageSelect(imageUrl);
  return (
    <>
      {isDateChange ? (
        <DateSeparator key={chat.createdAt} timeStamp={chat.createdAt} />
      ) : null}
      <Box
        sx={{
          mb: sameNextUser ? 0.5 : 1,
          ml: 0.5,
          mr: 5,
        }}
      >
        {samePrevUser ? null : (
          <Typography variant="subtitle1">{chat.author.userName}</Typography>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
          }}
        >
          <Box
            sx={{
              backgroundColor: SignatureColor.LAVENDER,
              p: 0.5,
              borderRadius: 1,
              display: "flex",
              flexFlow: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {chat.imageUrlList.length === 1 ? (
                <img
                  src={chat.imageUrlList[0]}
                  style={{
                    maxWidth: 300,
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                  loading="lazy"
                  onClick={handleImageClick(chat.imageUrlList[0])}
                />
              ) : (
                chat.imageUrlList.map((imageUrl) => {
                  return (
                    <img
                      src={imageUrl}
                      style={{
                        width: 100,
                        height: 100,
                        flex: "1 1 30%",
                        padding: 2,
                        cursor: "pointer",
                      }}
                      loading="lazy"
                      onClick={handleImageClick(imageUrl)}
                    />
                  );
                })
              )}
            </Box>

            {chat.text.length === 0 ? null : (
              <Typography
                variant="subtitle2"
                sx={{
                  m: 0.5,
                  p: 0.5,
                  borderRadius: 1,
                  wordBreak: "break-all",
                  display: "flex",
                  flexFlow: "row",
                }}
              >
                {chat.text}
              </Typography>
            )}
          </Box>
          {sameNextUser && isContinuous ? null : (
            <Typography variant="subtitle2" sx={{ ml: 0.5 }}>
              {isOldChat
                ? `${reFormattedCreatedAt.YYYY_MM_DD} / ${reFormattedCreatedAt.HH_MM}`
                : reFormattedCreatedAt.HH_MM}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};
