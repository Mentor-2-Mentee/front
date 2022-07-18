import { useMemo, useState } from "react";
import { ReactNode, useEffect } from "react";
import { FetchNextPageOptions, InfiniteQueryObserverResult } from "react-query";

interface InfinityScrollProps<T> {
  listElements: T[];
  renderElement: (elementProps: T, index?: number) => ReactNode;
  fetchElementFunction: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<unknown, unknown>>;
  targetContainer: React.RefObject<HTMLDivElement>;
  observerOption?: IntersectionObserverInit;
  hasNextPage?: boolean;
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
  hasNextPage,
  reversed = false,
}: InfinityScrollProps<T>): JSX.Element => {
  const observerInit = () => {
    return new IntersectionObserver(async (entries, observer) => {
      if (targetContainer?.current === null) {
        return;
      }

      if (entries[0].isIntersecting) {
        if (hasNextPage) {
          fetchElementFunction();
        }

        observer.disconnect();
      }
    }, observerOption);
  };

  const observingTarget = () => {
    if (targetContainer?.current === null) return;
    if (!hasNextPage) return;

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
