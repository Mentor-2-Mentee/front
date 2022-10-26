import { Box, Typography } from "@mui/material";
import { SignatureColor } from "../../commonStyles/CommonColor";
import DateFormatting from "../../utils/dateFormatting";

type HeaderData = {
  board: string;
  tag?: string;
  detailTag?: string[];
  title: string;
  author: string;
  createdAt: string;
  viewCount: number;
};

interface HeaderProps {
  headerData: HeaderData;
}

export const Header = ({ headerData }: HeaderProps) => {
  const reformedCreatedAt = new DateFormatting(new Date(headerData.createdAt));
  return (
    <>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          pb: 1,
          mb: 1,
          borderBottom: `2px solid ${SignatureColor.BLACK_80}`,
        }}
      >
        {headerData.board}
      </Typography>

      <Box sx={{ p: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h6">[</Typography>
          {headerData.detailTag?.length === 0 ? (
            <Typography variant="h6">{headerData.tag}</Typography>
          ) : (
            <>
              <Typography
                variant="h6"
                sx={{ whiteSpace: "nowrap" }}
              >{`${headerData.tag}/ `}</Typography>
              <Typography
                variant="h6"
                sx={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  maxWidth: 200,
                }}
              >{`${headerData.detailTag?.join(", ")}`}</Typography>
            </>
          )}
          <Typography variant="h6" sx={{ mr: 1 }}>
            ]
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              maxWidth: "100%",
            }}
          >
            {headerData.title}
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            {headerData.author}
          </Typography>
          <Typography variant="subtitle1">
            {`${reformedCreatedAt.YYYY_MM_DD} / ${reformedCreatedAt.HH_MM_SS}`}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ flex: 1, display: "flex", justifyContent: "end" }}
          >
            {`조회수 ${headerData.viewCount}`}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Header;
