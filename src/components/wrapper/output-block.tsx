import { SelectInput } from "@/components/wrapper/select-input";
import { TextAreaOutput } from "@/components/wrapper/textarea-output";
import { ItemsOutputFormat } from "@/utils/constants";

interface OutputBlockProps {
  outputFormat: string;
  setOutputFormat: (value: string) => void;
  output: string;
  totalRows?: number;
  matchedRows?: number;
  filename?: string;
  itemOutput?: typeof ItemsOutputFormat;
}

export const OutputBlock: React.FC<OutputBlockProps> = ({
  outputFormat,
  setOutputFormat,
  output,
  totalRows,
  matchedRows,
  filename = "output.txt",
  itemOutput = ItemsOutputFormat,
}) => {
  return (
    <div className="flex flex-col flex-1 gap-4">
      <label className="block text-sm font-medium text-gray-700">
        Output Format
        <SelectInput
          onValueChange={setOutputFormat}
          defaultValue={outputFormat}
          items={itemOutput}
          className="max-w-64"
        />
      </label>
      <TextAreaOutput value={output} filename={filename} />
      {Number.isInteger(totalRows) && Number.isInteger(matchedRows) && (
        <div className="text-sm text-muted-foreground text-right">
          Total Rows/Objects: {totalRows}, Matched: {matchedRows}
        </div>
      )}
    </div>
  );
};
