import { CheckBox } from "@/components/wrapper/checkbox";
import { useCheckBox } from "@/hooks/use-check-box";

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
  return (
    <div>
      <CheckBox data={data} selectedValues={selectedValues} {...rest} />
    </div>
  );
};
