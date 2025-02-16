import { useDebounce, useSessionStorage } from "@uidotdev/usehooks";

export const useStateDebounce = (
  key: string,
  initialValue = "",
  duration = 500
) => {
  const [field, setField] = useSessionStorage(key, initialValue);
  const debounceField = useDebounce(field, duration);

  return [field, setField, debounceField] as const;
};
