import { icons, type LucideProps } from "lucide-react";

/* Thin, single-weight outline icons (Lucide), per the design system's
   iconography spec. `name` is the kebab-case lucide name stored in the CMS. */
function toPascal(name: string): string {
  return name
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

interface IconProps extends LucideProps {
  name: string;
}

export function Icon({ name, size = 22, strokeWidth = 1.75, ...rest }: IconProps) {
  const Cmp = icons[toPascal(name) as keyof typeof icons] ?? icons.Box;
  return <Cmp size={size} strokeWidth={strokeWidth} {...rest} />;
}
