import { InputBlock } from "@/components/wrapper/input-block";
import { TextAreaOutput } from "@/components/wrapper/output-block";
import { useInputWithFormat } from "@/hooks/use-input-with-format";
import { useStateDebounce } from "@/hooks/use-state-debounce";
import { convertToCustomCSV } from "@/utils/helpers";
import { useMemo } from "react";

export const StringConverterPage = () => {
  const { text, setText, jsonOutput } = useInputWithFormat();
  const [matchField, setMatchField] = useStateDebounce("identificador");

  const formattedOutput = useMemo(() => {
    return jsonOutput ? convertToCustomCSV(jsonOutput, matchField) : "";
  }, [jsonOutput, matchField]);

  return (
    <div className="w-screen flex flex-col gap-8 px-4 py-4">
      <div className="flex w-full gap-4">
        <InputBlock
          valueMatch={matchField}
          setValueMatch={setMatchField}
          text={text}
          setText={setText}
        />
      </div>
      <TextAreaOutput value={formattedOutput} />
    </div>
  );
};
