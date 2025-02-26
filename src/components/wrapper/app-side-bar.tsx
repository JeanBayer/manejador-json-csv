import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useKeyPress } from "@/hooks/use-key-press";
import { RoutePath } from "@/utils/constants";
import { useClickAway } from "@uidotdev/usehooks";
import { GalleryVerticalEnd } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  title: string;
  url: string;
}

interface AppSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navItems: NavItem[] = [
  { title: "Match logic", url: `/${RoutePath.MATCH_LOGIC}` },
  { title: "String converter", url: `/${RoutePath.STRING_CONVERTER}` },
  { title: "JSON/CSV Converter", url: `/${RoutePath.JSON_CSV_CONVERTER}` },
  { title: "Duplicate Marker", url: `/${RoutePath.DUPLICATE_MARKER}` },
  {
    title: "Duplicate Complex Marker",
    url: `/${RoutePath.DUPLICATE_COMPLEX_MARKER}`,
  },
  {
    title: "Prueba",
    url: `/${RoutePath.PRUEBA}`,
  },
];

export function AppSidebar({ isOpen, setIsOpen }: AppSidebarProps) {
  const location = useLocation();
  const ref = useClickAway<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  useKeyPress("Escape", () => setIsOpen(!isOpen));

  return (
    <Sidebar
      className="border-r z-[100] bg-accent w-64"
      variant="floating"
      ref={ref}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="list-none">
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">My App</span>
                <span className="">v1.0.0</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navItems.map((item) => (
          <SidebarMenuItem
            key={item.title}
            className={`list-none transition-colors duration-200 ${
              location.pathname === item.url
                ? "bg-foreground text-[var(--text-foreground)]"
                : "hover:bg-foreground hover:text-[var(--text-foreground)]"
            }`}
          >
            <SidebarMenuButton asChild>
              <Link to={item.url} onClick={() => setIsOpen(false)}>
                {item.title}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
