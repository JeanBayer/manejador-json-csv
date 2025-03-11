import { useInputWithFormat } from "@/hooks/use-input-with-format";
import { useStateDebounce } from "@/hooks/use-state-debounce";
import { RoutePath } from "@/utils/constants";
import { convertToFormat } from "@/utils/helpers";
import { EXAMPLE_WITHDRAWAL } from "@calculate-withdrawal-status/utils/constant";
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

  const matchedData = useMemo(() => {
    try {
      const result = handleWithdrawal(jsonOutput);
      return result;
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [jsonOutput]);

  const formattedOutput = useMemo(
    () => convertToFormat(matchedData, outputFormatDebounce),
    [matchedData, outputFormatDebounce]
  );

  const infoData = useMemo(() => {
    const totalRows = matchedData?.length;
    const matchedRows = matchedData?.filter(
      (item) =>
        item.coincidenEstados === false ||
        item.coincidenCantidadTransacciones === false
    ).length;
    return { totalRows, matchedRows };
  }, [matchedData]);

  const handlePreloadExample = () => {
    setText(JSON.stringify(EXAMPLE_WITHDRAWAL, null, 2));
  };

  return {
    text,
    setText,
    outputFormat,
    setOutputFormat,
    formattedOutput,
    handlePreloadExample,
    ...infoData,
  };
};
