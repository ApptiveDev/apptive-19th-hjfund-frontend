import { RefObject, SetStateAction } from "react";

declare async function FetchData<T>(
  index: number,
  setData: (newData: SetStateAction<T>) => void
): Promise<boolean>;

declare function useInfiniteScroll<T>(props: {
  ref: RefObject<HTMLElement>;
  fetch: typeof FetchData<T>;
  initialIndex?: number;
  boundary?: number;
  cooldown?: number;
}): [T, boolean, (newData?: T = null) => void];

export default useInfiniteScroll;