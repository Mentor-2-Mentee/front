import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import {
  tagTreeMapConstructor,
  FilterTree,
} from "../../commonElements/FilterOptionHandler/tagTreeMapConstructor";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { getQuestionTagList } from "../../api/getQuestionTagList";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { createQuestionTag } from "../../api/questionTag/createQuestionTag";
import { deleteQuestionTag } from "../../api/questionTag/deleteQuestionTag";
import { getCookieValue } from "../../utils/handleCookieValue";
import React from "react";

type TagManageMode = "CREATE" | "DELETE";

export const TagManagement = (): JSX.Element => {
  const [tagTree, setTagTree] = useState<FilterTree>();
  const [parentTagList, setParentTagList] = useState<string[]>([]);
  const [selectedParentTag, setSelectedParentTag] = useState<string>();
  const [selectedChildTag, setSelectedChildTag] = useState<string>();
  const [childFilterTagList, setChildFilterTagList] = useState<string[]>([]);
  const [mode, setMode] = useState<TagManageMode>("CREATE");

  const [inputNewParentTag, setInputNewParentTag] = useState<string>();
  const [inputNewChildTag, setInputNewChildTag] = useState<string>();

  const setCurrentQuestionTagList = async () => {
    const { data } = await getQuestionTagList();
    if (!data) return;
    const tagTree = tagTreeMapConstructor(data);
    setTagTree(tagTree);
  };

  const handleParentTagChange = (event: SelectChangeEvent) => {
    setSelectedParentTag(event.target.value);
  };

  const handleChildTagChange = (event: SelectChangeEvent) => {
    setSelectedChildTag(event.target.value as string);
  };

  const handleModeChangeSwitch = () => {
    if (mode === "CREATE") setMode("DELETE");
    if (mode === "DELETE") setMode("CREATE");
    setSelectedParentTag(undefined);
    setSelectedChildTag(undefined);
  };

  const handleInputNewParentTag = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputNewParentTag(event.currentTarget.value);
  };

  const handleInputNewChildTag = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputNewChildTag(event.currentTarget.value);
  };

  const createParentQuestionTag = async () => {
    const token = getCookieValue("accessToken");
    if (!inputNewParentTag || !token) return;

    await createQuestionTag({
      token: token,
      tagName: inputNewParentTag,
    });
    await setCurrentQuestionTagList();
  };

  const deleteParentQuestionTag = async () => {
    const token = getCookieValue("accessToken");
    if (!selectedParentTag || !token) return;

    await deleteQuestionTag({
      token: token,
      tagName: selectedParentTag,
    });
    await setCurrentQuestionTagList();
  };

  const createChildQuestionTag = async () => {
    const token = getCookieValue("accessToken");
    if (!selectedParentTag || !inputNewChildTag || !token) return;

    await createQuestionTag({
      token: token,
      parentTag: selectedParentTag,
      tagName: inputNewChildTag,
    });
    await setCurrentQuestionTagList();
  };

  const deleteChildQuestionTag = async () => {
    const token = getCookieValue("accessToken");
    if (!selectedParentTag || !selectedChildTag || !token) return;

    await deleteQuestionTag({
      token: token,
      parentTag: selectedParentTag,
      tagName: selectedChildTag,
    });
    await setCurrentQuestionTagList();
  };

  useEffect(() => {
    setCurrentQuestionTagList();
  }, []);

  useEffect(() => {
    if (!tagTree) return;
    setParentTagList(Array.from(tagTree.keys()));
  }, [tagTree]);

  useEffect(() => {
    if (!selectedParentTag || !tagTree) return;
    setChildFilterTagList(
      tagTree.get(selectedParentTag)?.childFilterOptionList || []
    );
  }, [selectedParentTag, tagTree]);

  return (
    <TagManagementContainer>
      <Typography variant="h6">질문태그관리</Typography>
      <FormControlLabel
        control={<Switch defaultChecked />}
        label={mode}
        onClick={handleModeChangeSwitch}
        sx={switchStyle}
      />
      <TagManagementHandler>
        <FormControl size="small" sx={{ width: 200 }}>
          <InputLabel>{mode === "CREATE" ? null : "질문유형선택"}</InputLabel>
          {mode === "CREATE" ? (
            <TextField
              size="small"
              variant="outlined"
              placeholder="질문유형입력"
              value={inputNewParentTag}
              onChange={handleInputNewParentTag}
            />
          ) : (
            <Select
              value={selectedParentTag}
              label="질문유형들"
              onChange={handleParentTagChange}
              MenuProps={selectMenuProps}
            >
              {parentTagList.map((parentTag) => {
                return <MenuItem value={parentTag}>{parentTag}</MenuItem>;
              })}
            </Select>
          )}
          <Button
            variant="contained"
            color={mode === "CREATE" ? "primary" : "warning"}
            onClick={() => {
              if (mode === "CREATE") {
                createParentQuestionTag();
              }
              if (mode === "DELETE") {
                deleteParentQuestionTag();
              }
            }}
          >
            {mode === "CREATE" ? "질문유형 생성" : "질문유형 삭제"}
          </Button>
        </FormControl>

        <CreateChildTagContainer>
          {mode === "CREATE" ? (
            <FormControl size="small" sx={{ width: 200 }}>
              <InputLabel>질문유형들</InputLabel>
              <Select
                value={selectedParentTag}
                label="질문유형들"
                onChange={handleParentTagChange}
                MenuProps={selectMenuProps}
              >
                {parentTagList.map((parentTag) => {
                  return <MenuItem value={parentTag}>{parentTag}</MenuItem>;
                })}
              </Select>
              <TextField
                size="small"
                variant={Boolean(selectedParentTag) ? "outlined" : "filled"}
                placeholder={
                  Boolean(selectedParentTag)
                    ? undefined
                    : "상위 질문유형선택필수"
                }
                disabled={!Boolean(selectedParentTag)}
                value={inputNewChildTag}
                onChange={handleInputNewChildTag}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={createChildQuestionTag}
              >
                질문세부유형 생성
              </Button>
            </FormControl>
          ) : (
            <FormControl size="small" sx={{ width: 200 }}>
              <InputLabel>질문세부유형들</InputLabel>
              <Select
                value={selectedParentTag}
                label="질문유형들"
                onChange={handleChildTagChange}
                MenuProps={selectMenuProps}
              >
                {childFilterTagList.map((childFilterTag) => {
                  return (
                    <MenuItem value={childFilterTag}>{childFilterTag}</MenuItem>
                  );
                })}
              </Select>
              <Button
                variant="contained"
                color="warning"
                onClick={deleteChildQuestionTag}
              >
                질문세부유형 삭제
              </Button>
            </FormControl>
          )}
        </CreateChildTagContainer>
      </TagManagementHandler>
    </TagManagementContainer>
  );
};

const switchStyle = {
  "& .MuiSwitch-switchBase": {
    "&.Mui-checked": {
      "& + .MuiSwitch-track": {
        backgroundColor: SignatureColor.BLUE,
      },
      "& .MuiSwitch-thumb": {
        backgroundColor: SignatureColor.BLUE,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: SignatureColor.ORANGE,
  },
  "& .MuiSwitch-track": {
    backgroundColor: SignatureColor.ORANGE,
  },
};

const selectMenuProps = {
  PaperProps: {
    style: {
      maxHeight: 200,
      width: 250,
    },
  },
};

const TagManagementContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "column",
}));

const TagManagementHandler = styled("div")(({ theme }) => ({
  display: "flex",
}));

const CreateChildTagContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "column",
}));

export default TagManagement;
