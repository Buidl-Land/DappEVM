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
      <div className="absolute inset-0 z-0 opacity-10 overflow-hidden">
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
      
      <div className="container mx-auto px-6 pt-24 pb-16 max-w-5xl relative z-10">
        {/* Page Title Section */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-block p-2 px-4 mb-4 bg-primary/10 rounded-full backdrop-blur-sm">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              🚀 Buidl Land
            </h1>
          </div>
          <p className="text-xl italic mb-6 text-base-content/80 dark:text-gray-300">
            A Utopia Co-created by Humans and AI!
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
        </div>

        {/* Main Content Area */}
        <div className="prose prose-lg dark:prose-invert mx-auto max-w-4xl">
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl backdrop-blur-sm">
            <p className="text-lg leading-relaxed">
              We are not just building a platform; we are igniting a revolution! Buidl Land will become a digital city-state brimming with passion and creativity, where human ingenuity and AI merge in unprecedented ways to jointly nurture and build truly valuable, meaningful, and world-changing Web3 projects and communities!
            </p>
          </div>

          {/* Project Overview Section */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <div className="h-10 w-2 bg-primary rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-base-content">📋 Project Overview</h2>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-4 text-base-content">Vision and Core Values</h3>
              <p className="mb-4">
                Farewell to cold capital games, embrace the fiery era of co-creation! Forget the old models dominated by a few VCs, lacking soul! In Buidl Land, we firmly believe:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg shadow-md hover:shadow-lg transition-all backdrop-blur-sm">
                  <h4 className="font-bold mb-2 flex items-center">
                    <span className="material-icons text-primary mr-2">people</span>
                    Every Brilliant Idea Deserves to be Seen
                  </h4>
                  <p className="text-sm">No matter who you are, if you have a world-changing idea, this is your stage. AI will help you turn your ideas into reality.</p>
                </div>
                <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg shadow-md hover:shadow-lg transition-all backdrop-blur-sm">
                  <h4 className="font-bold mb-2 flex items-center">
                    <span className="material-icons text-primary mr-2">account_balance</span>
                    Every Effective Contribution Must be Respected
                  </h4>
                  <p className="text-sm">We will use the fairest, most transparent mechanisms (objectively assessed by AI) to ensure your talent and effort receive the substantial rewards they deserve.</p>
                </div>
                <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg shadow-md hover:shadow-lg transition-all backdrop-blur-sm">
                  <h4 className="font-bold mb-2 flex items-center">
                    <span className="material-icons text-primary mr-2">smart_toy</span>
                    AI is a Partner Fighting Side-by-Side
                  </h4>
                  <p className="text-sm">AI will deeply empower every stage of a project – from ideation, incubation, development, collaboration, to even community governance.</p>
                </div>
                <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg shadow-md hover:shadow-lg transition-all backdrop-blur-sm">
                  <h4 className="font-bold mb-2 flex items-center">
                    <span className="material-icons text-primary mr-2">workspace_premium</span>
                    Community-Driven Innovation
                  </h4>
                  <p className="text-sm">Power truly returns to the community, guided by collective wisdom, completely breaking free from centralized VC control.</p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-base-content">Core Mission</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="material-icons text-secondary mr-3 mt-1">check_circle</span>
                  <div>
                    <strong>Unleash Creative Power</strong>: Build a zero-barrier, high-efficiency idea submission and incubation engine. Submit ideas simply by @ mentioning an AI Agent on social media.
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="material-icons text-secondary mr-3 mt-1">check_circle</span>
                  <div>
                    <strong>Reshape the Collaboration Paradigm</strong>: Establish a trustless, contribution-first collaboration network through dynamic staking and AI audits.
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="material-icons text-secondary mr-3 mt-1">check_circle</span>
                  <div>
                    <strong>Define Value Distribution</strong>: Design a fair, just, and incentive-driven tokenomics system with real governance rights.
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="material-icons text-secondary mr-3 mt-1">check_circle</span>
                  <div>
                    <strong>Empower Community Autonomy</strong>: Construct an AI-enhanced, community-led governance framework.
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="material-icons text-secondary mr-3 mt-1">check_circle</span>
                  <div>
                    <strong>Integrate Social Power</strong>: Leverage Web3 social to ignite community passion and amplify influence.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Core Problems Solved Section */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <div className="h-10 w-2 bg-secondary rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-base-content">🔍 Core Problems Solved</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">1</div>
                  <h3 className="text-xl font-bold text-base-content">Web3 Bubble & Trust Crisis</h3>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Dynamic staking mechanism ensures long-term responsibility</li>
                  <li>AI+DAO co-governance eliminates rug pull risks</li>
                  <li>Transparent on-chain fund management</li>
                </ul>
              </div>
              
              <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">2</div>
                  <h3 className="text-xl font-bold text-base-content">Innovation Monopolization</h3>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Zero-barrier socialized idea entry</li>
                  <li>AI-assisted merit-based evaluation</li>
                  <li>Permissionless task contribution system</li>
                </ul>
              </div>
              
              <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">3</div>
                  <h3 className="text-xl font-bold text-base-content">Token Utility Issues</h3>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Strong utility, multi-layered tokenomics</li>
                  <li>Real governance and economic rights</li>
                  <li>AI-supervised fair distribution</li>
                </ul>
              </div>
              
              <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">4</div>
                  <h3 className="text-xl font-bold text-base-content">Inefficient Collaboration</h3>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-sm">
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
              <div className="h-10 w-2 bg-primary rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-base-content">🔄 Project Flowchart</h2>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-xl p-6 mb-8 backdrop-blur-sm">
              <div className="flex justify-center">
                <Image 
                  src={resolvedTheme === 'dark' 
                    ? "https://www.mermaidchart.com/raw/4093c944-d4d2-498f-9ec3-6accea17cd2b?theme=dark&version=v0.1&format=svg"
                    : "https://www.mermaidchart.com/raw/e53ac5f9-bc97-40f9-b764-b0253184266b?theme=light&version=v0.1&format=svg"
                  }
                  alt="Project Workflow Diagram" 
                  width={1200}
                  height={800}
                  className="w-full max-w-4xl rounded-lg shadow-md hover:shadow-lg transition-all"
                />
              </div>

              <div className="mt-8 space-y-6">
                <h3 className="text-2xl font-semibold mb-4">Core Features of the Flowchart</h3>
                
                <div className="space-y-4">
                  <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 flex items-center">
                      <span className="material-icons text-primary mr-2">lightbulb</span>
                      Diverse Idea Sources
                    </h4>
                    <p className="text-sm">Users can quickly submit ideas via @ Agent or engage in deep brainstorming with the Agent and publish more mature ideas via MCP.</p>
                  </div>

                  <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 flex items-center">
                      <span className="material-icons text-primary mr-2">account_balance</span>
                      Agent-Driven Crowdfunding
                    </h4>
                    <p className="text-sm">The AI Agent evaluates ideas and assists project teams in pre-issuing project tokens to crowdfund necessary stablecoins.</p>
                  </div>

                  <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 flex items-center">
                      <span className="material-icons text-primary mr-2">assignment</span>
                      Dual-Track Task Proposals
                    </h4>
                    <p className="text-sm">Both the Agent and community members can initiate task proposals, fostering project development and collective brainstorming.</p>
                  </div>

                  <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 flex items-center">
                      <span className="material-icons text-primary mr-2">groups</span>
                      Collaborative Task Completion
                    </h4>
                    <p className="text-sm">Multiple contributors can stake tokens together to participate in a single task, pooling resources for accelerated completion.</p>
                  </div>

                  <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 flex items-center">
                      <span className="material-icons text-primary mr-2">balance</span>
                      AI Fair Reward Distribution
                    </h4>
                    <p className="text-sm">Upon task completion, the AI Agent objectively calculates and distributes rewards based on contribution data, releasing staked tokens.</p>
                  </div>

                  <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 flex items-center">
                      <span className="material-icons text-primary mr-2">security</span>
                      Community-Based Risk Handling
                    </h4>
                    <p className="text-sm">If a task is not completed within the time limit, the community intervenes to decide whether to continue or reopen the task.</p>
                  </div>

                  <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 flex items-center">
                      <span className="material-icons text-primary mr-2">loop</span>
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
              <div className="h-10 w-2 bg-secondary rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-base-content">🔄 Platform Comparisons</h2>
            </div>

            <div className="space-y-8">
              <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-2xl font-semibold mb-4">Comparison with pump.fun</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-error">pump.fun</h4>
                    <p className="text-sm">A platform for quickly launching meme coins, focused on short-term hype with limited utility.</p>
                  </div>
                  <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-success">BuidlLand Advantage</h4>
                    <p className="text-sm">Full lifecycle management for innovative projects, emphasizing real utility and sustainable community-driven development.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-2xl font-semibold mb-4">Comparison with daos.fun</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-error">daos.fun</h4>
                    <p className="text-sm">Focuses on DAO management for meme coin investment, still primarily speculative and narrowly focused.</p>
                  </div>
                  <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-success">BuidlLand Advantage</h4>
                    <p className="text-sm">Supports a broader range of project types, features AI-assisted quality control, and enables deeper community participation structures.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-2xl font-semibold mb-4">Comparison with Traditional Web3 Project Launch</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-error">Traditional Method</h4>
                    <p className="text-sm">Often requires a product/MVP, governance can be centralized, high entry barrier.</p>
                  </div>
                  <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-success">BuidlLand Advantages</h4>
                    <ul className="list-disc pl-4 text-sm space-y-2">
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
              <div className="h-10 w-2 bg-secondary rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-base-content">🛣️ Development Roadmap</h2>
            </div>
            
            <div className="space-y-8">
              {/* Phase 1 */}
              <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm border-l-4 border-primary">
                <h3 className="text-2xl font-semibold mb-4 text-base-content">Phase 1: DAO Governance Foundation</h3>
                <div className="space-y-6">
                  <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg shadow-md backdrop-blur-sm">
                    <h4 className="font-bold mb-2 flex items-center">
                      <span className="material-icons text-primary mr-2">smart_toy</span>
                      Key Tool Development
                    </h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Intelligent Proposal System</li>
                      <li>Community Voting & Decision-Making</li>
                      <li>Task Management Framework</li>
                    </ul>
                  </div>
                  
                  <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg shadow-md backdrop-blur-sm">
                    <h4 className="font-bold mb-2 flex items-center">
                      <span className="material-icons text-primary mr-2">settings</span>
                      Practical Application
                    </h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>First DAO implementation case study</li>
                      <li>Internal governance validation</li>
                      <li>Iterative optimization</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Phase 2 */}
              <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm border-l-4 border-secondary">
                <h3 className="text-2xl font-semibold mb-4 text-base-content">Phase 2: Contribution Economy System</h3>
                <div className="space-y-6">
                  <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg shadow-md backdrop-blur-sm">
                    <h4 className="font-bold mb-2 flex items-center">
                      <span className="material-icons text-secondary mr-2">forum</span>
                      Core Mechanisms
                    </h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Multi-dimensional Assessment System</li>
                      <li>Transparent Reward Distribution</li>
                      <li>Dynamic Incentive Design</li>
                    </ul>
                  </div>
                  
                  <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg shadow-md backdrop-blur-sm">
                    <h4 className="font-bold mb-2 flex items-center">
                      <span className="material-icons text-secondary mr-2">people</span>
                      Community Collaboration
                    </h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Pioneer Web3 community testing</li>
                      <li>Cross-community experiments</li>
                      <li>Joint governance case library</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Phase 3 */}
              <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm border-l-4 border-primary">
                <h3 className="text-2xl font-semibold mb-4 text-base-content">Phase 3: Agent CEO Capability</h3>
                <div className="space-y-6">
                  <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg shadow-md backdrop-blur-sm">
                    <h4 className="font-bold mb-2 flex items-center">
                      <span className="material-icons text-primary mr-2">trending_up</span>
                      Function Development
                    </h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Project Strategic Planning Module</li>
                      <li>Resource Coordination System</li>
                      <li>Community Communication Support</li>
                    </ul>
                  </div>
                  
                  <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg shadow-md backdrop-blur-sm">
                    <h4 className="font-bold mb-2 flex items-center">
                      <span className="material-icons text-primary mr-2">verified</span>
                      Practical Validation
                    </h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Agent governance implementation</li>
                      <li>Collaborative experiments</li>
                      <li>Effectiveness evaluation system</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Phase 4 */}
              <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm border-l-4 border-secondary">
                <h3 className="text-2xl font-semibold mb-4 text-base-content">Phase 4: Ecosystem Expansion</h3>
                <div className="space-y-6">
                  <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg shadow-md backdrop-blur-sm">
                    <h4 className="font-bold mb-2 flex items-center">
                      <span className="material-icons text-secondary mr-2">hub</span>
                      Development Directions
                    </h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Governance Tool Standardization</li>
                      <li>Cross-Community Protocol</li>
                      <li>Adaptive Governance Model</li>
                    </ul>
                  </div>
                  
                  <div className="bg-base-100/90 dark:bg-gray-700/90 p-4 rounded-lg shadow-md backdrop-blur-sm">
                    <h4 className="font-bold mb-2 flex items-center">
                      <span className="material-icons text-secondary mr-2">diversity_3</span>
                      Community Network
                    </h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
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