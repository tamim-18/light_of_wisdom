"use client";
import { BarChart, Compass, Layout, List } from "lucide-react";
import React from "react";
import SidebarItem from "./sidebar-item";
import { LucideIcon } from "lucide-react"; // Add this import statement
import { usePathname } from "next/navigation";

const sidebarRoutes = [
  {
    icon: Layout,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: Compass,
    name: "Browse",
    path: "/search",
  },
];
const teacherRoutes = [
  {
    icon: List,
    name: "Courses",
    path: "/teacher/courses",
  },
  {
    icon: BarChart,
    name: "Analytics",
    path: "/teacher/analytics",
  },
];

const SidebarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.startsWith("/teacher");
  const routes = isTeacherPage ? teacherRoutes : sidebarRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.path}
          icon={route.icon}
          name={route.name}
          path={route.path}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
