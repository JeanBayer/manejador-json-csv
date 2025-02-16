import { parseStringToJson } from "@/utils/helpers";
import { useMemo } from "react";
import { useStateDebounce } from "./use-state-debounce";

export function useInputWithFormat() {
  const [text, setText] = useStateDebounce("");
  const jsonOutput = useMemo(() => parseStringToJson(text), [text]);

  return {
    text,
    setText,
    jsonOutput,
  };
}
