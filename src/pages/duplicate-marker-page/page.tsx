import { InputBlock } from "@/components/wrapper/input-block";
import { OutputBlock } from "@/components/wrapper/output-block";
import { TitlePage } from "@/components/wrapper/title-page";
import { useDuplicateMarker } from "@/hooks/use-duplicate-marker";

export const DuplicateMarkerPage = () => {
  const {
    text,
    setText,
    matchField,
    setMatchField,
    outputFormat,
    setOutputFormat,
    formattedOutput,
    totalRows,
    matchedRows,
  } = useDuplicateMarker();

  return (
    <section>
      <TitlePage
        title="Duplicate Marker"
        info="This tool allows you to mark duplicates in a JSON array based on a specific field."
      />
      <div className="w-screen flex gap-8 px-4 py-4">
        <InputBlock
          valueMatch={matchField}
          setValueMatch={setMatchField}
          text={text}
          setText={setText}
        />
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
