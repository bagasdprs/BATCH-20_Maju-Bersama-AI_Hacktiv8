import { useEffect, useRef } from "react";

export const useAutoScroll = (dependency: any) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timeout);
  }, [dependency]);

  return bottomRef;
};
