"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
interface SidebarItemProps {
  icon: LucideIcon;
  name: string;
  path: string;
}

const SidebarItem = ({ icon: Icon, name, path }: SidebarItemProps) => {
  const pathname = usePathname(); // Add this line
  const router = useRouter();
  const isActive =
    (pathname === "/" && path === "/") ||
    pathname === path ||
    pathname?.startsWith(`${path}/`);
  const handleClick = () => {
    router.push(path);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-black text-sm font-semibold py-2 px-4 rounded-lg transition-all hover:bg-emerald-600 hover:text-black",
        isActive && "bg-emerald-100 text-emerald-700"
      )}
    >
      <div className="flex items-center gap-x-2">
        <Icon
          size={22}
          className={cn("text-black", isActive && "text-black")}
        />
        {name}
      </div>
      {isActive && (
        <div className="ml-auto w-4 h-4 rounded-full bg-emerald-700" />
      )}
    </button>
  );
};

export default SidebarItem;
