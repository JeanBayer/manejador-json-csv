import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface InputBlockProps {
  valueMatch: string;
  setValueMatch: (value: string) => void;
  text: string;
  setText: (value: string) => void;
}

export const InputBlock: React.FC<InputBlockProps> = ({
  valueMatch,
  setValueMatch,
  text,
  setText,
}) => {
  return (
    <div className="flex flex-col flex-1 gap-4">
      <label className="block text-sm font-medium text-gray-700">
        Match Field
        <Input
          value={valueMatch}
          onChange={(e) => setValueMatch(e.target.value)}
          className="mt-1 block w-full"
        />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Data Input
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Pega aquí tus datos"
          className="mt-1 block w-full h-40"
        />
      </label>
    </div>
  );
};
