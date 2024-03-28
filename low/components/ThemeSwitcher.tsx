"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Computer, LampDeskIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div>
      <Tabs defaultValue={theme}>
        <TabsList className=" border">
          <TabsTrigger value="dark" onClick={() => setTheme("light")}>
            <SunIcon className=" w-6 h-6" />
          </TabsTrigger>
          <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
            <MoonIcon className=" w-6 h-6 rotate-90 transition-all dark:rotate-0" />
          </TabsTrigger>
          <TabsTrigger value="system" onClick={() => setTheme("system")}>
            <LampDeskIcon className=" w-6 h-6" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ThemeSwitcher;
