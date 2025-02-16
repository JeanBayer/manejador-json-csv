import { InputBlock } from "@/components/wrapper/InputBlock";
import { OutputBlock } from "@/components/wrapper/OutputBlock";
import { useMatchLogic } from "@/hooks/useMatchLogic";

export const MatchLogicPage = () => {
  const {
    inputText1,
    setInputText1,
    inputText2,
    setInputText2,
    matchField1,
    setMatchField1,
    matchField2,
    setMatchField2,
    outputFormat,
    setOutputFormat,
    formattedOutput,
    totalRows,
    matchedRows,
  } = useMatchLogic();

  return (
    <div className="w-screen flex flex-col gap-8 px-4 py-4">
      <div className="flex w-full gap-4">
        <InputBlock
          valueMatch={matchField1}
          setValueMatch={setMatchField1}
          text={inputText1}
          setText={setInputText1}
        />
        <InputBlock
          valueMatch={matchField2}
          setValueMatch={setMatchField2}
          text={inputText2}
          setText={setInputText2}
        />
      </div>
      <OutputBlock
        outputFormat={outputFormat}
        setOutputFormat={setOutputFormat}
        output={formattedOutput}
        totalRows={totalRows}
        matchedRows={matchedRows}
      />
    </div>
  );
};
