import { styled } from "@mui/system";
import { MainPageContentsColor } from "../commonStyles/color";
import { CommonSpace } from "../commonStyles/CommonSpace";

export const Footer = (): JSX.Element => {
  return (
    <FooterContainer>
      <div>Contact Us</div>
      <div>Site Map</div>
    </FooterContainer>
  );
};

const FooterContainer = styled("div")(({ theme }) => ({
  height: "100px",
  padding: theme.spacing(CommonSpace.PADDING),
  borderTop: `1px solid ${MainPageContentsColor.BORDER}`,
}));

export default Footer;
