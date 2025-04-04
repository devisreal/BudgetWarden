import { AppSidebar } from "@/components/AppSidebar";
import OutletHeader from "@/components/ui/outlet-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { getUserData } from "@/utils/api";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const data = await getUserData();
      setUserData(data.user);
      setIsLoading(false);
    } catch (error) {
      if (error.status === 401) {
        toast.error("You must be logged in to view this page");
        navigate("/auth/login");
        setIsLoading(false);
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
