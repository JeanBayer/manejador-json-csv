import { SelectInput } from "@/components/wrapper/select-input";
import { TextAreaOutput } from "@/components/wrapper/textarea-output";

interface OutputBlockProps {
  outputFormat: string;
  setOutputFormat: (value: string) => void;
  output: string;
  totalRows?: number;
  matchedRows?: number;
}

export const OutputBlock: React.FC<OutputBlockProps> = ({
  outputFormat,
  setOutputFormat,
  output,
  totalRows,
  matchedRows,
}) => {
  return (
    <div className="flex flex-col flex-1 gap-4">
      <label className="block text-sm font-medium text-gray-700">
        Output Format
        <SelectInput
          onValueChange={setOutputFormat}
          defaultValue={outputFormat}
          items={[
            { value: "json", label: "JSON" },
            { value: "csv", label: "CSV" },
            { value: "ssv", label: "SSV" },
          ]}
          className="max-w-64"
        />
      </label>
      <TextAreaOutput value={output} />
      {Number.isInteger(totalRows) && Number.isInteger(matchedRows) && (
        <div className="text-sm text-muted-foreground text-right">
          Total Rows/Objects: {totalRows}, Matched: {matchedRows}
        </div>
      )}
    </div>
  );
};
