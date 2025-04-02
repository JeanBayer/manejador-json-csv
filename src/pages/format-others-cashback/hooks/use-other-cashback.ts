import { useInputWithFormat } from "@/hooks/use-input-with-format";
import { useStateDebounce } from "@/hooks/use-state-debounce";
import { useToast } from "@/hooks/use-toast";
import { OutPutItemJSON } from "@/types/output";
import { FormatDateOtrosCashbackFilename, RoutePath } from "@/utils/constants";
import {
  calculateUniqueData,
  convertToFormat,
  convertToOtherCashbackFormat,
} from "@/utils/helpers";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";

export const useOtherCashback = () => {
  const { toast } = useToast();
  const {
    text: inputRuts,
    setText: setInputRuts,
    jsonOutput: jsonOutputRuts,
  } = useInputWithFormat(
    `${RoutePath.FORMAT_OTHERS_CASHBACK}-input-ruts`,
    `rut\n25582817-7\n25582817-7\n19149040-1`
  );
  const [date, setDate, dateDebounce] = useStateDebounce<Date | undefined>(
    `${RoutePath.FORMAT_OTHERS_CASHBACK}-date`,
    new Date()
  );
  const [monto, setMonto, montoDebounce] = useStateDebounce(
    `${RoutePath.FORMAT_OTHERS_CASHBACK}-input-monto`,
    "1"
  );
  const [montoTransaccion, setMontoTransaccion, montoTransaccionDebounce] =
    useStateDebounce(
      `${RoutePath.FORMAT_OTHERS_CASHBACK}-input-monto-transaccion`,
      "1"
    );
  const [tituloOferta, setTituloOferta, tituloOfertaDebounce] =
    useStateDebounce(
      `${RoutePath.FORMAT_OTHERS_CASHBACK}-input-titulo-oferta`,
      "Otros cashback"
    );
  const [idOferta, setIdOferta, idOfertaDebounce] = useStateDebounce(
    `${RoutePath.FORMAT_OTHERS_CASHBACK}-input-id-oferta`,
    "64ecf194e0f16cfa366e469d"
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
        estadoOfertaDebounce,
        montoTransaccionDebounce
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
    montoTransaccionDebounce,
    toast,
  ]);

  const infoData = useMemo(() => {
    const montoTotal = matchedData?.length * Number(monto);
    const rutsUnicos = calculateUniqueData(matchedData, "rutCliente");
    const rutsTotales = matchedData?.length;
    return { montoTotal, rutsUnicos, rutsTotales };
  }, [matchedData, monto]);

  // format : otroscashback_yyyymmdd.csv
  const filename = useMemo(() => {
    const dateFormat = format(new Date(), FormatDateOtrosCashbackFilename, {
      locale: es,
    });
    return `otroscashback_${dateFormat}.csv`;
  }, []);

  return {
    inputRuts,
    setInputRuts,
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
    montoTransaccion,
    setMontoTransaccion,
    filename,
    ...infoData,
  };
};
