import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useDownloadFile } from "@/hooks/use-download-file";

interface TextAreaOutputProps {
  value: string;
}

export const TextAreaOutput = ({ value }: TextAreaOutputProps) => {
  const { copyToClipboard } = useCopyToClipboard();
  const { downloadFile } = useDownloadFile();
  return (
    <label className="block text-sm font-medium text-gray-700">
      Output Data
      <div className="relative">
        <Textarea
          value={value || ""}
          placeholder="output"
          className="mt-1 block w-full h-[720px]"
          readOnly
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            onClick={() => copyToClipboard(value)}
            className="bg-blue-500 text-white"
          >
            Copy
          </Button>
          <Button
            onClick={() => downloadFile(value, "output.txt")}
            className="bg-green-500 text-white"
          >
            Download
          </Button>
        </div>
      </div>
    </label>
  );
};
