import { useStateDebounce } from "@/hooks/use-state-debounce";
import { RoutePath } from "@/utils/constants";
import { splitTextByLines } from "@/utils/textos";
import { useMemo } from "react";

export const useSplitData = () => {
  const [text, setText, textDebounce] = useStateDebounce(
    `${RoutePath.SPLIT_DATA}-input`,
    ""
  );

  const [lines, setLines, linesDebounce] = useStateDebounce(
    `${RoutePath.SPLIT_DATA}-lines`,
    "1"
  );

  const handleLines = (newNumber: string) => {
    if (newNumber === "") return setLines("");
    if (Number(newNumber) < 1) return setLines("1");
    setLines(newNumber);
  };

  const { result: splittedData, numberLines } = useMemo(
    () => splitTextByLines(textDebounce, linesDebounce),
    [textDebounce, linesDebounce]
  );

  return {
    text,
    setText,
    lines,
    setLines: handleLines,
    splittedData,
    numberLines,
  };
};
