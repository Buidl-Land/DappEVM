"use client";

import Spline from '@splinetool/react-spline/next';
import Link from 'next/link';
import { FaRocket, FaGithub, FaDiscord, FaTwitter } from 'react-icons/fa';

export default function Home() {
  return (
    <main className="relative h-screen overflow-hidden">
      {/* 3D Scene */}
      <Spline
        scene="https://prod.spline.design/3Mmw0JuEwoYukIDE/scene.splinecode"
        className="relative z-0"
      />
      
      {/* Center Content */}
      <div className="absolute top-[30%] left-[5%] transform -translate-y-0 text-white z-10 w-full max-w-5xl px-4 pointer-events-none">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <h1 className="text-7xl md:text-9xl font-bold mb-12 md:mb-0 text-white leading-none">
            <div className="mb-[-0.2em]">A&nbsp;&nbsp;Web3&nbsp;&nbsp;Utopia</div>
            <div className="mb-[-0.2em]">
              <span className="text-indigo-500">Co-created</span>&nbsp;&nbsp;by
            </div>
            <div>Humans&nbsp;&nbsp;and&nbsp;&nbsp;AI</div>
          </h1>
        </div>
        
        <div className="flex mt-2 md:mt-4 mb-8">
          <div className="flex items-center w-full">
            <p className="text-4xl md:text-5xl font-semibold text-indigo-300 tracking-wider drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)] ml-2">
              Where We Buidl the Future
            </p>
            
            <Link 
              href="/projects" 
              className="group relative flex flex-row items-center justify-between ml-4 px-6 py-2 rounded-xl bg-gradient-to-r from-transparent from-5% via-transparent via-20% via-indigo-400/20 via-40% via-indigo-500/30 via-60% to-indigo-600/50 text-white transform hover:translate-x-2 transition-all duration-300 border-r border-t border-b border-white/10 flex-grow flex-shrink-0 overflow-hidden pointer-events-auto"
            >
              <div className="absolute top-0 bottom-0 left-0 w-0 group-hover:w-full rounded-xl bg-gradient-to-r from-indigo-400/15 via-indigo-500/25 to-indigo-600/35 transition-[width] duration-700 ease-in-out"></div>
              
              <div className="relative transition-transform duration-700 ease-in-out group-hover:translate-x-[1050%] z-10">
                <FaRocket className="w-8 h-8 text-indigo-300 relative z-10" />
              </div>
              <span className="text-3xl md:text-4xl font-semibold relative z-10 transition-transform duration-700 ease-in-out group-hover:-translate-x-24">Join the Revolution</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Feature Cards */}
      <div className="absolute top-[74%] left-[5%] transform -translate-y-0 z-10 w-full max-w-5xl px-4 pointer-events-none">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="p-6 rounded-xl backdrop-blur-sm bg-white/25 border border-white/30 text-white hover:bg-white/50 transition-colors pointer-events-auto">
            <div className="flex items-center mb-3">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-400">AI Supercharged</h3>
            </div>
            <p className="text-lg md:text-xl text-[#4B5563] leading-relaxed">
              Harness AI power to transform ideas into structured proposals and ignite crowdfunding
            </p>
          </div>
          
          <div className="p-6 rounded-xl backdrop-blur-sm bg-white/25 border border-white/30 text-white hover:bg-white/50 transition-colors pointer-events-auto">
            <div className="flex items-center mb-3">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-400">Community Driven</h3>
            </div>
            <p className="text-lg md:text-xl text-[#4B5563] leading-relaxed">
              Reshape collaboration with dynamic staking and AI audits in a trustless network
            </p>
          </div>
          
          <div className="p-6 rounded-xl backdrop-blur-sm bg-white/25 border border-white/30 text-white hover:bg-white/50 transition-colors pointer-events-auto">
            <div className="flex items-center mb-3">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-400">Value Creation</h3>
            </div>
            <p className="text-lg md:text-xl text-[#4B5563] leading-relaxed">
              Fair, transparent token economics that reward real contributions over speculation
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer and Social Media */}
      <div className="absolute bottom-4 left-0 w-full z-10 px-4 pointer-events-none">
        <div className="flex items-center justify-start ml-[5%]">
          <div className="text-gray-400 text-sm">
            © 2025 Buidl Land
          </div>
          <div className="flex space-x-4 ml-4">
            <a href="#" className="text-gray-400 hover:text-indigo-300 transition-colors pointer-events-auto">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-300 transition-colors pointer-events-auto">
              <FaDiscord className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-300 transition-colors pointer-events-auto">
              <FaTwitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}