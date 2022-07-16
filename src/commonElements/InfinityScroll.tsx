import { useMemo } from "react";
import { ReactNode, useEffect } from "react";
import { useState } from "react";

interface InfinityScrollProps<T> {
  listElements: T[];
  renderElement: (elementProps: T, index?: number) => ReactNode;
  fetchElementFunction: () => Promise<void>;
  targetContainer: React.RefObject<HTMLDivElement>;
  observerOption?: IntersectionObserverInit;
  limit: number;
  useNowPageState: [number, React.Dispatch<React.SetStateAction<number>>];
  reversed?: boolean;
}

const INITIAL_OBSERVER_OPTION: IntersectionObserverInit = {
  root: null,
  threshold: 0,
};

export const InfinityScroll = <T extends object>({
  listElements,
  renderElement,
  fetchElementFunction,
  observerOption = INITIAL_OBSERVER_OPTION,
  targetContainer,
  limit,
  useNowPageState,
  reversed = false,
}: InfinityScrollProps<T>): JSX.Element => {
  // const [renderElementsCount, setRenderElementsCount] = useState<number>(0);
  const [nowPage, setNowPage] = useNowPageState;

  const observerInit = () => {
    const result = new IntersectionObserver(async (entries, observer) => {
      if (targetContainer?.current === null) {
        return;
      }

      if (entries[0].isIntersecting) {
        console.log("fetch element by ", entries[0]);
        setNowPage((currentPage) => {
          return currentPage + 1;
        });
        await fetchElementFunction();

        observer.disconnect();
      }
    }, observerOption);
    console.log(result);
    return result;
  };

  const observingTarget = () => {
    if (targetContainer?.current === null) return;
    // if (targetContainer.current.children.length < 1) return;
    console.log(
      "observingTarget: ",
      targetContainer.current?.children[
        targetContainer.current.children.length - 1
      ]
    );
    console.log("nowPage:", nowPage);

    if (limit * (nowPage + 1) <= listElements.length) {
      if (reversed) {
        observer.observe(targetContainer.current.children[0]);
      }

      if (!reversed) {
        observer.observe(
          targetContainer.current.children[
            targetContainer.current.children.length - 1
          ]
        );
      }
    }

    return cleanUpCurrentObserve;
  };

  const cleanUpCurrentObserve = () => {
    if (targetContainer.current !== null && observer) {
      observer.unobserve(targetContainer.current);
    }
  };

  const observer = useMemo(observerInit, [targetContainer, observerOption]);
  useEffect(observingTarget, [targetContainer, listElements, observerOption]);

  return (
    <>
      {listElements.map((element, index) => {
        const result = renderElement(element, index);
        return result;
      })}
    </>
  );
};

export default InfinityScroll;
