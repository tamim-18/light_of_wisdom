"use client";
import { useAuth, UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import ThemeSwitcher from "./ThemeSwitcher";
import { isTeacher } from "@/lib/teacher";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { userId } = useAuth();
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");
  const isSearchPage = pathname === "/search";
  const isCoursePage = pathname?.includes("/courses");
  return (
    <>
      {isSearchPage && (
        <div className="hidden md-block">
          <SearchInput />
        </div>
      )}
      <div className="flex items-center gap-x-3 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-700 hover:text-blue-500"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-700 hover:text-blue-500"
            >
              Teacher Mode
            </Button>
          </Link>
        ) : null}
        <UserButton afterSignOutUrl="/" />
        <ThemeSwitcher />
      </div>
    </>
  );
};

export default NavbarRoutes;
