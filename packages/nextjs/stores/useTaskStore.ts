import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TaskData {
  title: string;
  description: string;
  reward: bigint;
  deadline: number;
  status: number;
  requiredSkills: string[];
  estimatedHours: number;
  assignee: string;
  createdAt: number;
  completedAt: number;
}

interface ProjectData {
  id: number;
  title: string;
  creator: string;
}

interface TaskStore {
  tasks: Record<string, TaskData>;
  projects: Record<string, ProjectData>;
  setTask: (projectId: string, taskId: string, task: TaskData) => void;
  setProject: (projectId: string, project: ProjectData) => void;
  getTask: (projectId: string, taskId: string) => TaskData | null;
  getProject: (projectId: string) => ProjectData | null;
  clearTask: (projectId: string, taskId: string) => void;
  clearProject: (projectId: string) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: {},
      projects: {},
      
      setTask: (projectId, taskId, task) =>
        set((state) => ({
          tasks: {
            ...state.tasks,
            [`${projectId}-${taskId}`]: task,
          },
        })),
      
      setProject: (projectId, project) =>
        set((state) => ({
          projects: {
            ...state.projects,
            [projectId]: project,
          },
        })),
      
      getTask: (projectId, taskId) => {
        const state = get();
        return state.tasks[`${projectId}-${taskId}`] || null;
      },
      
      getProject: (projectId) => {
        const state = get();
        return state.projects[projectId] || null;
      },
      
      clearTask: (projectId, taskId) =>
        set((state) => {
          const newTasks = { ...state.tasks };
          delete newTasks[`${projectId}-${taskId}`];
          return { tasks: newTasks };
        }),
      
      clearProject: (projectId) =>
        set((state) => {
          const newProjects = { ...state.projects };
          delete newProjects[projectId];
          return { projects: newProjects };
        }),
    }),
    {
      name: "task-store",
      partialize: (state) => ({
        tasks: state.tasks,
        projects: state.projects,
      }),
    }
  )
); 