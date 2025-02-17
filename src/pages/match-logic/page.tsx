import { InputBlock } from "@/components/wrapper/input-block";
import { OutputBlock } from "@/components/wrapper/output-block";
import { TitlePage } from "@/components/wrapper/title-page";
import { useMatchLogic } from "@/hooks/use-match-logic";

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
    <section>
      <TitlePage
        title="Match Logic"
        info="Select based on two JSON or CSV the fields you want to compare and return the matched rows. The input on the left is the source of truth, and the output will add 'match: true' to those that intersect with the input on the right."
      />
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
    </section>
  );
};
