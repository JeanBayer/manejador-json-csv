import { useState, useMemo } from "react";
import { useInputWithFormat } from "@/hooks/useInputWithFormat";
import { matchData, convertToCSV } from "@/utils/helpers";

export function useMatchLogic() {
  const { text: inputText1, setText: setInputText1, jsonOutput: jsonOutput1 } = useInputWithFormat();
  const { text: inputText2, setText: setInputText2, jsonOutput: jsonOutput2 } = useInputWithFormat();
  const [matchField1, setMatchField1] = useState("identificador");
  const [matchField2, setMatchField2] = useState("id");
  const [outputFormat, setOutputFormat] = useState<"json" | "csv">("json");

  const matchedData = useMemo(() => {
    if (!jsonOutput1 || !jsonOutput2) return [];

    return matchData(jsonOutput1, matchField1, jsonOutput2, matchField2);
  }, [jsonOutput1, matchField1, jsonOutput2, matchField2]);

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