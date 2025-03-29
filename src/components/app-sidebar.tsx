import { Link } from "react-router";
import {
  LayoutDashboard,
  Utensils,
  Dumbbell,
  Footprints,
  Ruler,
} from "lucide-react";
import { useLocation } from "react-router";

import NavUser from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useMeQuery from "@/hooks/use-me-query";
import { ComponentProps, useMemo } from "react";

const data = [
  {
    title: "Головна",
    url: "/",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Харчування",
    url: "/nutrition",
    icon: Utensils,
    isActive: false,
  },
  {
    title: "Вправи",
    url: "/exercise",
    icon: Dumbbell,
    isActive: false,
  },
  {
    title: "Кроки",
    url: "/steps",
    icon: Footprints,
    isActive: false,
  },
  {
    title: "Вага",
    url: "/weight",
    icon: Ruler,
    isActive: false,
  },
  {
    title: "Обхват плеча",
    url: "/shoulder",
    icon: Ruler,
    isActive: false,
  },
  {
    title: "Обхват грудей",
    url: "/chest",
    icon: Ruler,
    isActive: false,
  },
  {
    title: "Обхват талії",
    url: "/waist",
    icon: Ruler,
    isActive: false,
  },
  {
    title: "Обхват стегон",
    url: "/hips",
    icon: Ruler,
    isActive: false,
  },
  {
    title: "Обхват стегна",
    url: "/hip",
    icon: Ruler,
    isActive: false,
  },
];

const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  const { data: me } = useMeQuery();
  const location = useLocation();

  const user = useMemo(
    () => ({
      name: me.meta?.firstName,
      email: me.meta?.lastName,
      avatar: me.photoUrl || "",
    }),
    [me]
  );

  return (
    <Sidebar className="border-r" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-sidebar-primary-foreground">
                  <Dumbbell className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">cmnsns.in</span>
                  <span className="truncate text-xs">
                    Наука та здоровий глузд
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
              {data.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={{
                      children: item.title,
                      hidden: false,
                    }}
                    className="px-2.5 md:px-2"
                    asChild
                    isActive={location.pathname === item.url}
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
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};

AppSidebar.displayName = "AppSidebar";

export default AppSidebar;
