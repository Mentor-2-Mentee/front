export interface FilterOptionElement {
  filterKey: string;
  describeText: string;
  parentElement?: {
    parentDescribeText: string;
    parentFilterKey: string;
  };
}
interface FilterTreeElement {
  describeText: string;
  childFilterOptionList?: Omit<FilterOptionElement, "parentElement">[];
}
type FilterTree = Map<string, FilterTreeElement>;

export const filterTreeMapConstructor = (
  filterElements: FilterOptionElement[]
): FilterTree => {
  const filterTree: FilterTree = new Map<string, FilterTreeElement>();

  filterElements.map((filterElement) => {
    if (
      filterElement.parentElement &&
      filterTree.get(filterElement.parentElement.parentFilterKey)
    ) {
      filterTree
        .get(filterElement.parentElement.parentFilterKey)
        ?.childFilterOptionList?.push({
          filterKey: filterElement.filterKey,
          describeText: filterElement.describeText,
        });
    }
    if (
      filterElement.parentElement &&
      !filterTree.get(filterElement.parentElement.parentFilterKey)
    ) {
      filterTree.set(filterElement.parentElement.parentFilterKey, {
        describeText: filterElement.parentElement.parentDescribeText,
        childFilterOptionList: [
          {
            filterKey: filterElement.filterKey,
            describeText: filterElement.describeText,
          },
        ],
      });
    }
    if (!filterElement.parentElement) {
      filterTree.set(filterElement.filterKey, {
        describeText: filterElement.describeText,
      });
    }
  });

  return filterTree;
};

export default filterTreeMapConstructor;
