import { QuestionTag } from "../../models/QuestionTag";

interface TagTreeElement {
  filterKey: string;
  childFilterOptionList: string[];
}

export type FilterTree = Map<string, TagTreeElement>;

export const tagTreeMapConstructor = (
  filterElements: QuestionTag[]
): FilterTree => {
  const filterTree: FilterTree = new Map<string, TagTreeElement>();

  filterElements.map((filterElement) => {
    if (
      filterElement.parentTag &&
      filterTree.get(filterElement.parentTag)?.childFilterOptionList
    ) {
      filterTree
        .get(filterElement.parentTag)
        ?.childFilterOptionList.push(filterElement.tagName);
    }

    if (filterElement.parentTag && !filterTree.get(filterElement.parentTag)) {
      filterTree.set(filterElement.parentTag, {
        filterKey: filterElement.parentTag,
        childFilterOptionList: [filterElement.tagName],
      });
    }

    if (!filterElement.parentTag) {
      if (filterTree.get(filterElement.tagName)) return;
      else if (!filterTree.get(filterElement.tagName)) {
        filterTree.set(filterElement.tagName, {
          filterKey: filterElement.tagName,
          childFilterOptionList: [],
        });
      }
    }
  });

  return filterTree;
};
