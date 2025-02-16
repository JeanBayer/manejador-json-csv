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
      <Input
        value={valueMatch}
        onChange={(e) => setValueMatch(e.target.value)}
        className="max-w-64"
      />
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Pega aquí tus datos"
        className="h-40"
      />
    </div>
  );
};