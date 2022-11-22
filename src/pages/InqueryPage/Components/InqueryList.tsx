import { Box, SxProps, Typography, useMediaQuery } from "@mui/material";
import { InqueryBoardBoxSxProps } from "..";
import { InqueryListElement } from "../../../hooks/queries/inquery";
import DateFormatting from "../../../utils/dateFormatting";
import LockIcon from "@mui/icons-material/Lock";
import { useSearchParams } from "react-router-dom";

interface InqueryListProps {
  inqueryList: InqueryListElement[];
  inqueryClickCallback: (inqueryId: number) => void;
}

export const InqueryList = ({
  inqueryList,
  inqueryClickCallback,
}: InqueryListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = Number(searchParams.get("id"));
  const isWidthShort = useMediaQuery("(max-width:900px)");

  const handleInqueryElementClick = (inqueryId: number) => () =>
    inqueryClickCallback(inqueryId);

  const nowTime = Date.now();

  return (
    <>
      {inqueryList.map((inquery) => {
        const createdDate = new Date(inquery.createdAt);
        const reformedCreatedDate = new DateFormatting(
          new Date(inquery.createdAt)
        );
        const isPassed24HR = Boolean(
          (nowTime - createdDate.getTime()) / 1000 >= 3600 * 24
        );
        const isSelected = inquery.id === selectedId;
        return (
          <Box
            key={inquery.id}
            sx={InqueryBoardBoxSxProps(isWidthShort, "ELEMENT", isSelected)}
            onClick={handleInqueryElementClick(inquery.id)}
          >
            {isWidthShort ? null : (
              <Typography
                variant={isWidthShort ? "subtitle2" : "subtitle1"}
                sx={{
                  ...InqueryElementSxProps,
                  gridArea: "id",
                }}
              >
                {inquery.id}
              </Typography>
            )}

            <Box
              sx={{
                display: "flex",
                gridArea: "title",
                alignItems: "center",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  maxWidth: "90%",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  mr: 1,
                }}
              >
                {inquery.isPrivate ? (
                  <>
                    비밀글 입니다.
                    <LockIcon fontSize="small" />
                  </>
                ) : (
                  inquery.title
                )}
              </Typography>
            </Box>
            <Typography
              variant={isWidthShort ? "subtitle2" : "subtitle1"}
              sx={{
                ...InqueryElementSxProps,
                gridArea: "author",
              }}
            >
              {inquery.author !== null
                ? inquery.author.userName
                : inquery.guestName}
            </Typography>
            <Typography
              variant={isWidthShort ? "subtitle2" : "subtitle1"}
              sx={{
                ...InqueryElementSxProps,
                gridArea: "time",
              }}
            >
              {isPassed24HR
                ? reformedCreatedDate.MM_DD
                : reformedCreatedDate.HH_MM}
            </Typography>
          </Box>
        );
      })}
    </>
  );
};

const InqueryElementSxProps: SxProps = {
  display: "flex",
  justifyContent: "center",
};
