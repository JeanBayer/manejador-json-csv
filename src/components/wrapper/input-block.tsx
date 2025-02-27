import { Input } from "@/components/ui/input";
import { TextAreaInput } from "@/components/wrapper/textarea-input";

interface InputBlockProps {
  valueMatch: string;
  setValueMatch: (value: string) => void;
  text: string;
  setText: (value: string) => void;
  extendedInput?: React.ReactNode;
}

export const InputBlock: React.FC<InputBlockProps> = ({
  valueMatch,
  setValueMatch,
  text,
  setText,
  extendedInput = null,
}) => {
  return (
    <div className="flex flex-col flex-1 gap-4">
      <div className="flex gap-4">
        <label className="block text-sm font-medium text-gray-700">
          Match Field
          <Input
            value={valueMatch}
            onChange={(e) => setValueMatch(e.target.value)}
            className="mt-1 block max-w-64"
          />
        </label>
        {extendedInput}
      </div>
      <TextAreaInput text={text} setText={setText} />
    </div>
  );
};
