import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

export const useStateDebounce = <T>(
  _key: string,
  initialValue: T = "" as unknown as T,
  duration = 500
) => {
  // const [field, setField] = useSessionStorage(key, initialValue);
  const [field, setField] = useState<T>(initialValue);
  const debounceField = useDebounce(field, duration);

  return [field, setField, debounceField] as const;
};
