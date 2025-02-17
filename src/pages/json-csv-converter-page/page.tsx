import { OutputBlock } from "@/components/wrapper/output-block";
import { TextAreaInput } from "@/components/wrapper/textarea-input";
import { TitlePage } from "@/components/wrapper/title-page";
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
    <section>
      <TitlePage
        title="JSON to CSV Converter"
        info="This tool allows you to convert a JSON array to a CSV file or a CSV file to a JSON array."
      />
      <div className="w-screen flex gap-8 px-4 py-4">
        <div className="flex flex-col flex-1 gap-4 mt-18">
          <TextAreaInput text={text} setText={setText} />
        </div>
        <OutputBlock
          outputFormat={outputFormat}
          setOutputFormat={setOutputFormat}
          output={formattedOutput}
          totalRows={totalRows}
          matchedRows={totalRows}
        />
      </div>
    </section>
  );
};
