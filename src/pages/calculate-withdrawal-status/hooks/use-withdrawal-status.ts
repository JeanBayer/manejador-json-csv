import { useInputWithFormat } from "@/hooks/use-input-with-format";
import { useStateDebounce } from "@/hooks/use-state-debounce";
import { RoutePath } from "@/utils/constants";
import { convertToFormat } from "@/utils/helpers";
import { handleWithdrawal } from "@calculate-withdrawal-status/utils/helper";
import { useMemo } from "react";

export const useWithdrawalStatus = () => {
  const { text, setText, jsonOutput } = useInputWithFormat(
    `${RoutePath.CALCULATE_WITHDRAWAL_STATUS}-input-text1`
  );

  const [outputFormat, setOutputFormat, outputFormatDebounce] =
    useStateDebounce(
      `${RoutePath.CALCULATE_WITHDRAWAL_STATUS}-output-format`,
      "csv"
    );

  const markedData = useMemo(() => {
    try {
      const result = handleWithdrawal(jsonOutput);
      return result;
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [jsonOutput]);

  const formattedOutput = useMemo(
    () => convertToFormat(markedData, outputFormatDebounce),
    [markedData, outputFormatDebounce]
  );

  const totalRows = markedData.length;

  return {
    text,
    setText,
    outputFormat,
    setOutputFormat,
    formattedOutput,
    totalRows,
  };
};
