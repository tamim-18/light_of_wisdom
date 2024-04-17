"use client";
import {
  BarChart,
  Compass,
  Layout,
  List,
  BookCheck,
  Airplay,
} from "lucide-react";
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
  {
    icon: BookCheck,
    name: "Exam Corner",
    path: "/exam-dashboard",
  },
  {
    icon: Airplay,
    name: "Remix AI",
    path: "http://localhost:3002",
  },
  {
    icon: Compass,
    name: "Discussion Forum",
    path: "http://localhost:3000",
  },
];
const teacherRoutes = [
  {
    icon: List,
    name: "Courses",
    path: "/teacher/courses",
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
