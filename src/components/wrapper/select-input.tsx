import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectInputProps {
  onValueChange: (value: string) => void;
  defaultValue: string;
  items: { value: string; label: string }[];
  className?: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  onValueChange,
  defaultValue,
  items,
  className,
}) => {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {items?.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
