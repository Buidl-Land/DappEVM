import Link from "next/link";
import { formatDistanceToNow, differenceInDays } from "date-fns";
import { useDiamondRead } from "~~/hooks/diamond/useDiamondRead";

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

// Safe timestamp handling
const getFormattedTime = (timestamp: number) => {
  const timestampMs = timestamp < 1e12 ? timestamp * 1000 : timestamp;
  return formatDistanceToNow(new Date(timestampMs), { addSuffix: true });
};

export const ContractProjectCard = ({ projectId = 2 }: { projectId?: number }) => {
  // Use the new Diamond Read hook for project data
  const { 
    data: rawProject, 
    isLoading: isProjectLoading
  } = useDiamondRead(
    "getProject",
    [projectId],
    {
      watch: true,
      enabled: Boolean(projectId)
    }
  );

  // Parse raw project data
  const project = rawProject ? parseProjectData(rawProject as any[]) : undefined;

  // Use the new Diamond Read hook for funding info
  const {
    data: rawFundingInfo,
    isLoading: isFundingLoading
  } = useDiamondRead(
    "getFundingInfo",
    [projectId],
    {
      watch: true,
      enabled: Boolean(projectId)
    }
  );

  // Parse raw funding info
  const fundingInfo = rawFundingInfo ? parseFundingInfo(rawFundingInfo as any[]) : undefined;

  // Use the new Diamond Read hook for task count
  const {
    data: taskCount,
    isLoading: taskCountLoading
  } = useDiamondRead(
    "getProjectTaskCount",
    [projectId],
    {
      watch: true,
      enabled: Boolean(projectId)
    }
  );

  // Combined loading state
  const isLoading = isProjectLoading || isFundingLoading || taskCountLoading;

  // Loading state UI
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
  const createdTime = getFormattedTime(project.createdAt);

  // Calculate funding progress and days left
  let fundingProgress = 0;
  let daysLeft = 0;
  let isFundingClosed = false;

  if (fundingInfo) {
    fundingProgress = fundingInfo.fundingGoal > 0n 
      ? Number((fundingInfo.raisedAmount * 100n) / fundingInfo.fundingGoal) 
      : 0;
    
    const now = new Date();
    const endTimeMs = fundingInfo.endTime < 1e12 ? fundingInfo.endTime * 1000 : fundingInfo.endTime;
    const endDate = new Date(endTimeMs);
    daysLeft = Math.max(0, differenceInDays(endDate, now));
    isFundingClosed = fundingInfo.hasMetFundingGoal || now > endDate;
  }

  return (
    <Link href={`/projects/${project.id}`} className="block w-full md:w-[48%] lg:w-[32%] group">
      <div className="relative card h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl group-hover:opacity-70 transition-opacity duration-300"></div>
        <div className="absolute inset-0 backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 rounded-2xl opacity-80 group-hover:opacity-90 transition-all duration-300 border border-white/20 dark:border-gray-800/20"></div>
        <div className="relative card-body p-4 z-10">
          <div className="flex justify-between items-start mb-2">
            <h2 className="card-title text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              {project?.title || 'Untitled Project'}
            </h2>
            <div className="flex items-center gap-1">
              <span className={`px-2 py-0.5 rounded-full text-base font-medium ${status.color}`}>
                {status.label}
              </span>
              {taskCount !== undefined && (
                <span className="badge badge-outline badge-secondary badge-sm text-base">
                  {Number(taskCount)} tasks
                </span>
              )}
            </div>
          </div>
          
          <div className="h-[65px] flex flex-wrap gap-1 mb-2 overflow-hidden">
            {Array.isArray(project?.tags) ? project.tags.map((tag, index) => (
              <span key={index} className="badge badge-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors border-0 text-base">
                {tag}
              </span>
            )) : null}
          </div>
          
          <p className="overflow-hidden text-lg text-base-content mb-2" 
             style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', maxHeight: '5em' }}>
            {project?.description || 'No description available'}
          </p>
          
          {/* Funding Progress */}
          {fundingInfo && (
            <div className="relative overflow-hidden bg-white/40 dark:bg-gray-800/40 rounded-lg mb-2">
              <div className="absolute inset-0 backdrop-blur-lg"></div>
              <div className="relative p-3 z-10">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-lg text-primary">Funding Progress</h3>
                  <div className="flex items-center gap-1">
                    <span className="text-base font-medium text-base-content">{daysLeft} {daysLeft > 0 ? "days left" : "days ended"}</span>
                    {isFundingClosed && (
                      <span className="badge badge-success badge-xs text-sm">Completed</span>
                    )}
                  </div>
                </div>
                
                <div className="w-full bg-base-200 rounded-full h-4 mb-2">
                  <div 
                    className="bg-primary h-4 rounded-full" 
                    style={{ width: `${Math.min(100, fundingProgress)}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-base font-medium text-base-content">
                  <span>{formatAmount(fundingInfo.raisedAmount)} USDC</span>
                  <span>Target: {formatAmount(fundingInfo.fundingGoal)} USDC</span>
                </div>
                
                <div className="mt-1 text-base font-bold text-primary">
                  {fundingProgress >= 100 ? (
                    <span className="text-success">Goal reached!</span>
                  ) : (
                    <span>{fundingProgress.toFixed(1)}%</span>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* AI Evaluation */}
          <div className="relative overflow-hidden bg-white/40 dark:bg-gray-800/40 rounded-lg mb-3">
            <div className="absolute inset-0 backdrop-blur-lg"></div>
            <div className="relative p-3 z-10">
              <p className="text-lg font-medium mb-1 text-secondary">AI Evaluation</p>
              <p className="text-base text-base-content line-clamp-2">
                {project?.metadata?.aiEvaluation || 'No evaluation available'}
              </p>
            </div>
          </div>
          
          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 mb-2 text-center">
            <div className="relative overflow-hidden bg-primary/30 rounded">
              <div className="absolute inset-0 backdrop-blur-lg"></div>
              <div className="relative p-2 z-10">
                <div className="text-base text-primary font-medium">Score</div>
                <div className="font-bold text-lg text-base-content">
                  {project?.metadata?.marketScore ?? 0}/10
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden bg-secondary/30 rounded">
              <div className="absolute inset-0 backdrop-blur-lg"></div>
              <div className="relative p-2 z-10">
                <div className="text-base text-secondary font-medium">Tech</div>
                <div className="font-bold text-lg text-base-content">
                  {project?.metadata?.techFeasibility || 'N/A'}
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden bg-accent/30 rounded">
              <div className="absolute inset-0 backdrop-blur-lg"></div>
              <div className="relative p-2 z-10">
                <div className="text-base text-accent font-medium">Value</div>
                <div className="font-bold text-lg text-base-content">
                  ${((project?.metadata?.maxValuation ?? 0) / 1000).toFixed(1)}K
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}; 