// This is a Server Component (no "use client" directive)
import { ProjectDetailsClient } from "./ProjectDetailsClient";

// Add generateStaticParams for static site generation with App Router
export async function generateStaticParams() {
  // Replace this with actual project IDs from your data source
  // This ensures these paths are pre-rendered at build time
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }];
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  return <ProjectDetailsClient projectId={params.id} />;
}
