import { styled } from "@mui/system";

export const DevelopmentTag = (): JSX.Element => {
  return (
    <>
      <DevelopmentTagContainer>DEV MODE</DevelopmentTagContainer>
    </>
  );
};

const DevelopmentTagContainer = styled("div")(({ theme }) => ({
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
