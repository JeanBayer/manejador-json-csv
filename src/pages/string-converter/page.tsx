import { InputBlock } from "@/components/wrapper/InputBlock";
import { TextAreaOutput } from "@/components/wrapper/OutputBlock";
import { useInputWithFormat } from "@/hooks/useInputWithFormat";
import { convertToCustomCSV } from "@/utils/helpers";
import { useDebounce } from "@uidotdev/usehooks";
import { useMemo, useState } from "react";

export const StringConverterPage = () => {
  const { text, setText, jsonOutput } = useInputWithFormat();
  const [matchField, setMatchField] = useState("identificador");
  const debounceMatchField = useDebounce(matchField, 300);

  const formattedOutput = useMemo(() => {
    return convertToCustomCSV(jsonOutput, debounceMatchField);
  }, [jsonOutput, debounceMatchField]);

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
