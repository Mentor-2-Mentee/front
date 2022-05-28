import { styled } from "@mui/system";
import { useState } from "react";
import FilterOptionHandler from "../../commonElements/FilterOptionHandler";
import { CommonSpace } from "../../commonStyles/CommonSpace";

import DEV_DATA from "./DEV_DATA.json";

export const MentoringRoomsPage = (): JSX.Element => {
  const [testList, setTestList] = useState<any>();

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTestList([...testList]);
  };

  return (
    <MentoringRoomsPageContainer>
      <FilterOptionHandler filterElements={DEV_DATA.FILTER_OPTION_ELEMENTS} />
    </MentoringRoomsPageContainer>
  );
};

const MentoringRoomsPageContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(CommonSpace.MARGIN),
}));

export default MentoringRoomsPage;
