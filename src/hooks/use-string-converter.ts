import { useInputWithFormat } from "@/hooks/use-input-with-format";
import { useStateDebounce } from "@/hooks/use-state-debounce";
import { RoutePath } from "@/utils/constants";
import { convertToCustomCSV } from "@/utils/helpers";
import { useMemo } from "react";

export const useStringConverter = () => {
  const { text, setText, jsonOutput } = useInputWithFormat(
    `${RoutePath.STRING_CONVERTER}-input-text1`
  );
  const [matchField, setMatchField, matchFieldDebounce] = useStateDebounce(
    `${RoutePath.STRING_CONVERTER}-match-field-text1`,
    "identificador"
  );

  const formattedOutput = useMemo(
    () => convertToCustomCSV(jsonOutput, matchFieldDebounce),
    [jsonOutput, matchFieldDebounce]
  );

  const totalRows =
    formattedOutput.length > 0 ? formattedOutput.split("\n").length : 0;

  return {
    text,
    setText,
    matchField,
    setMatchField,
    formattedOutput,
    totalRows,
  };
};
