import { Button } from "@/components/ui/button";
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
  buttonText?: string;
  onClick?: () => void;
}

export const TitlePage = ({
  title,
  info,
  buttonText = "",
  onClick = () => {},
}: TitlePageProps) => {
  return (
    <div className="flex flex-col pb-8 gap-4">
      <Title className="text-4xl text-blue-900 text-center ">
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
      {buttonText && (
        <div className="flex justify-end items-end pr-12">
          <Button onClick={onClick}>{buttonText}</Button>
        </div>
      )}
    </div>
  );
};
