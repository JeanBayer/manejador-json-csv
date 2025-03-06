import { CheckBox } from "@/components/wrapper/checkbox";
import { DateTimePicker } from "@/components/wrapper/date-time-picker";
import { useCheckBox } from "@/hooks/use-check-box";
import { useState } from "react";

const data = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export const PruebaPage = () => {
  const { selectedValues, ...rest } = useCheckBox();
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div>
      <DateTimePicker date={date} setDate={setDate} />
      <CheckBox data={data} selectedValues={selectedValues} {...rest} />
    </div>
  );
};
