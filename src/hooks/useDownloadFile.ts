import { useToast } from "@/hooks/use-toast";

export function useDownloadFile() {
  const { toast } = useToast();

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: `The file ${filename} has been downloaded.`,
    });
  };

  return { downloadFile };
}