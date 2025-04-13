import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

export const IdeaPulseLogo = ({ className = "" }: { className?: string; withAnimation?: boolean }) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, theme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDarkMode = resolvedTheme === "dark" || theme === "dark";
  
  return (
    <Image
      src={`/${isDarkMode ? "logo-dark" : "logo-light"}.svg`}
      alt="IdeaPulse Logo"
      className={`w-auto h-10 ${className}`}
      width={40}
      height={40}
    />
  );
};
