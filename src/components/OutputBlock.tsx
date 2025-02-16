import { SelectInput } from "@/components/wrapper/selectInput";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button"; // Asegúrate de importar tu componente Button
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

interface OutputBlockProps {
  outputFormat: "json" | "csv";
  setOutputFormat: (value: "json" | "csv") => void;
  output: string;
}

export const OutputBlock: React.FC<OutputBlockProps> = ({
  outputFormat,
  setOutputFormat,
  output,
}) => {
  const { copyToClipboard } = useCopyToClipboard();

  return (
    <div className="flex flex-col gap-4">
      <SelectInput
        onValueChange={setOutputFormat}
        defaultValue={outputFormat}
        items={[
          { value: "json", label: "JSON" },
          { value: "csv", label: "CSV" },
        ]}
        className="max-w-64"
      />
      <div className="relative">
        <Textarea
          value={output || ""}
          placeholder="output"
          className="h-40"
          readOnly
        />
        <Button
          onClick={() => copyToClipboard(output)}
          className="absolute top-2 right-2"
        >
          Copy
        </Button>
      </div>
    </div>
  );
};