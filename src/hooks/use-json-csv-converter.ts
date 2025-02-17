import { useInputWithFormat } from "@/hooks/use-input-with-format";
import { useStateDebounce } from "@/hooks/use-state-debounce";
import { convertToFormat } from "@/utils/helpers";
import { useMemo } from "react";

export const useJsonCsvConverter = () => {
  const { text, setText, jsonOutput } = useInputWithFormat(
    "json-csv-converter-input-text"
  );
  const [outputFormat, setOutputFormat, outputFormatDebounce] =
    useStateDebounce("json-csv-converter-output-format", "json");

  const formattedOutput = useMemo(
    () => convertToFormat(jsonOutput, outputFormatDebounce),
    [jsonOutput, outputFormatDebounce]
  );

  const totalRows = jsonOutput?.length || 0;

  return {
    text,
    setText,
    outputFormat,
    setOutputFormat,
    formattedOutput,
    totalRows,
  };
};
