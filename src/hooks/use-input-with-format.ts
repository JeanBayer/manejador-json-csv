import { parseStringToJson } from "@/utils/helpers";
import { useMemo } from "react";
import { useStateDebounce } from "./use-state-debounce";

export function useInputWithFormat(key: string) {
  const [text, setText, textDebounce] = useStateDebounce(key, "");
  const jsonOutput = useMemo(
    () => parseStringToJson(textDebounce),
    [textDebounce]
  );

  return {
    text,
    setText,
    jsonOutput,
  };
}
