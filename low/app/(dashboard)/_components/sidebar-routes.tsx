"use client";
import { Compass, Layout } from "lucide-react";
import React from "react";
import SidebarItem from "./sidebar-item";

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

import { LucideIcon } from "lucide-react"; // Add this import statement

const SidebarRoutes = () => {
  const routes = sidebarRoutes;
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
