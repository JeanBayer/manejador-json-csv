import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { CalendarIcon } from "lucide-react";

interface InputCalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  mode?: "single" | "range";
  className?: string;
}

export const InputCalendar = ({
  selected,
  onSelect,
  mode = "single",
  className,
}: InputCalendarProps) => {
  return (
    <div className="flex flex-col">
      <label>Date of birth</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !selected && "text-muted-foreground"
            )}
          >
            {selected ? selected.toISOString() : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            // mode={mode}
            selected={selected}
            onSelect={onSelect}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            className={className}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
