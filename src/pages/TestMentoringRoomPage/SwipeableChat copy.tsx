import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { useRef, useState } from "react";
import { SignatureColor } from "../../commonStyles/CommonColor";

const MainContentContainerHeight = 600;

export const SwipeableChat = () => {
  const [isHold, setIsHold] = useState<boolean>(false);

  const [containerHeight, setContainerHeight] = useState<number>(-550);
  const boxRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      ref={boxRef}
      sx={{
        width: "100%",
        position: "absolute",
        bottom: containerHeight,
        zIndex: 0,
        overflow: "hidden",
      }}
      onMouseMove={(e) => {
        // if (!isHold) return;
        // console.log(e.pageY - (boxRef.current?.getBoundingClientRect().y || 0));
        setContainerHeight(
          -1 *
            (e.pageY + 100 - (boxRef.current?.getBoundingClientRect().y || 0))
        );
      }}
      onMouseDown={() => {
        setIsHold(true);
      }}
      onMouseUp={() => {
        setIsHold(false);
      }}
    >
      <Puller>
        <PullerHandle />
      </Puller>
      <MainContentContainer>왈랄랄루</MainContentContainer>
    </Box>
  );
};

const Puller = styled("div")(({ theme }) => ({
  width: "100%",
  height: theme.spacing(3),
  borderTopLeftRadius: theme.spacing(1),
  borderTopRightRadius: theme.spacing(1),
  borderTop: `1px solid ${SignatureColor.GRAY_BORDER}`,

  backgroundColor: SignatureColor.RED,

  display: "flex",
  justifyContent: "center",

  //   position: "absolute",
  //   bottom: 58,
}));

const PullerHandle = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  borderRadius: 3,
  marginTop: 4,
  backgroundColor: SignatureColor.GRAY_BORDER,
}));

const MainContentContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: MainContentContainerHeight,
}));

export default SwipeableChat;
