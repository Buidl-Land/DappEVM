import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow, differenceInDays } from "date-fns";
import { useContractRead } from "~~/hooks/contracts";

// Define project data type, matching the contract return structure
type ProjectData = {
  id: number;
  creator: string;
  title: string;
  description: string;
  tags: string[];
  metadata: {
    aiEvaluation: string;
    marketScore: number;
    techFeasibility: string;
    minValuation: number;
    maxValuation: number;
  };
  status: number;
  createdAt: number;
  updatedAt: number;
};

// Define funding information type
type FundingInfo = {
  fundingGoal: bigint;
  raisedAmount: bigint;
  startTime: number;
  endTime: number;
  hasMetFundingGoal: boolean;
  paymentToken: string;
};

// Create a simple cache object
const projectCache: Record<number, ProjectData> = {};
const fundingCache: Record<number, FundingInfo> = {};
const taskCountCache: Record<number, number> = {};

// Convert contract returned array to structured project data
const parseProjectData = (data: any[]): ProjectData => {
  return {
    id: Number(data[0]),
    creator: data[1],
    title: data[2],
    description: data[3],
    tags: data[4],
    metadata: {
      aiEvaluation: data[5].aiEvaluation,
      marketScore: Number(data[5].marketScore),
      techFeasibility: data[5].techFeasibility,
      minValuation: Number(data[5].minValuation),
      maxValuation: Number(data[5].maxValuation),
    },
    status: Number(data[6]),
    createdAt: Number(data[7]),
    updatedAt: Number(data[8]),
  };
};

// Convert contract returned array to structured funding information
const parseFundingInfo = (data: any[]): FundingInfo => {
  return {
    fundingGoal: data[0],
    raisedAmount: data[1],
    startTime: Number(data[2]),
    endTime: Number(data[3]),
    hasMetFundingGoal: data[4],
    paymentToken: data[5],
  };
};

// Status mapping
const statusMap: Record<number, { label: string; color: string }> = {
  0: { label: "Active", color: "bg-green-100 text-green-800" },
  1: { label: "Completed", color: "bg-blue-100 text-blue-800" },
  2: { label: "Cancelled", color: "bg-red-100 text-red-800" },
};

// Format amount, convert wei to USDC and format
const formatAmount = (amount: bigint): string => {
  const usdcAmount = Number(amount) / 1e18;
  return usdcAmount.toLocaleString(undefined, { maximumFractionDigits: 2 });
};

