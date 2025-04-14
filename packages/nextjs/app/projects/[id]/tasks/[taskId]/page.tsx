// This is a Server Component (no "use client" directive)
import { Suspense } from "react";
import { TaskDetailsClient } from "./TaskDetailsClient";

// Add generateStaticParams for static site generation with App Router
export async function generateStaticParams() {
  // Replace this with actual task IDs from your data source
  // This ensures these paths are pre-rendered at build time
  return [
    { id: "1", taskId: "1" },
    { id: "1", taskId: "2" },
    { id: "2", taskId: "1" },
  ];
}

export default function TaskPage({ params }: { params: { id: string; taskId: string } }) {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen bg-base-100">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-sm text-base-content/70 animate-pulse">加载任务详情...</p>
        </div>
      </div>
    }>
      <TaskDetailsClient projectId={params.id} taskId={params.taskId} />
    </Suspense>
  );
} 