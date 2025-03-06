import { Input } from "@/components/ui/input";
import { TextAreaInput } from "@/components/wrapper/textarea-input";
import { TitlePage } from "@/components/wrapper/title-page";

import { DateTimePicker } from "@/components/wrapper/date-time-picker";
import { OutputBlock } from "@/components/wrapper/output-block";
import { SelectInput } from "@/components/wrapper/select-input";
import { useOtherCashback } from "./hooks/use-other-cashback";

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
  } = useOtherCashback();

  return (
    <section>
      <TitlePage
        title="Format Others Cashback"
        info="Input your data in the text area below to format others cashback."
      />
      <div className="w-screen flex flex-col gap-8 px-4 py-4">
        <div className="flex w-full gap-4">
          <div className="flex flex-col flex-1 gap-4">
            <label className="block text-lg font-medium text-gray-700">
              Ruts
            </label>
            <TextAreaInput text={inputRuts} setText={setInputRuts} />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Date
              </label>
              <DateTimePicker date={date} setDate={setDate} />
            </div>
            <div>
              <label
                className="block text-lg font-medium text-gray-700"
                htmlFor="monto"
              >
                Monto
              </label>
              <Input
                className="w-82"
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
                className="block text-lg font-medium text-gray-700"
                htmlFor="titulo"
              >
                Titulo Oferta
              </label>
              <Input
                className="w-82"
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
                className="block text-lg font-medium text-gray-700"
                htmlFor="idOferta"
              >
                ID Oferta
              </label>
              <Input
                className="w-82"
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
                  className="w-82"
                />
              </label>
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
