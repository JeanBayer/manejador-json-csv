import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export const Title = ({ children, ...props }: TitleProps) => {
  return (
    <h1
      {...props}
      className={cn("font-permanent-marker font-normal", props.className)}
    >
      {children}
    </h1>
  );
};
