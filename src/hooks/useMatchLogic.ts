import { useInputWithFormat } from "@/hooks/useInputWithFormat";
import { convertToCSV, matchData } from "@/utils/helpers";
import { useDebounce } from "@uidotdev/usehooks";
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
  const [matchField1, setMatchField1] = useState("identificador");
  const [matchField2, setMatchField2] = useState("id");
  const [outputFormat, setOutputFormat] = useState<"json" | "csv">("json");

  const [matchedData, setMatchedData] = useState([]);

  const debounceMatchField1 = useDebounce(matchField1, 300);
  const debounceMatchField2 = useDebounce(matchField2, 300);

  useEffect(() => {
    if (jsonOutput1?.length && jsonOutput2?.length) {
      setMatchedData(
        matchData(jsonOutput1, matchField1, jsonOutput2, matchField2)
      );
    }
  }, [debounceMatchField1, debounceMatchField2, jsonOutput1, jsonOutput2]);

  const formattedOutput = useMemo(() => {
    if (outputFormat === "csv") {
      return convertToCSV(matchedData);
    }
    return JSON.stringify(matchedData, null, 2);
  }, [matchedData, outputFormat]);

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
  };
}
