import { useInputWithFormat } from "@/hooks/use-input-with-format";
import { useStateDebounce } from "@/hooks/use-state-debounce";
import { RoutePath } from "@/utils/constants";
import { convertToFormat, markDuplicates } from "@/utils/helpers";
import { useMemo } from "react";

export const useDuplicateMarker = () => {
  const { text, setText, jsonOutput } = useInputWithFormat(
    `${RoutePath.DUPLICATE_MARKER}-input-text`
  );
  const [matchField, setMatchField, matchFieldDebounce] = useStateDebounce(
    `${RoutePath.DUPLICATE_MARKER}-match-field`,
    "identificador"
  );
  const [outputFormat, setOutputFormat, outputFormatDebounce] =
    useStateDebounce(`${RoutePath.DUPLICATE_MARKER}-output-format`, "json");

  const markedData = useMemo(
    () => markDuplicates(jsonOutput, matchFieldDebounce),
    [jsonOutput, matchFieldDebounce]
  );

  const formattedOutput = useMemo(
    () => convertToFormat(markedData, outputFormatDebounce),
    [markedData, outputFormatDebounce]
  );

  const totalRows = markedData.length;
  const matchedRows = markedData.filter((item) => item.duplicate).length;

  return {
    text,
    setText,
    matchField,
    setMatchField,
    outputFormat,
    setOutputFormat,
    formattedOutput,
    totalRows,
    matchedRows,
  };
};
