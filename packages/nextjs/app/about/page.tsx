"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { ParticlesBackground } from "../../components/particles/ParticlesBackground";

const AboutPage = () => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="relative min-h-screen">
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Geometric SVG Background */}
      <div className="overflow-hidden absolute inset-0 z-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagonPattern" width="56" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M28,0 L56,16.6 L56,49.8 L28,66.4 L0,49.8 L0,16.6 Z M28,100 L0,83.4 L0,50.2 L28,33.6 L56,50.2 L56,83.4 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
            <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="var(--color-secondary)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagonPattern)" />
          <rect width="100%" height="100%" fill="url(#glowGradient)" />
        </svg>
      </div>

      <div className="container relative z-10 px-6 pt-24 pb-16 mx-auto max-w-5xl">
        {/* Page Title Section */}
        <div className="mb-16 text-center animate-fadeIn">
          <div className="inline-block p-2 px-4 mb-4 rounded-full backdrop-blur-sm bg-primary/10">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              🚀 Buidl Land
            </h1>
          </div>
          <p className="mb-6 text-xl italic text-base-content/80 dark:text-gray-300">
            A Utopia Co-created by Humans and AI!
          </p>
          <div className="mx-auto w-24 h-1 bg-gradient-to-r rounded-full from-primary to-secondary"></div>
        </div>

        {/* Main Content Area */}
        <div className="mx-auto max-w-4xl prose prose-lg dark:prose-invert">
          <div className="p-8 mb-12 rounded-xl shadow-xl backdrop-blur-sm transition-all transform bg-white/40 dark:bg-gray-800/40 hover:shadow-2xl">
            <p className="text-lg leading-relaxed">
              A Web3 innovation incubation platform based on pre-issuance token crowdfunding and community DAO governance,
              enabling AI and token holders to jointly support project idea incubation, development, and implementation.
            </p>
          </div>

          {/* GAME Framework Section */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <div className="mr-4 w-2 h-10 rounded-full bg-primary"></div>
              <h2 className="text-3xl font-bold text-base-content">🎮 GAME Framework</h2>
            </div>

            <div className="p-8 mb-8 rounded-xl backdrop-blur-sm bg-white/70 dark:bg-gray-800/70">
              <h3 className="mb-4 text-2xl font-semibold text-base-content">Powerful AI Agent Framework</h3>
              <p className="mb-6">
                BuidlLand is powered by the revolutionary GAME framework (Generative Agent Management Engine), which enables AI agents to work autonomously and collaboratively with humans.
              </p>

              <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
                <div className="p-4 rounded-lg shadow-md backdrop-blur-sm transition-all bg-base-100/90 dark:bg-gray-700/90 hover:shadow-lg">
                  <h4 className="flex items-center mb-2 font-bold">
                    <span className="mr-2 material-icons text-primary">psychology</span>
                    Agent (High-level Planner)
                  </h4>
                  <p className="text-sm">Autonomous AI entities that can make strategic decisions, manage resources, and coordinate complex tasks</p>
                </div>
                <div className="p-4 rounded-lg shadow-md backdrop-blur-sm transition-all bg-base-100/90 dark:bg-gray-700/90 hover:shadow-lg">
                  <h4 className="flex items-center mb-2 font-bold">
                    <span className="mr-2 material-icons text-primary">engineering</span>
                    Worker (Low-level Planner)
                  </h4>
                  <p className="text-sm">Specialized AI components that execute specific tasks and provide feedback to the main agent</p>
                </div>
                <div className="p-4 rounded-lg shadow-md backdrop-blur-sm transition-all bg-base-100/90 dark:bg-gray-700/90 hover:shadow-lg">
                  <h4 className="flex items-center mb-2 font-bold">
                    <span className="mr-2 material-icons text-primary">functions</span>
                    Function
                  </h4>
                  <p className="text-sm">Executable actions that agents can perform, with clear inputs, outputs, and error handling</p>
                </div>
              </div>

              <p className="text-sm text-base-content/80">
                The GAME framework enables BuidlLand to create powerful AI agents that can assist in project development, community management, and DAO governance with unprecedented efficiency and transparency.
              </p>
            </div>

          {/* Project Overview Section */}
          <div className="flex items-center mb-6">
              <div className="mr-4 w-2 h-10 rounded-full bg-primary"></div>
              <h2 className="text-3xl font-bold text-base-content">📋 Project Overview</h2>
            </div>

            <div className="p-8 rounded-xl backdrop-blur-sm bg-white/40 dark:bg-gray-800/40">
              <h3 className="mb-4 text-2xl font-semibold text-base-content">Vision and Core Values</h3>
              <p className="mb-4">
                Farewell to cold capital games, embrace the fiery era of co-creation! Forget the old models dominated by a few VCs, lacking soul! In Buidl Land, we firmly believe:
              </p>
              <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2">
                <div className="p-4 rounded-lg shadow-md backdrop-blur-sm transition-all bg-white/20 dark:bg-gray-800/20 hover:shadow-lg">
                  <h4 className="flex items-center mb-2 font-bold">
                    <span className="mr-2 material-icons text-primary">people</span>
                    Every Brilliant Idea Deserves to be Seen
                  </h4>
                  <p className="text-sm">No matter who you are, if you have a world-changing idea, this is your stage. AI will help you turn your ideas into reality.</p>
                </div>
                <div className="p-4 rounded-lg shadow-md backdrop-blur-sm transition-all bg-white/20 dark:bg-gray-800/20 hover:shadow-lg">
                  <h4 className="flex items-center mb-2 font-bold">
                    <span className="mr-2 material-icons text-primary">account_balance</span>
                    Every Effective Contribution Must be Respected
                  </h4>
                  <p className="text-sm">We will use the fairest, most transparent mechanisms (objectively assessed by AI) to ensure your talent and effort receive the substantial rewards they deserve.</p>
                </div>
                <div className="p-4 rounded-lg shadow-md backdrop-blur-sm transition-all bg-white/20 dark:bg-gray-800/20 hover:shadow-lg">
                  <h4 className="flex items-center mb-2 font-bold">
                    <span className="mr-2 material-icons text-primary">smart_toy</span>
                    AI is a Partner Fighting Side-by-Side
                  </h4>
                  <p className="text-sm">AI will deeply empower every stage of a project – from ideation, incubation, development, collaboration, to even community governance.</p>
                </div>
                <div className="p-4 rounded-lg shadow-md backdrop-blur-sm transition-all bg-white/20 dark:bg-gray-800/20 hover:shadow-lg">
                  <h4 className="flex items-center mb-2 font-bold">
                    <span className="mr-2 material-icons text-primary">workspace_premium</span>
                    Community-Driven Innovation
                  </h4>
                  <p className="text-sm">Power truly returns to the community, guided by collective wisdom, completely breaking free from centralized VC control.</p>
                </div>
              </div>

              <h3 className="mb-4 text-2xl font-semibold text-base-content">Core Mission</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="mt-1 mr-3 material-icons text-secondary">check_circle</span>
                  <div>
                    <strong>Unleash Creative Power</strong>: Build a zero-barrier, high-efficiency idea submission and incubation engine. Submit ideas simply by @ mentioning an AI Agent on social media.
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="mt-1 mr-3 material-icons text-secondary">check_circle</span>
                  <div>
                    <strong>Reshape the Collaboration Paradigm</strong>: Establish a trustless, contribution-first collaboration network through dynamic staking and AI audits.
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="mt-1 mr-3 material-icons text-secondary">check_circle</span>
                  <div>
                    <strong>Define Value Distribution</strong>: Design a fair, just, and incentive-driven tokenomics system with real governance rights.
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="mt-1 mr-3 material-icons text-secondary">check_circle</span>
                  <div>
                    <strong>Empower Community Autonomy</strong>: Construct an AI-enhanced, community-led governance framework.
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="mt-1 mr-3 material-icons text-secondary">check_circle</span>
                  <div>
                    <strong>Integrate Social Power</strong>: Leverage Web3 social to ignite community passion and amplify influence.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* GAME Framework Section */}
          <section className="mb-16">
            <div className="flex items-center mb-4">
              <div className="mr-4 w-2 h-10 rounded-full bg-primary"></div>
              <h2 className="text-3xl font-bold text-base-content">🎮 GAME Framework</h2>
            </div>

            <div className="p-6 rounded-xl backdrop-blur-sm bg-white/40 dark:bg-gray-800/40">
              <h3 className="mb-2 text-xl font-semibold text-base-content">Powerful AI Agent Framework</h3>
              <p className="mb-4 text-base">
                BuidlLand is powered by the revolutionary GAME framework (Generative Agent Management Engine),
                which enables AI agents to work autonomously and collaboratively with humans.
              </p>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="p-4 rounded-lg bg-white/20 dark:bg-gray-800/20">
                  <div className="flex items-center mb-2">
                    <span className="mr-2 text-xl material-icons text-primary">psychology</span>
                    <h4 className="text-lg font-bold">Agent (High-level Planner)</h4>
                  </div>
                  <p className="text-sm">
                    Autonomous AI entities that can make strategic decisions, manage resources, and coordinate complex tasks
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/20 dark:bg-gray-800/20">
                  <div className="flex items-center mb-2">
                    <span className="mr-2 text-xl material-icons text-primary">engineering</span>
                    <h4 className="text-lg font-bold">Worker (Low-level Planner)</h4>
                  </div>
                  <p className="text-sm">
                    Specialized AI components that execute specific tasks and provide feedback to the main agent
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/20 dark:bg-gray-800/20">
                  <div className="flex items-center mb-2">
                    <span className="mr-2 text-xl material-icons text-primary">functions</span>
                    <h4 className="text-lg font-bold">Function</h4>
                  </div>
                  <p className="text-sm">
                    Executable actions that agents can perform, with clear inputs, outputs, and error handling
                  </p>
                </div>
              </div>

              <div className="p-4 mt-4 rounded-lg bg-white/20 dark:bg-gray-800/20">
                <p className="text-sm">
                  The GAME framework enables BuidlLand to create powerful AI agents that can assist in project development,
                  community management, and DAO governance with unprecedented efficiency and transparency.
                </p>
              </div>
            </div>
          </section>

          {/* Core Problems Solved Section */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <div className="mr-4 w-2 h-10 rounded-full bg-secondary"></div>
              <h2 className="text-3xl font-bold text-base-content">🔍 Core Problems Solved</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/40 dark:bg-gray-800/40">
                <div className="flex items-center mb-3">
                  <div className="flex justify-center items-center mr-3 w-8 h-8 font-bold text-white rounded-full bg-primary">1</div>
                  <h3 className="text-xl font-bold text-base-content">Web3 Bubble & Trust Crisis</h3>
                </div>
                <ul className="pl-6 space-y-2 text-sm list-disc">
                  <li>Dynamic staking mechanism ensures long-term responsibility</li>
                  <li>AI+DAO co-governance eliminates rug pull risks</li>
                  <li>Transparent on-chain fund management</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/40 dark:bg-gray-800/40">
                <div className="flex items-center mb-3">
                  <div className="flex justify-center items-center mr-3 w-8 h-8 font-bold text-white rounded-full bg-primary">2</div>
                  <h3 className="text-xl font-bold text-base-content">Innovation Monopolization</h3>
                </div>
                <ul className="pl-6 space-y-2 text-sm list-disc">
                  <li>Zero-barrier socialized idea entry</li>
                  <li>AI-assisted merit-based evaluation</li>
                  <li>Permissionless task contribution system</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/40 dark:bg-gray-800/40">
                <div className="flex items-center mb-3">
                  <div className="flex justify-center items-center mr-3 w-8 h-8 font-bold text-white rounded-full bg-primary">3</div>
                  <h3 className="text-xl font-bold text-base-content">Token Utility Issues</h3>
                </div>
                <ul className="pl-6 space-y-2 text-sm list-disc">
                  <li>Strong utility, multi-layered tokenomics</li>
                  <li>Real governance and economic rights</li>
                  <li>AI-supervised fair distribution</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/40 dark:bg-gray-800/40">
                <div className="flex items-center mb-3">
                  <div className="flex justify-center items-center mr-3 w-8 h-8 font-bold text-white rounded-full bg-primary">4</div>
                  <h3 className="text-xl font-bold text-base-content">Inefficient Collaboration</h3>
                </div>
                <ul className="pl-6 space-y-2 text-sm list-disc">
                  <li>Trustless collaboration foundation</li>
                  <li>AI-empowered project management</li>
                  <li>Automated human-AI synergy</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Project Flowchart Section */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <div className="mr-4 w-2 h-10 rounded-full bg-primary"></div>
              <h2 className="text-3xl font-bold text-base-content">🔄 Project Flowchart</h2>
            </div>

            <div className="p-6 mb-8 rounded-xl shadow-xl backdrop-blur-sm bg-white/40 dark:bg-gray-800/40">
              <div className="flex justify-center">
                <Image
                  src={resolvedTheme === 'dark'
                    ? "https://www.mermaidchart.com/raw/4093c944-d4d2-498f-9ec3-6accea17cd2b?theme=dark&version=v0.1&format=svg"
                    : "https://www.mermaidchart.com/raw/e53ac5f9-bc97-40f9-b764-b0253184266b?theme=light&version=v0.1&format=svg"
                  }
                  alt="Project Workflow Diagram"
                  width={1200}
                  height={800}
                  className="w-full max-w-4xl rounded-lg shadow-md transition-all hover:shadow-lg"
                />
              </div>

              <div className="mt-8 space-y-6">
                <h3 className="mb-4 text-2xl font-semibold">Core Features of the Flowchart</h3>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/20 dark:bg-gray-800/20">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-primary">lightbulb</span>
                      Diverse Idea Sources
                    </h4>
                    <p className="text-sm">Users can quickly submit ideas via @ Agent or engage in deep brainstorming with the Agent and publish more mature ideas via MCP.</p>
                  </div>

                  <div className="p-4 rounded-lg bg-white/20 dark:bg-gray-800/20">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-primary">account_balance</span>
                      Agent-Driven Crowdfunding
                    </h4>
                    <p className="text-sm">The AI Agent evaluates ideas and assists project teams in pre-issuing project tokens to crowdfund necessary stablecoins.</p>
                  </div>

                  <div className="p-4 rounded-lg bg-white/20 dark:bg-gray-800/20">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-primary">assignment</span>
                      Dual-Track Task Proposals
                    </h4>
                    <p className="text-sm">Both the Agent and community members can initiate task proposals, fostering project development and collective brainstorming.</p>
                  </div>

                  <div className="p-4 rounded-lg bg-white/20 dark:bg-gray-800/20">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-primary">groups</span>
                      Collaborative Task Completion
                    </h4>
                    <p className="text-sm">Multiple contributors can stake tokens together to participate in a single task, pooling resources for accelerated completion.</p>
                  </div>

                  <div className="p-4 rounded-lg bg-white/20 dark:bg-gray-800/20">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-primary">balance</span>
                      AI Fair Reward Distribution
                    </h4>
                    <p className="text-sm">Upon task completion, the AI Agent objectively calculates and distributes rewards based on contribution data, releasing staked tokens.</p>
                  </div>

                  <div className="p-4 rounded-lg bg-white/20 dark:bg-gray-800/20">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-primary">security</span>
                      Community-Based Risk Handling
                    </h4>
                    <p className="text-sm">If a task is not completed within the time limit, the community intervenes to decide whether to continue or reopen the task.</p>
                  </div>

                  <div className="p-4 rounded-lg bg-white/20 dark:bg-gray-800/20">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-primary">loop</span>
                      Continuous Optimization Loop
                    </h4>
                    <p className="text-sm">The platform interacts with users via SocialFi channels to gather feedback, continuously optimizing Agent capabilities and governance models.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Platform Comparison Section */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <div className="mr-4 w-2 h-10 rounded-full bg-secondary"></div>
              <h2 className="text-3xl font-bold text-base-content">🔄 Platform Comparisons</h2>
            </div>

            <div className="space-y-8">
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/40 dark:bg-gray-800/40">
                <h3 className="mb-4 text-2xl font-semibold">Comparison with pump.fun</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-white/20 dark:bg-gray-800/20">
                    <h4 className="mb-2 font-bold text-error">pump.fun</h4>
                    <p className="text-sm">A platform for quickly launching meme coins, focused on short-term hype with limited utility.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/20 dark:bg-gray-800/20">
                    <h4 className="mb-2 font-bold text-success">BuidlLand Advantage</h4>
                    <p className="text-sm">Full lifecycle management for innovative projects, emphasizing real utility and sustainable community-driven development.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/40 dark:bg-gray-800/40">
                <h3 className="mb-4 text-2xl font-semibold">Comparison with daos.fun</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-white/20 dark:bg-gray-800/20">
                    <h4 className="mb-2 font-bold text-error">daos.fun</h4>
                    <p className="text-sm">Focuses on DAO management for meme coin investment, still primarily speculative and narrowly focused.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/20 dark:bg-gray-800/20">
                    <h4 className="mb-2 font-bold text-success">BuidlLand Advantage</h4>
                    <p className="text-sm">Supports a broader range of project types, features AI-assisted quality control, and enables deeper community participation structures.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/40 dark:bg-gray-800/40">
                <h3 className="mb-4 text-2xl font-semibold">Comparison with Traditional Web3 Project Launch</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-white/20 dark:bg-gray-800/20">
                    <h4 className="mb-2 font-bold text-error">Traditional Method</h4>
                    <p className="text-sm">Often requires a product/MVP, governance can be centralized, high entry barrier.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/20 dark:bg-gray-800/20">
                    <h4 className="mb-2 font-bold text-success">BuidlLand Advantages</h4>
                    <ul className="pl-4 space-y-2 text-sm list-disc">
                      <li>Decentralized governance with transparent decision-making</li>
                      <li>Low entry barrier, supporting projects from the idea stage</li>
                      <li>AI-enhanced project management efficiency</li>
                      <li>Dynamic staking mechanism prevents development stagnation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Development Roadmap Section */}
          <section>
            <div className="flex items-center mb-6">
              <div className="mr-4 w-2 h-10 rounded-full bg-secondary"></div>
              <h2 className="text-3xl font-bold text-base-content">🛣️ Development Roadmap</h2>
            </div>

            <div className="space-y-8">
              {/* Phase 1 */}
              <div className="p-6 rounded-xl border-l-4 backdrop-blur-sm bg-white/40 dark:bg-gray-800/40 border-primary">
                <h3 className="mb-4 text-2xl font-semibold text-base-content">Phase 1: DAO Governance Foundation</h3>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg shadow-md backdrop-blur-sm bg-white/20 dark:bg-gray-800/20">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-primary">smart_toy</span>
                      Key Tool Development
                    </h4>
                    <ul className="pl-6 space-y-1 text-sm list-disc">
                      <li>Intelligent Proposal System</li>
                      <li>Community Voting & Decision-Making</li>
                      <li>Task Management Framework</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg shadow-md backdrop-blur-sm bg-white/20 dark:bg-gray-800/20">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-primary">settings</span>
                      Practical Application
                    </h4>
                    <ul className="pl-6 space-y-1 text-sm list-disc">
                      <li>First DAO implementation case study</li>
                      <li>Internal governance validation</li>
                      <li>Iterative optimization</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="p-6 rounded-xl border-l-4 backdrop-blur-sm bg-white/40 dark:bg-gray-800/40 border-secondary">
                <h3 className="mb-4 text-2xl font-semibold text-base-content">Phase 2: Contribution Economy System</h3>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg shadow-md backdrop-blur-sm bg-white/20 dark:bg-gray-800/20">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-secondary">forum</span>
                      Core Mechanisms
                    </h4>
                    <ul className="pl-6 space-y-1 text-sm list-disc">
                      <li>Multi-dimensional Assessment System</li>
                      <li>Transparent Reward Distribution</li>
                      <li>Dynamic Incentive Design</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg shadow-md backdrop-blur-sm bg-white/20 dark:bg-gray-800/20">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-secondary">people</span>
                      Community Collaboration
                    </h4>
                    <ul className="pl-6 space-y-1 text-sm list-disc">
                      <li>Pioneer Web3 community testing</li>
                      <li>Cross-community experiments</li>
                      <li>Joint governance case library</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="p-6 rounded-xl border-l-4 backdrop-blur-sm bg-white/40 dark:bg-gray-800/40 border-primary">
                <h3 className="mb-4 text-2xl font-semibold text-base-content">Phase 3: Agent CEO Capability</h3>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg shadow-md backdrop-blur-sm bg-white/20 dark:bg-gray-800/20">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-primary">trending_up</span>
                      Function Development
                    </h4>
                    <ul className="pl-6 space-y-1 text-sm list-disc">
                      <li>Project Strategic Planning Module</li>
                      <li>Resource Coordination System</li>
                      <li>Community Communication Support</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg shadow-md backdrop-blur-sm bg-white/20 dark:bg-gray-800/20">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-primary">verified</span>
                      Practical Validation
                    </h4>
                    <ul className="pl-6 space-y-1 text-sm list-disc">
                      <li>Agent governance implementation</li>
                      <li>Collaborative experiments</li>
                      <li>Effectiveness evaluation system</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Phase 4 */}
              <div className="p-6 rounded-xl border-l-4 backdrop-blur-sm bg-white/40 dark:bg-gray-800/40 border-secondary">
                <h3 className="mb-4 text-2xl font-semibold text-base-content">Phase 4: Ecosystem Expansion</h3>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg shadow-md backdrop-blur-sm bg-white/20 dark:bg-gray-800/20">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-secondary">hub</span>
                      Development Directions
                    </h4>
                    <ul className="pl-6 space-y-1 text-sm list-disc">
                      <li>Governance Tool Standardization</li>
                      <li>Cross-Community Protocol</li>
                      <li>Adaptive Governance Model</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg shadow-md backdrop-blur-sm bg-white/20 dark:bg-gray-800/20">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-secondary">diversity_3</span>
                      Community Network
                    </h4>
                    <ul className="pl-6 space-y-1 text-sm list-disc">
                      <li>Buidl Land Governance Alliance</li>
                      <li>Joint governance hackathons</li>
                      <li>Best practice guidelines</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;