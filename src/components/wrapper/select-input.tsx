import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SelectInput = ({
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
          <SelectItem value={item.value}>{item.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
