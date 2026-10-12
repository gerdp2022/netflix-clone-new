import { createContext, useContext, useState, useCallback, useMemo } from "react";

const MyListContext = createContext(null);

export function MyListProvider({ children }) {
  const [ids, setIds] = useState(() => new Set());

  const toggle = useCallback((movie) => {
    setIds((prev) => {
      const next = new Set(prev);
      if (next.has(movie.id)) next.delete(movie.id);
      else next.add(movie.id);
      return next;
    });
  }, []);

  const isInList = useCallback((movie) => ids.has(movie.id), [ids]);

  const value = useMemo(() => ({ ids, toggle, isInList }), [ids, toggle, isInList]);

  return <MyListContext.Provider value={value}>{children}</MyListContext.Provider>;
}

export function useMyList() {
  const ctx = useContext(MyListContext);
  if (!ctx) throw new Error("useMyList must be used within a MyListProvider");
  return ctx;
}
