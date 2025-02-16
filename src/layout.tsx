import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { Toaster } from "./components/ui/toaster";
import { AppSidebar } from "./components/wrapper/AppSideBar";

export const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <SidebarProvider
      defaultOpen={false}
      open={isSidebarOpen}
      onOpenChange={setIsSidebarOpen}
    >
      <AppSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main>
        <SidebarTrigger />
        {children}
        <Toaster />
      </main>
    </SidebarProvider>
  );
};
