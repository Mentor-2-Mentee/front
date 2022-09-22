import { useMemo } from "react";
import { ReactNode, useEffect } from "react";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";

interface InfinityScrollProps<T> {
  targetContainer: React.RefObject<HTMLDivElement>;
  listElements: T[];
  fetchCallback: () => Promise<InfiniteQueryObserverResult>;
  renderElement: (elementProps: T, index?: number) => ReactNode;
  observerOption?: IntersectionObserverInit;
}

const INITIAL_OBSERVER_OPTION: IntersectionObserverInit = {
  root: null,
  threshold: 0.5,
};

export const InfinityScroll = <T extends object>({
  targetContainer,
  listElements,
  fetchCallback,
  renderElement,
  observerOption = INITIAL_OBSERVER_OPTION,
}: InfinityScrollProps<T>): JSX.Element => {
  const observerInit = () => {
    return new IntersectionObserver(async (entries, observer) => {
      if (targetContainer?.current === null) {
        return;
      }

      if (entries[0].isIntersecting) {
        fetchCallback();
        observer.disconnect();
      }
    }, observerOption);
  };

  const observingTarget = () => {
    if (!targetContainer.current) return;

    if (listElements.length !== 0) {
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
