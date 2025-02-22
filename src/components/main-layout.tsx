import AppSidebar from "@/dashboard/components/app-sidebar";
import { FC, PropsWithChildren } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "./ui/sidebar";

const MainLayout: FC<PropsWithChildren<{ title: string }>> = ({
  children,
  title,
}) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "250px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-xl font-semibold">{title}</h1>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
