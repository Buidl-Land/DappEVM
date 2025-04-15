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
              🚀 BuidlLand
            </h1>
          </div>
          <p className="mb-6 text-xl italic text-base-content/80 dark:text-gray-300">
            Build with AI, Grow with Community, Tokenize with DAO
          </p>
          <div className="mx-auto w-24 h-1 bg-gradient-to-r rounded-full from-primary to-secondary"></div>
        </div>

        {/* Main Content Area */}
        <div className="mx-auto max-w-4xl prose prose-lg dark:prose-invert">
          <div className="p-8 mb-12 rounded-xl shadow-xl backdrop-blur-sm transition-all transform bg-white/80 dark:bg-gray-800/80 hover:shadow-2xl">
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

            <div className="p-8 rounded-xl backdrop-blur-sm bg-white/70 dark:bg-gray-800/70">
              <h3 className="mb-4 text-2xl font-semibold text-base-content">Vision and Core Values</h3>
              <p className="mb-4">
                IdeaPulse is committed to breaking the centralized monopoly of traditional VCs, exploring new paths for innovative
                projects through community-driven, fully transparent processes. We&apos;re building a &quot;Product Hunt+DAO&quot; model where:
              </p>
              <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2">
                <div className="p-4 rounded-lg shadow-md backdrop-blur-sm transition-all bg-base-100/90 dark:bg-gray-700/90 hover:shadow-lg">
                  <h4 className="flex items-center mb-2 font-bold">
                    <span className="mr-2 material-icons text-primary">people</span>
                    Co-creating an Equal Community
                  </h4>
                  <p className="text-sm">Anyone can participate equally in project building, with trusted AI Agents distributing rewards based on contributions</p>
                </div>
                <div className="p-4 rounded-lg shadow-md backdrop-blur-sm transition-all bg-base-100/90 dark:bg-gray-700/90 hover:shadow-lg">
                  <h4 className="flex items-center mb-2 font-bold">
                    <span className="mr-2 material-icons text-primary">account_balance</span>
                    Blockchain Ecosystem Support
                  </h4>
                  <p className="text-sm">Projects in different blockchain ecosystems increase transaction volume and bring innovation</p>
                </div>
                <div className="p-4 rounded-lg shadow-md backdrop-blur-sm transition-all bg-base-100/90 dark:bg-gray-700/90 hover:shadow-lg">
                  <h4 className="flex items-center mb-2 font-bold">
                    <span className="mr-2 material-icons text-primary">smart_toy</span>
                    Customized Agent Services
                  </h4>
                  <p className="text-sm">Different AI Agents for each public chain provide tailored solutions</p>
                </div>
                <div className="p-4 rounded-lg shadow-md backdrop-blur-sm transition-all bg-base-100/90 dark:bg-gray-700/90 hover:shadow-lg">
                  <h4 className="flex items-center mb-2 font-bold">
                    <span className="mr-2 material-icons text-primary">workspace_premium</span>
                    Work Paradigm Innovation
                  </h4>
                  <p className="text-sm">A revolutionary DAO allowing participants to maximize value in projects they&apos;re passionate about</p>
                </div>
              </div>

              <h3 className="mb-4 text-2xl font-semibold text-base-content">Core Project Objectives</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="mt-1 mr-3 material-icons text-secondary">check_circle</span>
                  <div>
                    <strong>Social Creative Entry Point</strong>: Submit ideas by @AI Agent (Farcaster/Twitter), with AI generating structured proposals
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="mt-1 mr-3 material-icons text-secondary">check_circle</span>
                  <div>
                    <strong>Dynamic Staking Crowdfunding</strong>: Stake project tokens to join development, unlock stakes after task completion
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="mt-1 mr-3 material-icons text-secondary">check_circle</span>
                  <div>
                    <strong>Project Token Economic Design</strong>: AI Agent reserves 15-30% of tokens for ecosystem building
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="mt-1 mr-3 material-icons text-secondary">check_circle</span>
                  <div>
                    <strong>Pre-issuance Token Crowdfunding</strong>: Fund projects at the no-product stage through AI-generated prototypes
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="mt-1 mr-3 material-icons text-secondary">check_circle</span>
                  <div>
                    <strong>AI+Community Co-governance</strong>: Token holders and AI Agents jointly participate in voting decisions
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="mt-1 mr-3 material-icons text-secondary">check_circle</span>
                  <div>
                    <strong>Anti-VC Centralization Design</strong>: Ensuring open and transparent decision-making processes
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="mt-1 mr-3 material-icons text-secondary">check_circle</span>
                  <div>
                    <strong>SocialFi Integration</strong>: Building a vibrant community through social media channels
                  </div>
                </div>
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
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/70 dark:bg-gray-800/70">
                <div className="flex items-center mb-3">
                  <div className="flex justify-center items-center mr-3 w-8 h-8 font-bold text-white rounded-full bg-primary">1</div>
                  <h3 className="text-xl font-bold text-base-content">Preventing Post-Token Issuance Stagnation</h3>
                </div>
                <ul className="pl-6 space-y-2 text-sm list-disc">
                  <li>Dynamic staking mechanism ensures continuous development</li>
                  <li>Pre-issuance token crowdfunding with clear fund usage</li>
                  <li>AI+Community co-governance maintains development momentum</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/70 dark:bg-gray-800/70">
                <div className="flex items-center mb-3">
                  <div className="flex justify-center items-center mr-3 w-8 h-8 font-bold text-white rounded-full bg-primary">2</div>
                  <h3 className="text-xl font-bold text-base-content">Increasing Participation Opportunities</h3>
                </div>
                <ul className="pl-6 space-y-2 text-sm list-disc">
                  <li>Low barrier idea submission through AI agents</li>
                  <li>Task staking mechanism for deep community involvement</li>
                  <li>Economic incentives for active governance participants</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/70 dark:bg-gray-800/70">
                <div className="flex items-center mb-3">
                  <div className="flex justify-center items-center mr-3 w-8 h-8 font-bold text-white rounded-full bg-primary">3</div>
                  <h3 className="text-xl font-bold text-base-content">Empowering Communities Through Tokens</h3>
                </div>
                <ul className="pl-6 space-y-2 text-sm list-disc">
                  <li>Multi-level token ecosystem with governance rights</li>
                  <li>Token reservation for long-term ecosystem building</li>
                  <li>SocialFi integration enhancing community engagement</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/70 dark:bg-gray-800/70">
                <div className="flex items-center mb-3">
                  <div className="flex justify-center items-center mr-3 w-8 h-8 font-bold text-white rounded-full bg-primary">4</div>
                  <h3 className="text-xl font-bold text-base-content">Solving Centralization and Transparency Issues</h3>
                </div>
                <ul className="pl-6 space-y-2 text-sm list-disc">
                  <li>Open fund allocation and governance processes</li>
                  <li>AI-assisted decision-making enhancing decentralization</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/70 dark:bg-gray-800/70">
                <div className="flex items-center mb-3">
                  <div className="flex justify-center items-center mr-3 w-8 h-8 font-bold text-white rounded-full bg-primary">5</div>
                  <h3 className="text-xl font-bold text-base-content">Lowering Entry Barriers for New Projects</h3>
                </div>
                <ul className="pl-6 space-y-2 text-sm list-disc">
                  <li>Support for projects at the idea stage</li>
                  <li>Token staking system for development funding</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/70 dark:bg-gray-800/70">
                <div className="flex items-center mb-3">
                  <div className="flex justify-center items-center mr-3 w-8 h-8 font-bold text-white rounded-full bg-primary">6</div>
                  <h3 className="text-xl font-bold text-base-content">Improving Project Management Efficiency</h3>
                </div>
                <ul className="pl-6 space-y-2 text-sm list-disc">
                  <li>AI for idea generation, proposal structuring, and task auditing</li>
                  <li>Automated qualification verification and milestone tracking</li>
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

            <div className="p-6 mb-8 rounded-xl shadow-xl backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
              <div className="flex justify-center">
                <Image
                  src={resolvedTheme === 'dark'
                    ? "https://www.mermaidchart.com/raw/937f4abc-fd01-4ca4-9bbc-e1d9ae619597?theme=dark&version=v0.1&format=svg"
                    : "https://www.mermaidchart.com/raw/fa1e92a8-4188-4d36-a8a3-fb42acf5345d?theme=light&version=v0.1&format=svg"
                  }
                  alt="Project Workflow Diagram"
                  width={1200}
                  height={800}
                  className="w-full max-w-4xl rounded-lg shadow-md transition-all hover:shadow-lg"
                />
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
              <div className="p-6 rounded-xl border-l-4 backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-primary">
                <h3 className="mb-4 text-2xl font-semibold text-base-content">Phase 1: AI Collaborative Creation</h3>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg shadow-md backdrop-blur-sm bg-base-100/90 dark:bg-gray-700/90">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-primary">smart_toy</span>
                      M1: AI Core Protocol
                    </h4>
                    <ul className="pl-6 space-y-1 text-sm list-disc">
                      <li>Natural language processing for project proposal generation</li>
                      <li>Technical solution feasibility analysis</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg shadow-md backdrop-blur-sm bg-base-100/90 dark:bg-gray-700/90">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-primary">savings</span>
                      M2: Dynamic Staking Crowdfunding
                    </h4>
                    <ul className="pl-6 space-y-1 text-sm list-disc">
                      <li>Project token fundraising</li>
                      <li>Smart contract fund locking</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg shadow-md backdrop-blur-sm bg-base-100/90 dark:bg-gray-700/90">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-primary">shopping_cart</span>
                      M3: Task Market 1.0
                    </h4>
                    <ul className="pl-6 space-y-1 text-sm list-disc">
                      <li>Automated task publishing</li>
                      <li>Tokenized reward distribution</li>
                      <li>Social media bot integration</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="p-6 rounded-xl border-l-4 backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-secondary">
                <h3 className="mb-4 text-2xl font-semibold text-base-content">Phase 2: Community Governance</h3>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg shadow-md backdrop-blur-sm bg-base-100/90 dark:bg-gray-700/90">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-secondary">forum</span>
                      M4: Decentralized Forum
                    </h4>
                    <ul className="pl-6 space-y-1 text-sm list-disc">
                      <li>Proposal discussion protocols</li>
                      <li>Agent participation in discussions</li>
                      <li>Snapshot voting integration</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg shadow-md backdrop-blur-sm bg-base-100/90 dark:bg-gray-700/90">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-secondary">settings</span>
                      M5: Project Self-governance Protocol
                    </h4>
                    <ul className="pl-6 space-y-1 text-sm list-disc">
                      <li>Independent AI Agents for each project</li>
                      <li>Agent management dashboard</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg shadow-md backdrop-blur-sm bg-base-100/90 dark:bg-gray-700/90">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-secondary">how_to_vote</span>
                      M6: Governance Mechanism 1.0
                    </h4>
                    <ul className="pl-6 space-y-1 text-sm list-disc">
                      <li>Task qualification review</li>
                      <li>Dynamic staking voting</li>
                      <li>Anti-fraud detection</li>
                      <li>Basic reputation system</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="p-6 rounded-xl border-l-4 backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-primary">
                <h3 className="mb-4 text-2xl font-semibold text-base-content">Phase 3: Token Economy Deepening</h3>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg shadow-md backdrop-blur-sm bg-base-100/90 dark:bg-gray-700/90">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-primary">trending_up</span>
                      M7: Proposal-Driven Development
                    </h4>
                    <ul className="pl-6 space-y-1 text-sm list-disc">
                      <li>Community proposals → automated tasks</li>
                      <li>Dual-token staking pools</li>
                      <li>Customized reward distribution</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg shadow-md backdrop-blur-sm bg-base-100/90 dark:bg-gray-700/90">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-primary">currency_exchange</span>
                      M8: Token Economic Model
                    </h4>
                    <ul className="pl-6 space-y-1 text-sm list-disc">
                      <li>Yield aggregators</li>
                      <li>Cross-project token swap protocols</li>
                      <li>Token leverage staking</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg shadow-md backdrop-blur-sm bg-base-100/90 dark:bg-gray-700/90">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-primary">share</span>
                      M9: SocialFi Integration
                    </h4>
                    <ul className="pl-6 space-y-1 text-sm list-disc">
                      <li>Social media progress synchronization</li>
                      <li>Governance data visualization</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Phase 4 */}
              <div className="p-6 rounded-xl border-l-4 backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-secondary">
                <h3 className="mb-4 text-2xl font-semibold text-base-content">Phase 4: Ecosystem Optimization</h3>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg shadow-md backdrop-blur-sm bg-base-100/90 dark:bg-gray-700/90">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-secondary">hub</span>
                      M10: Multi-chain Collaboration Protocol
                    </h4>
                    <ul className="pl-6 space-y-1 text-sm list-disc">
                      <li>Cross-chain communication via LayerZero</li>
                      <li>Multi-chain collaborative development</li>
                      <li>Cross-chain token exchange gateway</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg shadow-md backdrop-blur-sm bg-base-100/90 dark:bg-gray-700/90">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-secondary">gavel</span>
                      M11: Governance Mechanism 2.0
                    </h4>
                    <ul className="pl-6 space-y-1 text-sm list-disc">
                      <li>AI+Community dual voting</li>
                      <li>Reputation-weighted system with POAP integration</li>
                      <li>Governance-development automation</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg shadow-md backdrop-blur-sm bg-base-100/90 dark:bg-gray-700/90">
                    <h4 className="flex items-center mb-2 font-bold">
                      <span className="mr-2 material-icons text-secondary">auto_graph</span>
                      M12: Ecosystem Optimization
                    </h4>
                    <ul className="pl-6 space-y-1 text-sm list-disc">
                      <li>AI effect evaluation</li>
                      <li>Multi-language promotion generator</li>
                      <li>On-chain ecosystem auditing</li>
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