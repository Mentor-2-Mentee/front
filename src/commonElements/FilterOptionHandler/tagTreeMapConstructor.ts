import { FilterTag } from ".";

interface TagTreeElement {
  filterKey: string;
  childFilterOptionList?: string[];
}
type FilterTree = Map<string, TagTreeElement>;

export const tagTreeMapConstructor = (
  filterElements: FilterTag[]
): FilterTree => {
  const filterTree: FilterTree = new Map<string, TagTreeElement>();

  filterElements.map((filterElement) => {
    if (
      filterElement.parentFilterTag &&
      filterTree.get(filterElement.parentFilterTag)
    ) {
      filterTree
        .get(filterElement.parentFilterTag)
        ?.childFilterOptionList?.push(filterElement.tagName);
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
      filterTree.set(filterElement.tagName, {
        filterKey: filterElement.tagName,
      });
    }
  });

  return filterTree;
};
