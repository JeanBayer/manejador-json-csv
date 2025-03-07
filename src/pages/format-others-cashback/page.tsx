import { Input } from "@/components/ui/input";
import { TextAreaInput } from "@/components/wrapper/textarea-input";
import { TitlePage } from "@/components/wrapper/title-page";

import { Separator } from "@/components/ui/separator";
import { DateTimePicker } from "@/components/wrapper/date-time-picker";
import { OutputBlock } from "@/components/wrapper/output-block";
import { SelectInput } from "@/components/wrapper/select-input";
import { formatCurrencyLocale } from "@/utils/helpers";
import { useOtherCashback } from "@format-others-cashback/hooks/use-other-cashback";

export const FormatOthersCashbackPage = () => {
  const {
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
    rutsUnicos,
    rutsTotales,
    montoTotal,
  } = useOtherCashback();

  return (
    <section>
      <TitlePage
        title="Format Others Cashback"
        info="Input your data in the text area below to format others cashback."
      />
      <div className="w-screen flex flex-col gap-8 px-16 md:px-32 lg:px-48 py-4 pb-16">
        <div className="flex w-full gap-16">
          <div className="flex flex-col flex-1 gap-4">
            <label className="block text-sm font-medium text-gray-700">
              Rut
            </label>
            <TextAreaInput text={inputRuts} setText={setInputRuts} />
          </div>
          <div className="flex flex-col gap-4 pt-8">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fecha Transacción
              </label>
              <DateTimePicker date={date} setDate={setDate} />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="monto"
              >
                Monto Cashback
              </label>
              <Input
                className="w-84"
                id="monto"
                type="number"
                value={monto}
                min={1}
                onChange={(e) => {
                  setMonto(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="titulo"
              >
                Titulo Oferta
              </label>
              <Input
                className="w-84"
                id="titulo"
                type="text"
                value={tituloOferta}
                onChange={(e) => {
                  setTituloOferta(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="idOferta"
              >
                ID Oferta
              </label>
              <Input
                className="w-84"
                id="idOferta"
                type="text"
                value={idOferta}
                onChange={(e) => {
                  setIdOferta(e.target.value);
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Estado
                <SelectInput
                  onValueChange={setEstadoOferta}
                  defaultValue={estadoOferta}
                  items={[
                    { value: "PENDING", label: "PENDING" },
                    { value: "TRANSFERRED", label: "TRANSFERRED" },
                  ]}
                  className="w-84"
                />
              </label>
            </div>
            <Separator className="my-4" />
            <div className="flex gap-4">
              <div className="flex flex-col flex-1 rounded-2xl shadow-2xl p-4 justify-center text-center">
                <p>{formatCurrencyLocale(montoTotal)}</p>
                <p className="text-xs font-light text-gray-700">Dinero Total</p>
              </div>
              <div className="flex-1 rounded-2xl shadow-2xl p-4 text-center">
                <p>{rutsUnicos}</p>
                <p className="text-xs font-light text-gray-700">
                  Usuarios Unicos
                </p>
                <Separator className="my-4" />
                <p className="text-xs font-light text-gray-700">Usuarios</p>
                <p>{rutsTotales}</p>
              </div>
            </div>
          </div>
        </div>
        <OutputBlock
          outputFormat={outputFormat}
          setOutputFormat={setOutputFormat}
          output={formattedOutput}
          // totalRows={totalRows}
          // matchedRows={matchedRows}
        />
      </div>
    </section>
  );
};
