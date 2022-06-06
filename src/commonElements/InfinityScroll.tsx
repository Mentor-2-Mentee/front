import React, { MutableRefObject, useMemo } from "react";
import { ReactNode, useEffect, useRef, ReactElement } from "react";
import { useState } from "react";

import { renderToStaticMarkup } from "react-dom/server";

interface InfinityScrollProps<T> {
  listElements: T[];
  renderElement: (elementProps: T, index?: number) => ReactNode;
  fetchElementFunction: () => void;
  observerOption?: IntersectionObserverInit;
}

export const InfinityScroll = <T extends object>({
  listElements,
  renderElement,
  fetchElementFunction,
  observerOption,
}: InfinityScrollProps<T>): JSX.Element => {
  const [renderElementsCount, setRenderElementsCount] = useState<number>(0);
  const target = useRef<HTMLDivElement>(null);

  const observer = useMemo(() => {
    return new IntersectionObserver((entries, observer) => {
      if (target?.current === undefined) {
        return;
      }
      if (entries[0].isIntersecting) {
        fetchElementFunction();
        setRenderElementsCount((currentCount) => currentCount + 1);
        observer.disconnect();
      }
    }, observerOption);
  }, [target, observerOption]);

  useEffect(() => {
    if (target?.current === null) {
      return;
    }

    if (6 * (renderElementsCount + 1) <= listElements.length) {
      observer.observe(
        target.current.children[target.current.children.length - 1]
      );
    }

    return () => {
      if (target.current !== null && observer) {
        observer.unobserve(target.current);
      }
    };
  }, [target, listElements, observerOption]);

  return (
    <section ref={target}>
      {listElements.map((element, index) => {
        const result = renderElement(element, index);
        return result;
      })}
    </section>
  );
};

export default InfinityScroll;
