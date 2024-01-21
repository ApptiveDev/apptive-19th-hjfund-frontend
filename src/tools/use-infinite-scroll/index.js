import { useCallback, useEffect, useRef, useState } from "react";

export default function useInfiniteScroll({
  ref,
  fetch,
  initialIndex = 0,
  boundary = 100,
  cooldown = 300,
}) {
  const [isFetchable, setIsFetchable] = useState(true);

  const [index, setIndex] = useState(initialIndex);
  const [data, setData] = useState(null);

  const cooldownTimer = useRef(null);

  const fetchData = useCallback((index) => {
    if (!isFetchable || cooldownTimer.current) return;

    setIsFetchable(false);
    fetch(index, setData).then((isLast = false) => {
      if (!isLast) {
        cooldownTimer.current = setTimeout(() => {
          cooldownTimer.current = null;
          setIsFetchable(true);
        }, cooldown);
      }
    });
  }, [fetch, isFetchable, cooldown]);

  useEffect(() => {
    fetchData(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    function scrollHandler() {
      if (!ref.current) return;

      const { current } = ref;
      const { scrollHeight, scrollTop, clientHeight } = current;

      if (scrollHeight - scrollTop - clientHeight < boundary) {
        fetchData(index + 1);
        setIndex((index) => index + 1);
      }
    }

    ref.current.addEventListener("scroll", scrollHandler);
    return () => ref.current.removeEventListener("scroll", scrollHandler);
  }, [fetchData, index]);

  const clear = useCallback(() => {
    setIndex(initialIndex);
    setData(null);
    fetchData(initialIndex);
  }, [initialIndex, fetchData]);

  return [data, isFetchable, clear];
}
