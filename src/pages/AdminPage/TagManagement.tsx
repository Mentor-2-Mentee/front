import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import {
  tagTreeMapConstructor,
  FilterTree,
} from "../../commonElements/FilterOptionHandler/tagTreeMapConstructor";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { getQuestionTagList } from "../../api/getQuestionTagList";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

export const TagManagement = (): JSX.Element => {
  const [tagTree, setTagTree] = useState<FilterTree>();
  const [parentTagList, setParentTagList] = useState<string[]>([]);
  const [selectedParentTag, setSelectedParentTag] = useState<string>();
  const [selectedChildTag, setSelectedChildTag] = useState<string>();
  const [childFilterTagList, setChildFilterTagList] = useState<string[]>([]);

  const setCurrentQuestionTagList = async () => {
    const { data } = await getQuestionTagList();
    if (!data) return;
    const tagTree = tagTreeMapConstructor(data);
    setTagTree(tagTree);
  };

  const handleParentTagChange = (event: SelectChangeEvent) => {
    setSelectedParentTag(event.target.value as string);
  };

  const handleChildTagChange = (event: SelectChangeEvent) => {
    setSelectedChildTag(event.target.value as string);
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
    <>
      <Typography variant="h6">질문태그관리</Typography>
      <FormControl sx={{ width: 150 }}>
        <InputLabel id="demo-simple-select-label">질문유형들</InputLabel>
        <Select
          value={selectedParentTag}
          label="질문유형들"
          onChange={handleParentTagChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
                width: 250,
              },
            },
          }}
        >
          {parentTagList.map((parentTag) => {
            return <MenuItem value={parentTag}>{parentTag}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ width: 150 }}>
        <InputLabel id="demo-simple-select-label">질문세부유형들</InputLabel>
        <Select
          value={selectedParentTag}
          label="질문유형들"
          onChange={handleChildTagChange}
        >
          {childFilterTagList.map((childFilterTag) => {
            return <MenuItem value={childFilterTag}>{childFilterTag}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </>
  );
};

export default TagManagement;
