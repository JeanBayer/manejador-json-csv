import { useState } from "react";

export const StringConverterPage = () => {
  const [inputText, setInputText] = useState("");
  const [convertedText, setConvertedText] = useState("");

  const handleConvert = () => {
    // Implement your string conversion logic here
    setConvertedText(inputText.toUpperCase());
  };

  return (
    <div className="flex flex-col gap-8 px-4 py-4">
      <div className="flex flex-col gap-4">
        <label className="block text-sm font-medium text-gray-700">
          Input Text
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="mt-1 block w-full h-40"
          />
        </label>
        <button
          onClick={handleConvert}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Convert
        </button>
        <label className="block text-sm font-medium text-gray-700">
          Converted Text
          <textarea
            value={convertedText}
            readOnly
            className="mt-1 block w-full h-40"
          />
        </label>
      </div>
    </div>
  );
};
