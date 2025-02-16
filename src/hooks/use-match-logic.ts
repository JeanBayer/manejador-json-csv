import { useInputWithFormat } from "@/hooks/use-input-with-format";
import { useStateDebounce } from "@/hooks/use-state-debounce";
import { convertToCSV, matchData } from "@/utils/helpers";
import { useEffect, useMemo, useState } from "react";

export function useMatchLogic() {
  const {
    text: inputText1,
    setText: setInputText1,
    jsonOutput: jsonOutput1,
  } = useInputWithFormat();
  const {
    text: inputText2,
    setText: setInputText2,
    jsonOutput: jsonOutput2,
  } = useInputWithFormat();
  const [matchField1, setMatchField1] = useStateDebounce("identificador");
  const [matchField2, setMatchField2] = useStateDebounce("id");
  const [outputFormat, setOutputFormat] = useState("json");

  const [matchedData, setMatchedData] = useState<{ match: boolean }[]>([]);

  useEffect(() => {
    if (jsonOutput1?.length && jsonOutput2?.length)
      return setMatchedData(
        matchData(jsonOutput1, matchField1, jsonOutput2, matchField2)
      );

    setMatchedData([]);
  }, [matchField1, matchField2, jsonOutput1, jsonOutput2]);

  const formattedOutput = useMemo(() => {
    if (outputFormat === "csv") {
      return convertToCSV(matchedData);
    }
    return JSON.stringify(matchedData, null, 2);
  }, [matchedData, outputFormat]);

  const totalRows = matchedData.length;
  const matchedRows = matchedData.filter((item) => item.match).length;

  return {
    inputText1,
    setInputText1,
    inputText2,
    setInputText2,
    matchField1,
    setMatchField1,
    matchField2,
    setMatchField2,
    outputFormat,
    setOutputFormat,
    formattedOutput,
    totalRows,
    matchedRows,
  };
}
