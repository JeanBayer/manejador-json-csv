import { InputBlock } from "@/components/wrapper/input-block";
import { TextAreaOutput } from "@/components/wrapper/textarea-output";
import { useInputWithFormat } from "@/hooks/use-input-with-format";
import { useStateDebounce } from "@/hooks/use-state-debounce";
import { convertToCustomCSV } from "@/utils/helpers";
import { useMemo } from "react";

export const StringConverterPage = () => {
  const { text, setText, jsonOutput } = useInputWithFormat(
    "string-converter-input-text1"
  );
  const [matchField, setMatchField, matchFieldDebounce] = useStateDebounce(
    "string-converter-match-field-text1",
    "identificador"
  );

  const formattedOutput = useMemo(() => {
    return jsonOutput ? convertToCustomCSV(jsonOutput, matchFieldDebounce) : "";
  }, [jsonOutput, matchFieldDebounce]);

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
