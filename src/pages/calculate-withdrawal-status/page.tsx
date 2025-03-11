import { OutputBlock } from "@/components/wrapper/output-block";
import { TextAreaInput } from "@/components/wrapper/textarea-input";
import { TitlePage } from "@/components/wrapper/title-page";
import { useWithdrawalStatus } from "@calculate-withdrawal-status/hooks/use-withdrawal-status";

export const CalculateWithdrawalStatus = () => {
  const {
    text,
    setText,
    outputFormat,
    setOutputFormat,
    formattedOutput,
    totalRows,
  } = useWithdrawalStatus();

  return (
    <section>
      <TitlePage
        title="Calculate Withdrawal Status"
        info="Calculate Withdrawal Status"
      />
      <div className="w-screen flex gap-8 px-4 py-4">
        <div className="flex flex-col flex-1 gap-4">
          <label className="block text-sm font-medium text-gray-700">
            Retiros
          </label>
          <TextAreaInput
            text={text}
            setText={setText}
            label="Only JSON format is accepted"
          />
        </div>
        <OutputBlock
          outputFormat={outputFormat}
          setOutputFormat={setOutputFormat}
          output={formattedOutput}
          totalRows={totalRows}
          matchedRows={totalRows}
        />
      </div>
    </section>
  );
};
