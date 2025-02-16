import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

export const useStateDebounce = (initialValue = "", duration = 500) => {
  const [field, setField] = useState(initialValue);
  const debounceField = useDebounce(field, duration);

  return [debounceField, setField] as const;
};
