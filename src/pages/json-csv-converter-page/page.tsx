import { OutputBlock } from "@/components/wrapper/output-block";
import { TextAreaInput } from "@/components/wrapper/textarea-input";
import { useJsonCsvConverter } from "@/hooks/use-json-csv-converter";

export const JsonCsvConverterPage = () => {
  const {
    text,
    setText,
    outputFormat,
    setOutputFormat,
    formattedOutput,
    totalRows,
  } = useJsonCsvConverter();

  return (
    <div className="w-screen flex flex-col gap-8 px-4 py-4">
      <TextAreaInput text={text} setText={setText} />
      <OutputBlock
        outputFormat={outputFormat}
        setOutputFormat={setOutputFormat}
        output={formattedOutput}
        totalRows={totalRows}
        matchedRows={totalRows}
      />
    </div>
  );
};
