import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { AppSidebar } from "../components/app-sidebar";
import OutletHeader from "../components/ui/outlet-header";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";
import { DashboardProvider } from "../features/dashboard/contexts/dashboard-context";
import type { User } from "../types/domain";
import { getUserData } from "../utils/api";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<Partial<User>>({});
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const data = await getUserData();
      setUserData(data.user);
      setIsLoading(false);
    } catch (error) {
      if (error.status === 401) {
        setIsLoading(false);
        navigate("/auth/login");
        window.location.reload();
        toast.error("You must be logged in to view this page");
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <DashboardProvider>
      <SidebarProvider>
        <AppSidebar userdata={userData} variant="inset" />
        <SidebarInset>
          <OutletHeader userData={userData} />
          <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet context={[isLoading, userData, getUser]} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </DashboardProvider>
  );
}
