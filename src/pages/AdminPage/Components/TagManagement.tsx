import { styled } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import {
  tagTreeMapConstructor,
  FilterTree,
} from "../../../commonElements/FilterOptionHandler/tagTreeMapConstructor";
import { SignatureColor } from "../../../commonStyles/CommonColor";
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
import { getCookieValue } from "../../../utils/handleCookieValue";
import React from "react";
import {
  useGetQuestionTagQuery,
  usePostQuestionTagMutation,
  useDeleteQuestionTagMutation,
} from "../../../hooks/queries/questionTag";
import { useSnackbar } from "notistack";

type TagManageMode = "CREATE" | "DELETE";
type TagCategory = "PARENT" | "CHILD";

export const TagManagement = (): JSX.Element => {
  const [tagTree, setTagTree] = useState<FilterTree>();
  const [parentTagList, setParentTagList] = useState<string[]>([]);
  const [selectedParentTag, setSelectedParentTag] = useState<string>();
  const [selectedChildTag, setSelectedChildTag] = useState<string>();
  const [childFilterTagList, setChildFilterTagList] = useState<string[]>([]);
  const [mode, setMode] = useState<TagManageMode>("CREATE");

  const [inputNewParentTag, setInputNewParentTag] = useState<string>();
  const [inputNewChildTag, setInputNewChildTag] = useState<string>();

  const { enqueueSnackbar } = useSnackbar();

  const questionTagQuery = useGetQuestionTagQuery();
  const postQuestionTagMutation = usePostQuestionTagMutation(enqueueSnackbar);
  const deleteQuestionTagMutation =
    useDeleteQuestionTagMutation(enqueueSnackbar);

  useEffect(() => {
    if (questionTagQuery.status !== "success") return;
    const tagTree = tagTreeMapConstructor(
      questionTagQuery.data.questionTagList
    );
    setTagTree(tagTree);
    setParentTagList(Array.from(tagTree.keys()));
  }, [questionTagQuery.status, questionTagQuery.data]);

  const handleQuestionTag = useCallback(
    (tagCategory: TagCategory) => () => {
      const token = getCookieValue("accessToken");
      if (!token) {
        enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
        return;
      }

      if (mode === "CREATE" && tagCategory === "PARENT") {
        if (!inputNewParentTag) {
          enqueueSnackbar("값을 입력하세요.", { variant: "warning" });
          return;
        }
        postQuestionTagMutation.mutate({
          token,
          tagName: inputNewParentTag,
        });
        return;
      }
      if (mode === "CREATE" && tagCategory === "CHILD") {
        if (!selectedParentTag || !inputNewChildTag) {
          enqueueSnackbar(
            "값을 입력하지 않았거나, 질문 유형을 선택하지 않았습니다.",
            { variant: "warning" }
          );
          return;
        }
        postQuestionTagMutation.mutate({
          token,
          parentTag: selectedParentTag,
          tagName: inputNewChildTag,
        });
        return;
      }
      if (mode === "DELETE" && tagCategory === "PARENT") {
        if (!selectedParentTag) {
          enqueueSnackbar("삭제할 유형태그를 선택하지 않았습니다.", {
            variant: "warning",
          });
          return;
        }
        deleteQuestionTagMutation.mutate({
          token,
          tagName: selectedParentTag,
        });
      }
      if (mode === "DELETE" && tagCategory === "CHILD") {
        if (!selectedParentTag || !selectedChildTag) {
          enqueueSnackbar(
            "삭제할 유형태그 또는 세부유형태그를 선택하지 않았습니다.",
            { variant: "warning" }
          );
          return;
        }
        deleteQuestionTagMutation.mutate({
          token,
          parentTag: selectedParentTag,
          tagName: selectedChildTag,
        });
      }
    },
    [
      mode,
      inputNewParentTag,
      inputNewChildTag,
      selectedParentTag,
      selectedChildTag,
    ]
  );

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
            onClick={handleQuestionTag("PARENT")}
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
                onClick={handleQuestionTag("CHILD")}
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
                onClick={handleQuestionTag("CHILD")}
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

const TagManagementContainer = styled("div")(({}) => ({
  display: "flex",
  flexFlow: "column",
}));

const TagManagementHandler = styled("div")(({}) => ({
  display: "flex",
}));

const CreateChildTagContainer = styled("div")(({}) => ({
  display: "flex",
  flexFlow: "column",
}));

export default TagManagement;
