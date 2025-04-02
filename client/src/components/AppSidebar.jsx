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
  CalendarSync,
  ChartColumnBig,
  ChevronUp,
  CircleUser,
  LogOut,
  ReceiptText,
  User2,
  Wallet,
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
    icon: ChartColumnBig,
  },
  {
    title: "Bills",
    url: "/user/bills",
    icon: ReceiptText,
  },
  {
    title: "Budgets",
    url: "/user/budgets",
    icon: Wallet,
  },
  {
    title: "Subscriptions",
    url: "/user/subscriptions",
    icon: CalendarSync,
  },
];

export function AppSidebar({ ...props }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
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
                      <item.icon />
                      <span>{item.title}</span>
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
                <SidebarMenuButton>
                  <User2 /> {props.userdata.username}
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
