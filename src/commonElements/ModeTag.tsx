import { styled } from "@mui/system";
import { useContext } from "react";
import { RootContext } from "../context/RootContext";

export const ModeTag = (): JSX.Element => {
  const { userGrade } = useContext(RootContext);
  console.log(userGrade);
  return (
    <>
      <ModeTagContainer>{userGrade || "DEV"} MODE</ModeTagContainer>
    </>
  );
};

const ModeTagContainer = styled("div")(({ theme }) => ({
  position: "fixed",
  zIndex: 99,
  background: "red",
  display: "flex",
  flexFlow: "column-reverse",
  alignItems: "center",
  width: theme.spacing(15),
  height: theme.spacing(15),
  top: theme.spacing(-7.5),
  left: theme.spacing(-7.5),
  transform: "rotate(-45deg)",
}));

export default ModeTag;
