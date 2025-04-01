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
  ReceiptText,
  User2,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// This is sample data.
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
  return (
    <Sidebar {...props}>
      <SidebarHeader className={"p-4"}>
        <h1 className="font-title font-bold text-2xl">Budget Warden</h1>
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
                    // isActive
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
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[12rem]">
                <DropdownMenuItem>
                  <Link className="w-full" to="/user/profile">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link className="w-full" to="/">
                    Sign out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
