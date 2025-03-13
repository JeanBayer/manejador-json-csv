import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextAreaInput } from "@/components/wrapper/textarea-input";
import { TextAreaOutput } from "@/components/wrapper/textarea-output";
import { TitlePage } from "@/components/wrapper/title-page";
import { useDownloadFile } from "@/hooks/use-download-file";
import { useSplitData } from "@split-data/hooks/use-split-data";

export const SplitDataPage = () => {
  const { text, setText, lines, setLines, splittedData, numberLines } =
    useSplitData();
  const { downloadFile } = useDownloadFile();

  return (
    <section>
      <TitlePage title="Split data" info="Split data into multiple lines" />
      <div className="w-screen flex gap-8 px-4 py-4">
        <div className="flex flex-col flex-1 gap-4">
          <label className="block text-sm font-medium text-gray-700">
            Quantity of Lines
            <Input
              type="number"
              min={1}
              value={lines}
              onChange={(e) => setLines(e.target.value)}
              className="mt-1 block max-w-64"
            />
          </label>
          <TextAreaInput text={text} setText={setText} label="Data to split" />
        </div>
        <section className="flex gap-4 mt-6 flex-col overflow-scroll">
          <div className="self-end">
            <Button
              onClick={() => {
                splittedData.forEach((data, index) => {
                  downloadFile(data, `output-${index + 1}.txt`);
                });
              }}
              className="bg-green-500 text-white"
            >
              Download All
            </Button>
          </div>
          <div className="flex w-full gap-8 pb-8 overflow-scroll">
            {splittedData.map((data, index) => (
              <div key={index} className="">
                <TextAreaOutput value={data} label={`File: ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="text-sm text-muted-foreground text-right mt-4">
            Total Files: <strong>{splittedData.length}</strong> / Total Number
            Lines: <strong>{numberLines}</strong>
          </div>
        </section>
      </div>
    </section>
  );
};
