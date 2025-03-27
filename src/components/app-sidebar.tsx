import {
  LayoutDashboard,
  Utensils,
  Dumbbell,
  CalendarDays,
  Users,
  PersonStanding,
} from "lucide-react";

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
import { ComponentProps, useState, useMemo } from "react";

// This is sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Головна",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Харчування",
      url: "#",
      icon: Utensils,
      isActive: false,
    },
    {
      title: "Вправи",
      url: "#",
      icon: Dumbbell,
      isActive: false,
    },
    {
      title: "Кроки",
      url: "#",
      icon: CalendarDays,
      isActive: false,
    },
    {
      title: "Clients",
      url: "#",
      icon: Users,
      isActive: false,
    },
    {
      title: "Вага",
      url: "#",
      icon: PersonStanding,
      isActive: false,
    },
    {
      title: "Обхват плеча",
      url: "#",
      icon: Utensils,
      isActive: false,
    },
    {
      title: "Обхват грудей",
      url: "#",
      icon: Utensils,
      isActive: false,
    },
    {
      title: "Обхват талії",
      url: "#",
      icon: Utensils,
      isActive: false,
    },
    {
      title: "Обхват стегон",
      url: "#",
      icon: Utensils,
      isActive: false,
    },
    {
      title: "Обхват стегна",
      url: "#",
      icon: Utensils,
      isActive: false,
    },
  ],
};

const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = useState(data.navMain[0]);

  const { data: me } = useMeQuery();

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
            <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
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
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={{
                      children: item.title,
                      hidden: false,
                    }}
                    onClick={() => {
                      setActiveItem(item);
                    }}
                    isActive={activeItem.title === item.title}
                    className="px-2.5 md:px-2"
                  >
                    <item.icon />
                    <span>{item.title}</span>
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
