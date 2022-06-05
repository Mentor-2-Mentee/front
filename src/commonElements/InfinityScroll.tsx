import React, { MutableRefObject, useMemo } from "react";
import { ReactNode, useEffect, useRef, ReactElement } from "react";
import { useState } from "react";

import { renderToStaticMarkup } from "react-dom/server";

interface InfinityScrollProps<T> {
  listElements: T[];
  renderElement: (data: T, index: number) => ReactNode;
  getMoreIElements: () => void;
  //   fetchFunction: () => Promise<T>
  observerOption?: IntersectionObserverInit;
}

//수행할 내용 => 리스트의 마지막 요소를 옵저빙, 스크롤 끝에 도달할시 추가 리스트 요소를 불러와서 배열에 추가하는 동작을수행케함
//옵저빙할 타겟
export const InfinityScroll = <T extends object>({
  listElements,
  renderElement,
  getMoreIElements,
  observerOption,
}: InfinityScrollProps<T>): JSX.Element => {
  const [target, setTarget] = useState<Element>();

  useEffect(() => {
    const lastElementTarget = document.getElementsByClassName("lastElement")[0];
    setTarget(lastElementTarget);
  }, []);

  useEffect(() => {
    const newObserver = new IntersectionObserver(() => {
      console.log("맨마지막 요소 view");
      getMoreIElements();
    });

    if (target !== undefined) {
      newObserver.observe(target);
    }
    return () => {
      target && newObserver.unobserve(target);
    };
  }, [target]);

  return (
    <section>
      {listElements.map((element, index) => {
        const result = renderElement(element, index);
        if (listElements.length - 1 === index) {
          //lastElement Binding

          return <div className="lastElement">{result}</div>;
        }
        return result;
      })}
    </section>
  );
};

export default InfinityScroll;

interface InfiniteScrollProps {
  root?: Element | null;
  // root 의 margin 값
  rootMargin?: string;
  // target element 가 root 와 몇 % 교차했을 때, callback 을 실행할지 결정하는 값
  target: MutableRefObject<Element | null>;
  threshold?: number;
  // 관찰을 할 Array
  targetArray: Array<any>;
  // 불러오는 리스트의 사이즈
  pageSize: number;
  // 리스트의 갯수중 불러올 시점 (pageSize가 20이고 endPoint가 5라면, 15번째 리스트 아이템을 관찰)
  endPoint?: number;
}

export const useInfiniteScroll = ({
  root = null,
  target,
  threshold = 1,
  rootMargin = "0px",
  targetArray,
  pageSize,
  endPoint = 1,
}: InfiniteScrollProps) => {
  const [count, setCount] = useState<number>(0);

  // IntersectionObserver 생성자 등록 및 callback 함수 등록
  const observer = useMemo(() => {
    return new IntersectionObserver(
      (entries, observer) => {
        if (target?.current === null) {
          return;
        }
        if (entries[0].isIntersecting) {
          setCount((v) => v + 1);
          // setCount가 무한으로 올라가는 것을 방지하기 위한 연결 끊음
          observer.disconnect();
        }
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );
  }, [target, root, rootMargin, threshold]);

  useEffect(() => {
    if (target?.current === null) {
      return;
    }

    // 데이터가 정상적으로 추가됐을 때, 다시 관찰을 시작
    if (pageSize * (count + 1) <= targetArray.length) {
      observer.observe(
        target.current.children[target.current.children.length - endPoint]
      );
    }

    return () => {
      if (target.current !== null && observer) {
        observer.unobserve(target.current);
      }
    };
  }, [count, targetArray, target, pageSize]);

  return {
    count,
    setCount,
  };
};
