import { useMemo } from "react";
import { ReactNode, useEffect } from "react";
import { useState } from "react";

interface InfinityScrollProps<T> {
  listElements: T[];
  renderElement: (elementProps: T, index?: number) => ReactNode;
  fetchElementFunction: () => Promise<void>;
  maxPage: number;
  targetContainer: React.RefObject<HTMLDivElement>;
  observerOption?: IntersectionObserverInit;
  limit?: number;
  reversed?: boolean;
}

const INITIAL_OBSERVER_OPTION: IntersectionObserverInit = {
  root: null,
  threshold: 1.0,
};

export const InfinityScroll = <T extends object>({
  listElements,
  renderElement,
  fetchElementFunction,
  observerOption = INITIAL_OBSERVER_OPTION,
  targetContainer,
  limit = 6,
  reversed = false,
}: InfinityScrollProps<T>): JSX.Element => {
  const [renderElementsCount, setRenderElementsCount] = useState<number>(0);

  const observerInit = () => {
    return new IntersectionObserver((entries, observer) => {
      if (targetContainer?.current === null) {
        return;
      }

      if (entries[0].isIntersecting) {
        fetchElementFunction();
        setRenderElementsCount((currentCount) => {
          return currentCount + 1;
        });

        observer.disconnect();
      }
    }, observerOption);
  };

  const observingTarget = () => {
    if (targetContainer?.current === null) {
      return;
    }

    if (limit * (renderElementsCount + 1) <= listElements.length) {
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
