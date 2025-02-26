"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export const ParticlesBackground = () => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  // Use a type assertion to bypass the type checking for this specific function
  const particlesInit = useCallback(async (engine: any) => {
    // @ts-ignore - Ignoring type checking for this call
    await loadFull(engine);
  }, []);

  const primaryColor = isDarkMode ? "#8B5CF6" : "#4F46E5";
  const secondaryColor = isDarkMode ? "#3B82F6" : "#06B6D4";

  return (
    <Particles
      className="absolute inset-0"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          color: {
            value: [primaryColor, secondaryColor],
          },
          links: {
            color: isDarkMode ? "#8B5CF6" : "#4F46E5",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.2,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};
