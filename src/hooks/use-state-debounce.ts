import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

export const useStateDebounce = (
  _key: string,
  initialValue = "",
  duration = 500
) => {
  // const [field, setField] = useSessionStorage(key, initialValue);
  const [field, setField] = useState(initialValue);
  const debounceField = useDebounce(field, duration);

  return [field, setField, debounceField] as const;
};
