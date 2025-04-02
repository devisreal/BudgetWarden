import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function OutletHeader({ userData }) {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const location = useLocation();

  useEffect(() => {
    const pages = {
      "/user/bills": "Bills",
      "/user/budgets": "Budgets",
      "/user/subscriptions": "Subscriptions",
      "/user/profile": "Profile",
      "/user/dashboard": "Dashboard",
      "/": "Dashboard",
    };

    setCurrentPage(pages[location.pathname] || "Dashboard");
  }, [location.pathname]);

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/user/dashboard">{userData.username}</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{currentPage}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
