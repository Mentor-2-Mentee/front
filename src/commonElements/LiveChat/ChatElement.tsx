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
        maxWidth: "100%",
        alignItems: "end",
        mb: 0.5,
        mr: 2,
        ml: 5,
        position: "relative",
      }}
    >
      {isContinuous ? null : (
        <Typography variant="subtitle2" sx={{ mr: 0.5 }}>
          {isDateChange
            ? `${reFormattedCreatedAt.YYYY_MM_DD} / ${reFormattedCreatedAt.HH_MM}`
            : reFormattedCreatedAt.HH_MM}
        </Typography>
      )}

      {chat.imageUrl ? (
        <img
          src={chat.imageUrl}
          style={{
            width: "50%",
            maxWidth: 300,
            backgroundColor: SignatureColor.LIGHT_YELLOW,
            padding: 10,
            borderRadius: 4,
          }}
          loading="lazy"
        />
      ) : (
        <Typography
          variant="subtitle2"
          sx={{
            backgroundColor: SignatureColor.LIGHT_YELLOW,
            p: 0.5,
            borderRadius: 1,
          }}
        >
          {chat.text}
        </Typography>
      )}
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
    <Box sx={{ mb: sameNextUser ? 0.5 : 1, ml: 0.5, mr: 5, maxWidth: "100%" }}>
      {samePrevUser ? null : (
        <Typography variant="subtitle1">{chat.author.userName}</Typography>
      )}
      <Box sx={{ display: "flex", maxWidth: "100%", alignItems: "end" }}>
        {chat.imageUrl ? (
          <img
            src={chat.imageUrl}
            style={{ width: "50%", maxWidth: 300 }}
            loading="lazy"
          />
        ) : (
          <Typography
            variant="subtitle2"
            sx={{
              backgroundColor: SignatureColor.LAVENDER,
              p: 0.5,
              borderRadius: 1,
            }}
          >
            {chat.text}
          </Typography>
        )}
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
