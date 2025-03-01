"use client";

import { useState } from "react";
// import Link from "next/link";
import { useParams } from "next/navigation";
import { useAccount } from "wagmi";
import {
  /* Project, */
  TaskStatus,
} from "~~/data/mockData";
import { mockProjects } from "~~/data/mockData";

const TaskStatusBadge = ({ status }: { status: TaskStatus }) => {
  const colors = {
    open: "bg-primary/10 text-primary",
    in_progress: "bg-secondary/10 text-secondary",
    completed: "bg-success/10 text-success",
  };

  const labels = {
    open: "Open",
    in_progress: "In Progress",
    completed: "Completed",
  };

  return <span className={`px-2 py-1 rounded-full text-xs ${colors[status]}`}>{labels[status]}</span>;
};

type TabType = "details" | "roadmap" | "tasks";

const ProjectDetails = () => {
  const { id } = useParams();
  const {
    /* address: connectedAddress */
  } = useAccount();
  const [selectedToken, setSelectedToken] = useState("USDT");
  const [activeTab, setActiveTab] = useState<TabType>("details");
  const project = mockProjects.find(p => p.id === String(id));

  if (!project) {
    return <div className="text-center py-12">Project not found</div>;
  }

  const progress = (project.raisedAmount / project.fundingGoal) * 100;
  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)),
  );

  const tabContent = {
    details: (
      <div className="space-y-6">
        <p className="text-lg">{project.description}</p>
        <div>
          <h3 className="text-xl font-semibold mb-4">Project Overview</h3>
          <ul className="space-y-3 list-disc list-inside">
            <li>Category: {project.category}</li>
            <li>Technology Stack: {project.tags.join(", ")}</li>
            <li>Timeline: {new Date(project.endDate).toLocaleDateString()}</li>
          </ul>
        </div>
      </div>
    ),
    roadmap: (
      <div className="space-y-6">
        {project.roadmap.map((milestone, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-4 h-4 rounded-full ${milestone.status === "completed" ? "bg-success" : "bg-base-300"}`}
              />
              {index < project.roadmap.length - 1 && <div className="w-0.5 h-full bg-base-300" />}
            </div>
            <div className="flex-1 pb-6">
              <h3 className="font-semibold mb-1">{milestone.title}</h3>
              <p className="text-sm opacity-70 mb-2">{milestone.description}</p>
              <div className="bg-base-200/50 rounded-lg p-4 mt-2">
                <h4 className="font-medium mb-2">Deliverables:</h4>
                <p className="text-sm opacity-70">{milestone.deliverables}</p>
              </div>
              <div className="text-xs opacity-60 mt-3">Deadline: {milestone.deadline}</div>
            </div>
          </div>
        ))}
      </div>
    ),
    tasks: (
      <div className="space-y-4">
        {project.tasks.map(task => (
          <div key={task.id} className="bg-base-100 shadow-lg rounded-lg p-4 border border-base-300">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{task.title}</h3>
              <TaskStatusBadge status={task.status} />
            </div>
            <p className="text-sm opacity-70 mb-3">{task.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-primary font-semibold">{task.reward} USDT</span>
              {task.status === "open" && <button className="btn btn-sm btn-outline">Apply</button>}
            </div>
          </div>
        ))}
      </div>
    ),
  };

  return (
    <div className="flex flex-col min-h-screen animate-fade-in pt-20 sm:pt-24">
      {/* SVG Background */}
      <div className="fixed inset-0 z-[-1] opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="currentColor" />
              <circle cx="0" cy="0" r="1" fill="currentColor" />
              <circle cx="0" cy="100" r="1" fill="currentColor" />
              <circle cx="100" cy="0" r="1" fill="currentColor" />
              <circle cx="100" cy="100" r="1" fill="currentColor" />
              <path
                d="M50,0 L50,50 M0,50 L50,50 M50,50 L100,50 M50,50 L50,100"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
              />
              <path
                d="M25,25 Q50,0 75,25 T75,75 Q100,50 75,75 T25,75 Q0,50 25,25"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="2,4"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="w-full bg-base-200/30 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left Column - Project Info & Tabs */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Project Header */}
              <div className="card bg-base-100 shadow-lg p-4 sm:p-6">
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="badge badge-primary text-[10px] sm:text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">{project.title}</h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <span className="text-xs sm:text-sm opacity-70">
                    Created by {project.creator.slice(0, 6)}...{project.creator.slice(-4)}
                  </span>
                  <span className="text-xs sm:text-sm opacity-70 hidden sm:inline">•</span>
                  <span
                    className={`badge badge-sm sm:badge-md ${project.status === "active" ? "badge-primary" : "badge-ghost"}`}
                  >
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="card bg-base-100 shadow-lg">
                <div className="tabs tabs-boxed bg-base-200/50 rounded-t-2xl p-1 sm:p-2">
                  <button
                    className={`tab text-xs sm:text-sm flex-1 ${activeTab === "details" ? "tab-active" : ""}`}
                    onClick={() => setActiveTab("details")}
                  >
                    Details
                  </button>
                  <button
                    className={`tab text-xs sm:text-sm flex-1 ${activeTab === "roadmap" ? "tab-active" : ""}`}
                    onClick={() => setActiveTab("roadmap")}
                  >
                    Roadmap
                  </button>
                  <button
                    className={`tab text-xs sm:text-sm flex-1 ${activeTab === "tasks" ? "tab-active" : ""}`}
                    onClick={() => setActiveTab("tasks")}
                  >
                    Tasks
                  </button>
                </div>
                <div className="p-4 sm:p-6">{tabContent[activeTab]}</div>
              </div>
            </div>

            {/* Right Column - Funding & Support */}
            <div className="space-y-6 sm:space-y-8">
              {/* Funding Progress */}
              <div className="card bg-base-100 shadow-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Funding Progress</h2>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg sm:text-2xl font-bold">
                      {project.raisedAmount.toLocaleString()} / {project.fundingGoal.toLocaleString()} {selectedToken}
                    </span>
                    <span className="text-base sm:text-lg opacity-70">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-base-300 rounded-full h-2 sm:h-3">
                    <div
                      className="bg-primary rounded-full h-2 sm:h-3 transition-all duration-500"
                      style={{ width: `${Math.min(100, progress)}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center mb-4 sm:mb-6">
                  <div>
                    <div className="text-lg sm:text-2xl font-bold">{daysLeft}</div>
                    <div className="text-xs sm:text-sm opacity-70">Days Left</div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-bold">{project.participants.length}</div>
                    <div className="text-xs sm:text-sm opacity-70">Backers</div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-bold">
                      {project.tasks.filter(task => task.status === "open").length}
                    </div>
                    <div className="text-xs sm:text-sm opacity-70">Open Tasks</div>
                  </div>
                </div>

                {project.status === "active" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label htmlFor="token-select" className="font-semibold text-sm sm:text-base">
                        Select Token:
                      </label>
                      <select
                        id="token-select"
                        className="select select-bordered select-xs sm:select-sm"
                        value={selectedToken}
                        onChange={e => setSelectedToken(e.target.value)}
                        aria-label="Select payment token"
                      >
                        <option value="USDT">USDT</option>
                        <option value="USDC">USDC</option>
                      </select>
                    </div>
                    <button className="btn btn-primary btn-sm sm:btn-md w-full">Back This Project</button>
                  </div>
                )}
              </div>

              {/* Project Updates */}
              <div className="card bg-base-100 shadow-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Latest Updates</h2>
                <div className="space-y-4">
                  {project.updates?.map((update, index) => (
                    <div key={index} className="border-b border-base-300 last:border-0 pb-3 sm:pb-4 last:pb-0">
                      <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{update.title}</h3>
                      <p className="text-xs sm:text-sm opacity-70 mb-2">{update.content}</p>
                      <span className="text-[10px] sm:text-xs opacity-60">{update.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
