import { styled } from "@mui/system";
import { SignatureColor } from "../../../../commonStyles/CommonColor";

const WEEK_DAYS = ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"];

export const DayNavigation = (): JSX.Element => {
  const setDayColor = (day: string): SignatureColor => {
    if (day === "SUN") return SignatureColor.RED;
    if (day === "SAT") return SignatureColor.BLUE;
    return SignatureColor.BLACK_80;
  };
  return (
    <DayNavigationContainer>
      {WEEK_DAYS.map((day) => {
        return (
          <DayElement key={day} sx={{ color: setDayColor(day) }}>
            {day}
          </DayElement>
        );
      })}
    </DayNavigationContainer>
  );
};

const DayNavigationContainer = styled("div")(({}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
}));

const DayElement = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: SignatureColor.GRAY_BORDER,
  height: theme.spacing(4),
  border: `2px solid ${SignatureColor.GRAY}`,
  boxSizing: "border-box",
  fontWeight: "bold",
}));

export default DayNavigation;
