import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Title } from "@/components/ui/title";
import { Info } from "lucide-react";

interface TitlePageProps {
  title: string;
  info: string;
}

export const TitlePage = ({ title, info }: TitlePageProps) => {
  return (
    <Title className="text-4xl text-blue-900 text-center pb-8">
      {title}
      <Popover>
        <PopoverTrigger>
          <span>
            <Info className="h-8 w-8 text-blue-900 cursor-help inline ml-8" />
          </span>
        </PopoverTrigger>
        <PopoverContent>{info}</PopoverContent>
      </Popover>
    </Title>
  );
};
