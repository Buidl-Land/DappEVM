"use client";

import { Suspense } from "react";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-sm text-base-content/70 animate-pulse">Loading...</p>
          </div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
} 