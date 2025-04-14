"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow, differenceInDays } from "date-fns";
import { useAccount } from "wagmi";
import { useContractRead, useContractWrite } from "~~/hooks/contracts";
import { notification } from "~~/utils/scaffold-eth";

// Define task data type based on contract return structure
type TaskData = {
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
};

// Define project data type for context
type ProjectData = {
  id: number;
  title: string;
  creator: string;
};

import { useQuery, useQueryClient } from "@tanstack/react-query";

// Parse task data from contract response
const parseTaskData = (data: any[]): TaskData => {
  return {
    title: data[0],
    description: data[1],
    reward: data[2],
    deadline: Number(data[3]),
    status: Number(data[4]),
    requiredSkills: data[5],
    estimatedHours: Number(data[6]),
    assignee: data[7],
    createdAt: Number(data[8]),
    completedAt: Number(data[9]),
  };
};

// Format token amount (convert from wei to tokens)
const formatTokenAmount = (amount: bigint): string => {
  return Number(amount).toLocaleString(undefined, { maximumFractionDigits: 2 });
};

// Task status mapping
const statusMap: Record<number, { label: string; color: string }> = {
  0: { label: "Open", color: "bg-green-100 text-green-800" },
  1: { label: "Assigned", color: "bg-blue-100 text-blue-800" },
  2: { label: "In Progress", color: "bg-blue-100 text-blue-800" },
  3: { label: "Completed", color: "bg-yellow-100 text-yellow-800" },
  4: { label: "Verified", color: "bg-purple-100 text-purple-800" },
  5: { label: "Cancelled", color: "bg-red-100 text-red-800" },
};

