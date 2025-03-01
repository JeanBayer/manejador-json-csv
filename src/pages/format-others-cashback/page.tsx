import { InputBlock } from "@/components/wrapper/input-block";
import { TitlePage } from "@/components/wrapper/title-page";
import { useState } from "react";

export const FormatOthersCashbackPage = () => {
  const [inputText, setInputText] = useState("");

  return (
    <section>
      <TitlePage
        title="Format Others Cashback"
        info="Input your data in the text area below to format others cashback."
      />
      <div className="w-screen flex flex-col gap-8 px-4 py-4">
        <div className="flex w-full gap-4">
          <InputBlock text={inputText} setText={setInputText} />
        </div>
      </div>
    </section>
  );
};
