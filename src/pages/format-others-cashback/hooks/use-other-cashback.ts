import { useInputWithFormat } from "@/hooks/use-input-with-format";
import { useStateDebounce } from "@/hooks/use-state-debounce";
import { useToast } from "@/hooks/use-toast";
import { OutPutItemJSON } from "@/types/output";
import { RoutePath } from "@/utils/constants";
import { convertToFormat, convertToOtherCashbackFormat } from "@/utils/helpers";
import { useEffect, useMemo, useState } from "react";

export const useOtherCashback = () => {
  const { toast } = useToast();
  const {
    text: inputRuts,
    setText: setInputRuts,
    jsonOutput: jsonOutputRuts,
  } = useInputWithFormat(`${RoutePath.FORMAT_OTHERS_CASHBACK}-input-ruts`);
  const [date, setDate, dateDebounce] = useStateDebounce<Date | undefined>(
    `${RoutePath.FORMAT_OTHERS_CASHBACK}-date`,
    new Date()
  );
  const [monto, setMonto, montoDebounce] = useStateDebounce(
    `${RoutePath.FORMAT_OTHERS_CASHBACK}-input-monto`,
    "1"
  );
  const [tituloOferta, setTituloOferta, tituloOfertaDebounce] =
    useStateDebounce(
      `${RoutePath.FORMAT_OTHERS_CASHBACK}-input-titulo-oferta`,
      "Otros cashback"
    );
  const [idOferta, setIdOferta, idOfertaDebounce] = useStateDebounce(
    `${RoutePath.FORMAT_OTHERS_CASHBACK}-input-id-oferta`,
    "123e4567-e89b-12d3-a456-426614174000"
  );
  const [estadoOferta, setEstadoOferta, estadoOfertaDebounce] =
    useStateDebounce(
      `${RoutePath.FORMAT_OTHERS_CASHBACK}-input-estado-oferta`,
      "PENDING"
    );

  const [outputFormat, setOutputFormat] = useState("ssv");

  const [matchedData, setMatchedData] = useState<OutPutItemJSON[]>([]);

  const formattedOutput = useMemo(
    () => convertToFormat(matchedData, outputFormat),
    [matchedData, outputFormat]
  );

  useEffect(() => {
    try {
      const result = convertToOtherCashbackFormat(
        jsonOutputRuts,
        dateDebounce,
        montoDebounce,
        tituloOfertaDebounce,
        idOfertaDebounce,
        estadoOfertaDebounce
      );
      setMatchedData(result);
    } catch (error) {
      console.error("Failed to format!", error);
      setMatchedData([]);
      toast({
        title: "Failed to format!",
        description:
          error instanceof Error
            ? error.message
            : "There was an error formatting the content.",
      });
    }
  }, [
    jsonOutputRuts,
    dateDebounce,
    montoDebounce,
    tituloOfertaDebounce,
    idOfertaDebounce,
    estadoOfertaDebounce,
    toast,
  ]);

  return {
    inputRuts,
    setInputRuts,
    jsonOutputRuts,
    date,
    setDate,
    monto,
    setMonto,
    tituloOferta,
    setTituloOferta,
    idOferta,
    setIdOferta,
    estadoOferta,
    setEstadoOferta,
    outputFormat,
    setOutputFormat,
    formattedOutput,
  };
};