export function TaskDetailsClient({ projectId, taskId }: { projectId: string; taskId: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const numericProjectId = parseInt(projectId);
  const numericTaskId = parseInt(taskId);
  const { readMethod, isLoading: contractLoading } = useContractRead();
  const { writeMethod } = useContractWrite();
  const { address: connectedAddress } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use React Query to fetch task data
  const { data: task, isLoading: taskLoading } = useQuery({
    queryKey: ["task", projectId, taskId],
    queryFn: async () => {
      const taskResult = await readMethod("getTask", [numericProjectId, numericTaskId]);
      return taskResult ? parseTaskData(taskResult as any[]) : null;
    },
    enabled: !contractLoading
  });

  // Use React Query to fetch project data
  const { data: project, isLoading: projectLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const projectResult = await readMethod("getProject", [numericProjectId]);
      if (!projectResult) return null;
      return {
        id: Number(projectResult[0]),
        title: projectResult[2],
        creator: projectResult[1],
      };
    },
    enabled: !contractLoading
  });

  // Optimize the refreshData function
  const refreshData = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["task", projectId, taskId] });
  }, [queryClient, projectId, taskId]);

  // Handle task actions
  const handleTaskAction = useCallback(async (
    action: "applyForTask" | "startTask" | "completeTask",
    actionName: string
  ) => {
    try {
      setIsSubmitting(true);
      const notificationId = notification.loading(`${actionName}...`);
      
      await writeMethod(action, [numericProjectId, numericTaskId], {
        onSuccess: (txHash) => {
          notification.remove(notificationId);
          notification.success(
            <div>
              <p>{actionName} successful!</p>
              <p className="text-xs mt-1">Transaction hash: {txHash.slice(0, 10)}...{txHash.slice(-8)}</p>
            </div>,
            { duration: 5000 }
          );
          setTimeout(refreshData, 2000);
        },
        onError: (error) => {
          notification.remove(notificationId);
          notification.error(
            <div>
              <p>{actionName} failed</p>
              <p className="text-xs mt-1">{error.message}</p>
            </div>
          );
        }
      });
    } catch (error: any) {
      console.error(`Error ${action}:`, error);
      notification.error(`${actionName} failed: ` + error.message);
    } finally {
      setIsSubmitting(false);
    }
  }, [writeMethod, numericProjectId, numericTaskId, refreshData]);

  // Simplified operation handling functions
  const handleApplyForTask = useCallback(() => handleTaskAction("applyForTask", "Apply for Task"), [handleTaskAction]);
  const handleStartTask = useCallback(() => handleTaskAction("startTask", "Start Task"), [handleTaskAction]);
  const handleCompleteTask = useCallback(() => handleTaskAction("completeTask", "Complete Task"), [handleTaskAction]);

  const isLoading = contractLoading || taskLoading || projectLoading;

  // Helper function to get task status message
  const getTaskStatusMessage = (task: TaskData, connectedWallet?: string): string => {
    switch (task.status) {
      case 0:
        return "This task is open for applications.";
      case 1:
        return `This task has been assigned to ${shortenAddress(task.assignee)}.`;
      case 2:
        return `${shortenAddress(task.assignee)} is currently working on this task.`;
      case 3:
        return `${shortenAddress(task.assignee)} has marked this task as completed. Awaiting verification.`;
      case 4:
        const baseMessage = `This task has been verified and payment has been released to ${shortenAddress(task.assignee)}.`;
        if (connectedWallet && task.assignee.toLowerCase() === connectedWallet.toLowerCase()) {
          return `${baseMessage} Please check your wallet for the reward payment.`;
        }
        return baseMessage;
      default:
        return "Unknown status";
    }
  };

  // Helper function: Shorten address display
  const shortenAddress = (address: string): string => {
    if (!address || address === "0x0000000000000000000000000000000000000000") return "No one";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (isLoading || !task || !project) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="h-40 bg-gray-200 rounded mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-60 bg-gray-200 rounded"></div>
          <div className="h-60 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Calculate days left until deadline
  const now = new Date();
  const deadlineDate = new Date(task.deadline * 1000);
  const daysLeft = Math.max(0, differenceInDays(deadlineDate, now));
  const isDeadlinePassed = now > deadlineDate;
  
  // Determine if user can apply, start, or complete task
  const canApply = task.status === 0; // Open status
  const canStart = task.status === 1 && task.assignee === connectedAddress; // Assigned status and user is assignee
  const canComplete = task.status === 2 && task.assignee === connectedAddress; // In Progress status and user is assignee
  
  // Format dates
  const createdTime = formatDistanceToNow(new Date(task.createdAt * 1000), { addSuffix: true });
  const deadlineTime = formatDistanceToNow(deadlineDate, { addSuffix: true });
  
  // Get task status label
  const getTaskStatusLabel = (status: number): string => {
    switch (status) {
      case 0: return "Open";
      case 1: return "Assigned";
      case 2: return "In Progress";
      case 3: return "Completed";
      case 4: return "Verified";
      default: return "Unknown";
    }
  };

  // Get task status color
  const getTaskStatusColor = (status: number): string => {
    switch (status) {
      case 0: return "bg-secondary text-white";
      case 1: return "bg-primary text-white";
      case 2: return "bg-info text-white";
      case 3: return "bg-warning text-white";
      case 4: return "bg-success text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  // Get current task status
  const status = {
    label: getTaskStatusLabel(task.status),
    color: getTaskStatusColor(task.status)
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-8 mt-4 sm:pt-28 sm:mt-6 animate-fade-in">
      {/* SVG Background */}
      <div className="fixed inset-0 z-[-1] opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M0,0 L40,0 L40,40 L0,40 L0,0 Z M39,1 L1,1 L1,39 L39,39 L39,1 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1.5" fill="currentColor" />
            </pattern>
            <mask id="gridMask">
              <rect width="100%" height="100%" fill="url(#grid)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
          <rect width="100%" height="100%" fill="currentColor" mask="url(#gridMask)" opacity="0.2" />
        </svg>
      </div>

      {/* Breadcrumb navigation */}
      <div className="text-sm breadcrumbs mb-6">
        <ul>
          <li>
            <Link href="/projects" className="text-primary">
              Projects
            </Link>
          </li>
          <li>
            <Link href={`/projects/${projectId}`} className="text-primary" onClick={() => window.localStorage.setItem('activeProjectTab', 'tasks')}>
              {project?.title || `Project ${projectId}`}
            </Link>
          </li>
          <li>Task {parseInt(taskId) + 1}</li>
        </ul>
      </div>

      {/* Task header */}
      <div className="p-6 mb-8 rounded-2xl shadow-lg bg-base-100 relative overflow-hidden border border-transparent before:absolute before:inset-0 before:p-[1px] before:rounded-2xl before:bg-gradient-to-r before:from-primary/40 before:via-secondary/40 before:to-accent/40 before:-z-10 after:absolute after:inset-0 after:rounded-2xl after:bg-base-100 after:-z-10">
        {/* Add aurora effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-full blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-tr from-accent/10 via-primary/10 to-secondary/10 rounded-full blur-xl opacity-60 animate-pulse" style={{ animationDelay: "2s" }}></div>
        
        <div className="relative z-10">
          {/* Required Skills */}
          <div className="flex flex-wrap gap-1 mb-3 sm:gap-2 sm:mb-4">
            {task.requiredSkills.map((skill, index) => (
              <span key={index} className="badge badge-primary badge-sm sm:badge-md bg-primary/10 border-0 text-primary">
                {skill}
              </span>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">{task.title}</h1>
              <p className="flex flex-wrap items-center gap-2 text-sm opacity-70">
                <span>Created {createdTime}</span>
                {task.assignee && task.assignee !== "0x0000000000000000000000000000000000000000" && (
                  <>
                    <span className="hidden md:inline">•</span>
                    <span className="flex items-center">
                      Assigned to <span className="ml-1 px-2 py-0.5 text-xs font-medium text-primary border border-primary rounded-md hover:bg-primary/10">{shortenAddress(task.assignee)}</span>
                    </span>
                  </>
                )}
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                {status.label}
              </span>
              <span className="badge badge-outline badge-secondary">
                {formatTokenAmount(task.reward)} USDC
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Task details */}
        <div className="md:col-span-2">
          <div className="p-4 shadow-lg card bg-base-100 sm:p-6 relative overflow-hidden border border-transparent before:absolute before:inset-0 before:p-[1px] before:rounded-2xl before:bg-gradient-to-r before:from-primary/30 before:via-secondary/30 before:to-accent/30 before:-z-10 after:absolute after:inset-0 after:rounded-2xl after:bg-base-100 after:-z-10">
            <div className="relative z-10">
              <h2 className="mb-3 text-lg font-bold sm:text-xl sm:mb-4">
                <span className="material-icons text-primary text-sm align-text-bottom mr-1">description</span>
                Task Description
              </h2>
              <div className="whitespace-pre-line text-sm sm:text-base opacity-80 mb-6">{task.description}</div>

              <h3 className="mb-3 text-base font-bold sm:text-lg sm:mb-4">
                <span className="material-icons text-primary text-sm align-text-bottom mr-1">schedule</span>
                Timeline Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-3 rounded-lg bg-base-200/50 border border-base-300/50">
                  <p className="text-xs opacity-70 sm:text-sm">
                    <span className="material-icons text-primary text-xs align-text-bottom mr-1">event</span>
                    Deadline
                  </p>
                  <p className="mt-1 text-base font-semibold sm:text-lg">
                    {deadlineTime}
                    {isDeadlinePassed ? (
                      <span className="text-error text-sm ml-2">(Expired)</span>
                    ) : (
                      <span className="text-success text-sm ml-2">({daysLeft} days left)</span>
                    )}
                  </p>
                </div>
                
                <div className="p-3 rounded-lg bg-base-200/50 border border-base-300/50">
                  <p className="text-xs opacity-70 sm:text-sm">
                    <span className="material-icons text-primary text-xs align-text-bottom mr-1">hourglass_top</span>
                    Estimated Effort
                  </p>
                  <p className="mt-1 text-base font-semibold sm:text-lg">{task.estimatedHours} hours</p>
                </div>
              </div>

              {/* Task status message */}
              <div className={`p-4 rounded-lg ${task.status === 4 ? 'bg-success/10 border border-success/20' : 'bg-info/10 border border-info/20'} mt-4`}>
                <div className="flex gap-3">
                  <span className="material-icons text-lg mt-0.5 text-primary">info</span>
                  <div>
                    <p className="font-medium">Current Status: {getTaskStatusLabel(task.status)}</p>
                    <p className="text-sm mt-1 opacity-80">{getTaskStatusMessage(task, connectedAddress)}</p>
                    
                    {/* Display verified and reward release information */}
                    {task.status === 4 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-success">
                          ✓ Task verified and reward of {formatTokenAmount(task.reward)} has been released
                        </p>
                        {task.completedAt > 0 && (
                          <p className="text-xs mt-1 opacity-70">
                            Completed on {new Date(task.completedAt * 1000).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task sidebar */}
        <div className="space-y-6 sm:space-y-8">
          {/* Task details card */}
          <div className="p-4 shadow-lg card bg-base-100 sm:p-6 relative overflow-hidden border border-transparent before:absolute before:inset-0 before:p-[1px] before:rounded-2xl before:bg-gradient-to-r before:from-primary/30 before:via-secondary/30 before:to-accent/30 before:-z-10 after:absolute after:inset-0 after:rounded-2xl after:bg-base-100 after:-z-10">
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-full blur-xl opacity-60 animate-pulse"></div>
            
            <div className="relative z-10">
              <h2 className="mb-3 text-lg font-bold sm:text-xl sm:mb-4">
                <span className="material-icons text-primary text-sm align-text-bottom mr-1">payments</span>
                Reward Information
              </h2>
              
              <div className="p-3 rounded-lg bg-base-200/50 border border-base-300/50 mb-4">
                <p className="text-xs opacity-70 sm:text-sm">
                  <span className="material-icons text-primary text-xs align-text-bottom mr-1">attach_money</span>
                  Task Reward
                </p>
                <p className="mt-1 text-xl font-semibold sm:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  {formatTokenAmount(task.reward)} USDC
                </p>
              </div>
              
              {/* Task Actions */}
              <div className="mt-6">
                {/* Apply for task button */}
                {task.status === 0 && connectedAddress && (
                  <button 
                    className="btn btn-primary w-full mb-3 h-12" 
                    onClick={handleApplyForTask}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <span className="material-icons text-sm align-text-bottom mr-1">assignment_turned_in</span>
                        Apply for this Task
                      </>
                    )}
                  </button>
                )}
                
                {/* Start task button (for assignee) */}
                {task.status === 1 && canStart && (
                  <button 
                    className="btn btn-primary w-full mb-3 h-12" 
                    onClick={handleStartTask}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <span className="material-icons text-sm align-text-bottom mr-1">play_arrow</span>
                        Start Working on Task
                      </>
                    )}
                  </button>
                )}
                
                {/* Complete task button (for assignee) */}
                {task.status === 2 && canComplete && (
                  <button 
                    className="btn btn-primary w-full mb-3 h-12" 
                    onClick={handleCompleteTask}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <span className="material-icons text-sm align-text-bottom mr-1">check_circle</span>
                        Mark as Completed
                      </>
                    )}
                  </button>
                )}
                
                {!connectedAddress && (
                  <div className="alert alert-warning">
                    <span className="material-icons text-sm align-text-bottom mr-1">warning</span>
                    <span>Connect your wallet to interact with this task</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Project info card */}
          {project && (
            <div className="p-4 shadow-lg card bg-base-100 sm:p-6 relative overflow-hidden border border-transparent before:absolute before:inset-0 before:p-[1px] before:rounded-2xl before:bg-gradient-to-r before:from-primary/30 before:via-secondary/30 before:to-accent/30 before:-z-10 after:absolute after:inset-0 after:rounded-2xl after:bg-base-100 after:-z-10">
              <div className="relative z-10">
                <h2 className="mb-3 text-lg font-bold sm:text-xl sm:mb-4">
                  <span className="material-icons text-primary text-sm align-text-bottom mr-1">folder</span>
                  Project Information
                </h2>
                
                <div className="p-3 rounded-lg bg-base-200/50 border border-base-300/50 mb-4">
                  <p className="text-xs opacity-70 sm:text-sm">
                    <span className="material-icons text-primary text-xs align-text-bottom mr-1">business</span>
                    Project Name
                  </p>
                  <p className="mt-1 text-base font-semibold sm:text-lg">{project.title}</p>
                </div>
                
                <div className="p-3 rounded-lg bg-base-200/50 border border-base-300/50 mb-4">
                  <p className="text-xs opacity-70 sm:text-sm">
                    <span className="material-icons text-primary text-xs align-text-bottom mr-1">person</span>
                    Project Creator
                  </p>
                  <p className="mt-1 text-base font-semibold sm:text-lg">
                    <span className="px-2 py-0.5 text-xs font-medium text-primary border border-primary rounded-md">
                      {project.creator.substring(0, 6)}...{project.creator.substring(project.creator.length - 4)}
                    </span>
                    <span className="ml-2 text-xs opacity-70">agent@upmyidea</span>
                  </p>
                </div>
                
                <div className="card-actions justify-center mt-4">
                  <Link href={`/projects/${projectId}`} className="btn btn-outline btn-primary btn-sm sm:btn-md h-10 min-h-10 w-full">
                    <span className="material-icons text-sm align-text-bottom mr-1">visibility</span>
                    View Project Details
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 