import { InputBlock } from "@/components/wrapper/input-block";
import { TextAreaOutput } from "@/components/wrapper/textarea-output";
import { useStringConverter } from "@/hooks/use-string-converter";

export const StringConverterPage = () => {
  const {
    text,
    setText,
    matchField,
    setMatchField,
    formattedOutput,
    totalRows,
  } = useStringConverter();

  return (
    <div className="w-screen flex gap-8 px-4 py-4">
      <InputBlock
        valueMatch={matchField}
        setValueMatch={setMatchField}
        text={text}
        setText={setText}
      />
      <section className="flex flex-col flex-1 gap-4 mt-18">
        <TextAreaOutput value={formattedOutput} />
        <div className="text-sm text-muted-foreground text-right mt-4">
          Total Rows: {totalRows}
        </div>
      </section>
    </div>
  );
};
