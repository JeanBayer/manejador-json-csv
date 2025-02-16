import { Button } from "@/components/ui/button"; // Asegúrate de importar tu componente Button
import { Textarea } from "@/components/ui/textarea";
import { SelectInput } from "@/components/wrapper/selectInput";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useDownloadFile } from "@/hooks/useDownloadFile";

interface OutputBlockProps {
  outputFormat: "json" | "csv";
  setOutputFormat: (value: "json" | "csv") => void;
  output: string;
  totalRows: number;
  matchedRows: number;
}

export const OutputBlock: React.FC<OutputBlockProps> = ({
  outputFormat,
  setOutputFormat,
  output,
  totalRows,
  matchedRows,
}) => {
  const { copyToClipboard } = useCopyToClipboard();
  const { downloadFile } = useDownloadFile();

  return (
    <div className="flex flex-col gap-4">
      <label className="block text-sm font-medium text-gray-700">
        Output Format
        <SelectInput
          onValueChange={setOutputFormat}
          defaultValue={outputFormat}
          items={[
            { value: "json", label: "JSON" },
            { value: "csv", label: "CSV" },
          ]}
          className="max-w-64"
        />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Output Data
        <div className="relative">
          <Textarea
            value={output || ""}
            placeholder="output"
            className="mt-1 block w-full h-40"
            readOnly
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              onClick={() => copyToClipboard(output)}
              className="bg-blue-500 text-white"
            >
              Copy
            </Button>
            <Button
              onClick={() => downloadFile(output, "output.txt")}
              className="bg-green-500 text-white"
            >
              Download
            </Button>
          </div>
        </div>
      </label>
      <div className="text-sm text-muted-foreground text-right">
        Total Rows/Objects: {totalRows}, Matched: {matchedRows}
      </div>
    </div>
  );
};
