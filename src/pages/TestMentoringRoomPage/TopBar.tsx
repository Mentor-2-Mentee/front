import { Box, Button, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { SignatureColor } from "../../commonStyles/CommonColor";

export const TopBar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Tabs
      //   value={value}
      //   onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile
      aria-label="scrollable auto tabs example"
      sx={{
        borderBottom: `1px solid ${SignatureColor.BLACK_80}`,
      }}
    >
      <Tab label="문제수 설정" />
      <Tab label="PDF로 다운로드" />
      <Tab label="Item Three" />
      <Tab label="Item Four" />
      <Tab label="Item Five" />
      <Tab label="Item Six" />
      <Tab label="Item Seven" />
    </Tabs>
  );
};

export default TopBar;