export const ContractProjectCard = ({ projectId = 2 }: { projectId?: number }) => {
  const { readMethod, isLoading } = useContractRead();
  const [project, setProject] = useState<ProjectData | null>(() => projectCache[projectId] || null);
  const [fundingInfo, setFundingInfo] = useState<FundingInfo | null>(() => fundingCache[projectId] || null);
  const [taskCount, setTaskCount] = useState<number | null>(() => taskCountCache[projectId] || null);

  useEffect(() => {
    // If cache data exists, use it directly
    if (projectCache[projectId]) {
      setProject(projectCache[projectId]);
    }

    if (fundingCache[projectId]) {
      setFundingInfo(fundingCache[projectId]);
    }

    if (taskCountCache[projectId]) {
      setTaskCount(taskCountCache[projectId]);
    }

    const fetchData = async () => {
      try {
        // Get project data
        if (!project) {
          const projectResult = await readMethod("getProject", [projectId]);
          
          if (projectResult) {
            const parsedProject = parseProjectData(projectResult as any[]);
            
            // Update cache
            projectCache[projectId] = parsedProject;
            
            setProject(parsedProject);
          }
        }

        // Get funding information
        if (!fundingInfo) {
          const fundingResult = await readMethod("getFundingInfo", [projectId]);
          
          if (fundingResult) {
            const parsedFunding = parseFundingInfo(fundingResult as any[]);
            
            // Update cache
            fundingCache[projectId] = parsedFunding;
            
            setFundingInfo(parsedFunding);
          }
        }

        // Get task count
        if (taskCount === null) {
          const taskCountResult = await readMethod("getProjectTaskCount", [projectId]);
          
          if (taskCountResult !== null && taskCountResult !== undefined) {
            const count = Number(taskCountResult);
            
            // Update cache
            taskCountCache[projectId] = count;
            
            setTaskCount(count);
          }
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    if (!isLoading) {
      fetchData();
    }
  }, [readMethod, projectId, isLoading, project, fundingInfo, taskCount]);

  if (isLoading || !project) {
    return (
      <div className="card w-full sm:w-[32%] bg-base-100 shadow-xl animate-pulse">
        <div className="card-body p-4">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
          <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
          <div className="h-2 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
          <div className="flex justify-end">
            <div className="h-6 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      </div>
    );
  }

  const status = statusMap[project.status] || { label: "Unknown", color: "bg-gray-100 text-gray-800" };
  const createdTime = formatDistanceToNow(new Date(project.createdAt * 1000), { addSuffix: true });

  // Calculate funding progress and days left
  let fundingProgress = 0;
  let daysLeft = 0;
  let isFundingClosed = false;

  if (fundingInfo) {
    // Calculate funding progress percentage
    fundingProgress = fundingInfo.fundingGoal > 0n 
      ? Number((fundingInfo.raisedAmount * 100n) / fundingInfo.fundingGoal) 
      : 0;
    
    // Calculate days left
    const now = new Date();
    const endDate = new Date(fundingInfo.endTime * 1000);
    daysLeft = Math.max(0, differenceInDays(endDate, now));
    
    // Check if funding is closed
    isFundingClosed = fundingInfo.hasMetFundingGoal || now > endDate;
  }

  return (
    <Link href={`/projects/${project.id}`} className="block w-full md:w-[48%] lg:w-[32%]">
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 h-full hover:scale-[1.02]">
        <div className="card-body p-4">
          <div className="flex justify-between items-start mb-2">
            <h2 className="card-title text-base md:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">{project.title}</h2>
            <div className="flex items-center gap-1">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                {status.label}
              </span>
              {taskCount !== null && (
                <span className="badge badge-outline badge-secondary badge-sm">
                  {taskCount} tasks
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-2">
            {project.tags.map((tag, index) => (
              <span key={index} className="badge badge-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors border-0">
                {tag}
              </span>
            ))}
          </div>
          
          <p className="overflow-hidden text-sm text-base-content mb-2" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', maxHeight: '4.5em' }}>{project.description}</p>
          
          {/* Funding Progress */}
          {fundingInfo && (
            <div className="bg-base-300 p-3 rounded-lg mb-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-sm text-primary">Funding Progress</h3>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium text-base-content">{daysLeft} {daysLeft > 0 ? "days left" : "days ended"}</span>
                  {isFundingClosed && (
                    <span className="badge badge-success badge-xs">Completed</span>
                  )}
                </div>
              </div>
              
              <div className="w-full bg-base-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${Math.min(100, fundingProgress)}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs font-medium text-base-content">
                <span>{formatAmount(fundingInfo.raisedAmount)} USDC</span>
                <span>Target: {formatAmount(fundingInfo.fundingGoal)} USDC</span>
              </div>
              
              <div className="mt-1 text-xs font-bold text-primary">
                {fundingProgress >= 100 ? (
                  <span className="text-success">Goal reached!</span>
                ) : (
                  <span>{fundingProgress.toFixed(1)}%</span>
                )}
              </div>
            </div>
          )}
          
          {/* AI Evaluation */}
          <div className="bg-base-300 p-3 rounded-lg mb-3">
            <p className="text-sm font-medium mb-1 text-secondary">AI Evaluation</p>
            <p className="text-xs text-base-content line-clamp-2">{project.metadata.aiEvaluation}</p>
          </div>
          
          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 mb-2 text-center">
            <div className="bg-primary/20 rounded p-2">
              <div className="text-xs text-primary font-medium">Score</div>
              <div className="font-bold text-sm text-base-content">{project.metadata.marketScore}/10</div>
            </div>
            <div className="bg-secondary/20 rounded p-2">
              <div className="text-xs text-secondary font-medium">Tech</div>
              <div className="font-bold text-sm text-base-content">{project.metadata.techFeasibility}</div>
            </div>
            <div className="bg-accent/20 rounded p-2">
              <div className="text-xs text-accent font-medium">Value</div>
              <div className="font-bold text-sm text-base-content">${(project.metadata.maxValuation / 1000).toFixed(1)}K</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}; 