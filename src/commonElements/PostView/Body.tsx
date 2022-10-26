import { Box, SxProps } from "@mui/system";
import { useRef } from "react";
import { SignatureColor } from "../../commonStyles/CommonColor";

interface BodyProps {
  description: string;
  upperBody?: JSX.Element;
  lowerBody?: JSX.Element;
}
export const Body = ({ description, upperBody, lowerBody }: BodyProps) => {
  const bodyBoxRef = useRef<HTMLDivElement>(null);

  return (
    <Box sx={BodyBoxSxProps}>
      {upperBody}
      <Box
        ref={bodyBoxRef}
        sx={MainBodyBoxSxProps}
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
      {lowerBody}
    </Box>
  );
};

const BodyBoxSxProps: SxProps = {
  borderTop: `0.5px solid ${SignatureColor.BLACK_80}`,
  borderBottom: `2px solid ${SignatureColor.BLACK_80}`,
  display: "flex",
  justifyContent: "center",
  flexFlow: "column",
};

const MainBodyBoxSxProps: SxProps = {
  "& img": {
    maxWidth: "100%",
  },
};

export default Body;
