import { styled } from "@mui/system";
import { SignatureColor } from "../commonStyles/CommonColor";

export const LiveAlarmBox = (): JSX.Element => {
  return (
    <LiveAlarmBoxStyle>
      <div>LIVE!!</div>
    </LiveAlarmBoxStyle>
  );
};

const LiveAlarmBoxStyle = styled("div")(({ theme }) => ({
  backgroundColor: SignatureColor.RED,
  color: SignatureColor.WHITE,
  borderRadius: 5,
  padding: theme.spacing(0.25, 1, 0.25, 1),
  fontWeight: "bold",

  animationName: "LiveAlarm",
  animationDuration: "2500ms",
  animationIterationCount: "infinite",
  animationTimingFunction: "ease-in-out",
  "@keyframes LiveAlarm": {
    from: {
      opacity: 1,
    },
    "50%": {
      opacity: 0.1,
    },
    to: {
      opacity: 1,
    },
  },
}));

export default LiveAlarmBox;
