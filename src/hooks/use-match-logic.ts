import { useInputWithFormat } from "@/hooks/use-input-with-format";
import { useStateDebounce } from "@/hooks/use-state-debounce";
import { RoutePath } from "@/utils/constants";
import { convertToFormat, matchData } from "@/utils/helpers";
import { useEffect, useMemo, useState } from "react";

export function useMatchLogic() {
  const {
    text: inputText1,
    setText: setInputText1,
    jsonOutput: jsonOutput1,
  } = useInputWithFormat(`${RoutePath.MATCH_LOGIC}-input-text1`);
  const {
    text: inputText2,
    setText: setInputText2,
    jsonOutput: jsonOutput2,
  } = useInputWithFormat(`${RoutePath.MATCH_LOGIC}-input-text2`);
  const [matchField1, setMatchField1, matchFieldDebounce1] = useStateDebounce(
    `${RoutePath.MATCH_LOGIC}-match-field-text1`,
    "identificador"
  );
  const [matchField2, setMatchField2, matchFieldDebounce2] = useStateDebounce(
    `${RoutePath.MATCH_LOGIC}-match-field-text2`,
    "id"
  );
  const [outputFormat, setOutputFormat] = useState("json");

  const [matchedData, setMatchedData] = useState<{ match: boolean }[]>([]);

  useEffect(() => {
    if (jsonOutput1?.length && jsonOutput2?.length)
      return setMatchedData(
        matchData(
          jsonOutput1,
          matchFieldDebounce1,
          jsonOutput2,
          matchFieldDebounce2
        )
      );

    setMatchedData([]);
  }, [matchFieldDebounce1, matchFieldDebounce2, jsonOutput1, jsonOutput2]);

  const formattedOutput = useMemo(
    () => convertToFormat(matchedData, outputFormat),
    [matchedData, outputFormat]
  );

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
