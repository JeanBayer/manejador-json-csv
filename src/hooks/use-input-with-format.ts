import { parseStringToJson } from "@/utils/helpers";
import { useMemo } from "react";
import { useStateDebounce } from "./use-state-debounce";

export function useInputWithFormat(
  key: string,
  initialValue: string | undefined = ""
) {
  const [text, setText, textDebounce] = useStateDebounce(
    key,
    initialValue || ""
  );
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
