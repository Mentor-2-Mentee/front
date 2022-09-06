import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { useRef, useState } from "react";
import { SignatureColor } from "../../commonStyles/CommonColor";

const MainContentContainerHeight = 700;

export const SwipeableChat = () => {
  const [isHold, setIsHold] = useState<boolean>(false);

  const [containerHeight, setContainerHeight] = useState<number>(-642);
  const boxRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      ref={boxRef}
      sx={{
        position: "absolute",
        bottom: containerHeight,
        width: "100%",
      }}
      onTouchMove={(e) => {
        // console.log(
        //   e.touches[0].clientY - boxRef.current?.getBoundingClientRect().y
        // );
      }}
    >
      <Puller
        onTouchStart={() => {
          console.log("pullerTouch");
        }}
      >
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

  position: "relative",
  zIndex: 15,

  display: "flex",
  justifyContent: "center",
}));

const PullerHandle = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  borderRadius: 3,
  marginTop: 4,
  backgroundColor: SignatureColor.GRAY_BORDER,
}));

const MainContentContainer = styled("div")(({ theme }) => ({
  height: MainContentContainerHeight,
  backgroundColor: "green",
  zIndex: 0,
}));

export default SwipeableChat;
