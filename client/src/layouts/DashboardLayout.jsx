import { AppSidebar } from "@/components/AppSidebar";
import OutletHeader from "@/components/ui/outlet-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar variant="floating" />
      <SidebarInset>
        <OutletHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
