import { Box, Typography } from "@mui/material";
import { Chat } from ".";
import { SignatureColor } from "../../commonStyles/CommonColor";
import DateFormatting from "../../utils/dateFormatting";

interface ChatProps {
  chat: Chat;
  isContinuous?: boolean;
  samePrevUser?: boolean;
  sameNextUser?: boolean;
}

export const MyChat = ({ chat, isContinuous }: ChatProps) => {
  const reFormattedCreatedAt = new DateFormatting(new Date(chat.createdAt));
  const isDateChange =
    new Date(chat.createdAt).getDate() !== new Date().getDate();
  return (
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
          {isDateChange
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
                backgroundColor: SignatureColor.LIGHT_YELLOW,
                borderRadius: 4,
              }}
              loading="lazy"
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
                  }}
                  loading="lazy"
                />
              );
            })
          )}
        </Box>

        <Typography
          variant="subtitle2"
          sx={{
            p: 0.5,
            borderRadius: 1,
            wordBreak: "break-all",
            display: "flex",
            flexFlow: "row",
          }}
        >
          {chat.text}
        </Typography>
      </Box>
    </Box>
  );
};

export const OtherChat = ({
  chat,
  samePrevUser,
  sameNextUser,
  isContinuous,
}: ChatProps) => {
  const reFormattedCreatedAt = new DateFormatting(new Date(chat.createdAt));
  const isDateChange =
    new Date(chat.createdAt).getDate() !== new Date().getDate();
  return (
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
                  backgroundColor: SignatureColor.LIGHT_YELLOW,
                  borderRadius: 4,
                }}
                loading="lazy"
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
                    }}
                    loading="lazy"
                  />
                );
              })
            )}
          </Box>

          <Typography
            variant="subtitle2"
            sx={{
              p: 0.5,
              borderRadius: 1,
              wordBreak: "break-all",
              display: "flex",
              flexFlow: "row",
            }}
          >
            {chat.text}
          </Typography>
        </Box>
        {sameNextUser && isContinuous ? null : (
          <Typography variant="subtitle2" sx={{ ml: 0.5 }}>
            {isDateChange
              ? `${reFormattedCreatedAt.YYYY_MM_DD} / ${reFormattedCreatedAt.HH_MM}`
              : reFormattedCreatedAt.HH_MM}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
