import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function useCopyToClipboard() {
  const { toast } = useToast();
  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess("Copied!");
      toast({
        title: "Copied!",
        description: "The content has been copied to the clipboard.",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setCopySuccess("Failed to copy!");
      toast({
        title: "Failed to copy!",
        description: "There was an error copying the content.",
      });
    }
  };

  return { copySuccess, copyToClipboard };
}
