import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckBoxData } from "@/types/checkbox";
import { Check, ChevronsUpDown } from "lucide-react";

type CheckBoxProps = {
  data: CheckBoxData[];
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedValues: string[];
  toggleValue: (value: string) => void;
  title?: string;
};

export function CheckBox({
  data,
  open,
  setOpen,
  selectedValues,
  toggleValue,
  title = "Select Options",
}: CheckBoxProps) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          <label>{title}</label>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="min-w-[100px] max-w-full h-fit justify-between cursor-pointer"
          >
            <div className="flex flex-wrap gap-2">
              {selectedValues.length > 0
                ? selectedValues
                    ?.map(
                      (value) =>
                        data.find((framework) => framework.value === value)
                          ?.label
                    )
                    ?.map((label, index) => (
                      <Badge variant="outline" key={index}>
                        {label}
                      </Badge>
                    ))
                : "Select Options..."}
            </div>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search option..." className="h-9" />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {data?.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={() => {
                    toggleValue(framework.value);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedValues.includes(framework.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
