"use client";

import { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export const SwitchTheme = ({ className }: { className?: string }) => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDarkMode = resolvedTheme === "dark";

  const handleToggle = useCallback(() => {
    setTheme(isDarkMode ? "light" : "dark");
  }, [isDarkMode, setTheme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <button
        type="button"
        className={`flex items-center justify-center transition-colors duration-300 ${
          isDarkMode ? "text-blue-300 hover:text-blue-200" : "text-yellow-500 hover:text-yellow-400"
        }`}
        aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        onClick={handleToggle}
      >
        {isDarkMode ? (
          <MoonIcon className="h-7 w-7 text-blue-300 transition-transform duration-300 hover:scale-110" />
        ) : (
          <SunIcon className="h-7 w-7 text-yellow-500 transition-transform duration-300 hover:scale-110" />
        )}
      </button>
    </div>
  );
};
