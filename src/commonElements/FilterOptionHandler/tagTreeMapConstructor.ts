import { FilterTag } from ".";

interface TagTreeElement {
  filterKey: string;
  childFilterOptionList: string[];
}

export type FilterTree = Map<string, TagTreeElement>;

export const tagTreeMapConstructor = (
  filterElements: FilterTag[]
): FilterTree => {
  const filterTree: FilterTree = new Map<string, TagTreeElement>();

  filterElements.map((filterElement) => {
    if (
      filterElement.parentFilterTag &&
      filterTree.get(filterElement.parentFilterTag)?.childFilterOptionList
    ) {
      filterTree
        .get(filterElement.parentFilterTag)
        ?.childFilterOptionList.push(filterElement.tagName);
    }

    if (
      filterElement.parentFilterTag &&
      !filterTree.get(filterElement.parentFilterTag)
    ) {
      filterTree.set(filterElement.parentFilterTag, {
        filterKey: filterElement.parentFilterTag,
        childFilterOptionList: [filterElement.tagName],
      });
    }

    if (!filterElement.parentFilterTag) {
      if (filterTree.get(filterElement.tagName)) return;

      if (!filterTree.get(filterElement.tagName)) {
        filterTree.set(filterElement.tagName, {
          filterKey: filterElement.tagName,
          childFilterOptionList: [],
        });
      }
    }
  });

  return filterTree;
};
