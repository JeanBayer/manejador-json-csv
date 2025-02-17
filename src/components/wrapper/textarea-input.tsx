import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TextAreaInputProps {
  text: string;
  setText: (value: string) => void;
}

export const TextAreaInput = ({ text, setText }: TextAreaInputProps) => {
  const handleClear = () => {
    setText("");
  };

  return (
    <label className="block text-sm font-medium text-gray-700">
      Data Input
      <div className="relative">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Pega aquí tus datos"
          className="mt-1 block w-full h-40"
        />
        <Button
          onClick={handleClear}
          className="absolute top-2 right-2 bg-red-500 text-white"
        >
          Clear
        </Button>
      </div>
    </label>
  );
};
