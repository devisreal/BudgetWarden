import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Banknote,
  ChevronUp,
  CircleUser,
  FileText,
  ListChecks,
  LogOut,
  RefreshCcw,
  User,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const items = [
  {
    title: "Dashboard",
    url: "/user/dashboard",
    icon: ListChecks,
  },
  {
    title: "Bills",
    url: "/user/bills",
    icon: FileText,
  },
  {
    title: "Budgets",
    url: "/user/budgets",
    icon: Banknote,
  },
  {
    title: "Subscriptions",
    url: "/user/subscriptions",
    icon: RefreshCcw,
  },
];

export function AppSidebar({ ...props }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
    window.location.reload();
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader className={"p-4"}>
        <Link to="/user/dashboard" className="font-title font-bold text-2xl">
          Budget Warden
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    className={"p-3 text-md py-5 transition duration-150"}
                  >
                    <Link to={item.url}>
                      <div
                        className={`mr-3  p-1 rounded ${location.pathname === item.url ? "bg-emerald-100" : "bg-gray-100"}`}
                      >
                        <item.icon
                          className={`size-5 ${location.pathname === item.url ? "text-emerald-500" : ""}`}
                        />
                      </div>
                      <span
                        className={`${location.pathname === item.url ? "text-emerald-700" : ""} font-medium`}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="font-medium">
                  <User strokeWidth={2} />
                  {props.userdata.first_name
                    ? props.userdata.first_name
                    : props.userdata.username}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[16rem]">
                <DropdownMenuItem
                  className={`w-full ${location.pathname === "/user/profile" ? "bg-emerald-200" : ""}`}
                >
                  <CircleUser />
                  <Link className="w-full" to="/user/profile">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut />
                  <span
                    className="w-full cursor-pointer"
                    onClick={handleLogout}
                  >
                    Sign out
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
