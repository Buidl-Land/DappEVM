"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { IdeaPulseLogo } from "~~/components/assets/IdeaPulseLogo";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick, useTargetNetwork } from "~~/hooks/scaffold-eth";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { ConnectButton } from "@rainbow-me/rainbowkit";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/3d",
    icon: <span className="material-icons text-sm flex items-center">home</span>,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: <span className="material-icons text-sm flex items-center">apps</span>,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <span className="material-icons text-sm flex items-center">dashboard</span>,
  },
  {
    label: "About",
    href: "/about",
    icon: <span className="material-icons text-sm flex items-center">help_outline</span>,
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();
  const is3DPage = pathname === "/3d";

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        const isHomeOn3D = is3DPage && href === "/3d";
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${
                isActive && !isHomeOn3D
                  ? "font-medium bg-primary/20 text-primary dark:bg-primary/30 dark:text-white" 
                  : isHomeOn3D 
                    ? "text-indigo-400 hover:text-indigo-300" 
                    : "dark:text-gray-200"
              } hover:bg-primary/10 dark:hover:bg-primary/20 hover:shadow-md focus:!bg-primary/20 active:!text-neutral py-2 px-5 text-sm rounded-md flex items-center gap-2 transition-all duration-200`}
            >
              {icon}
              {(!is3DPage || !icon) && <span className={is3DPage ? "text-sm" : "text-lg"}>{label}</span>}
            </Link>
          </li>
        );
      })}
    </>
  );
};

// 自定义3D页面的钱包按钮
const CustomConnectButton = ({ is3DPage }: { is3DPage: boolean }) => {
  if (!is3DPage) {
    return <RainbowKitCustomConnectButton />;
  }

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;

        if (!connected) {
          return (
            <button
              className="bg-transparent text-indigo-400 hover:text-indigo-300 border-0 flex items-center p-1 shadow-none transition-all duration-200"
              onClick={openConnectModal}
              type="button"
            >
              <span className="material-icons text-2xl">account_balance_wallet</span>
            </button>
          );
        }

        // 已连接状态使用原始组件
        return <RainbowKitCustomConnectButton />;
      }}
    </ConnectButton.Custom>
  );
};

/**
 * Site header
 */
export const Header = () => {
  // Remove unused variable or if you need the hook for some reason, keep the hook but not the variable
  const {
    /* targetNetwork */
  } = useTargetNetwork();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const is3DPage = pathname === "/3d";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <div
      className={`fixed top-0 z-50 w-full transition-all duration-300 backdrop-blur-sm ${
        isScrolled ? "shadow-lg backdrop-blur-md" : ""
      }`}
    >
      <div className="w-full">
        <div className="flex justify-between items-center h-16 px-2">
          <Link href="/" passHref className="flex gap-2 sm:gap-3 items-center group shrink-0 ml-2">
            <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
              <IdeaPulseLogo className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            {!is3DPage && (
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-bold tracking-wide leading-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  BuidlLand
                </span>
                <span className="text-xs sm:text-base tracking-widest opacity-75 dark:text-gray-300">INNOVATION HUB</span>
              </div>
            )}
          </Link>
          <div className="hidden lg:flex flex-1 justify-center max-w-2xl mx-4">
            <ul className="flex gap-1 items-center dark:text-gray-200">
              <HeaderMenuLinks />
            </ul>
          </div>
          <div className="flex items-center gap-3">
            <div className="dropdown lg:hidden" ref={burgerMenuRef}>
              <label
                tabIndex={0}
                className={`btn btn-ghost btn-sm sm:btn-md btn-circle ${isDrawerOpen ? "hover:bg-primary/20" : "hover:bg-transparent"} dark:text-gray-200`}
                onClick={() => {
                  setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
                }}
              >
                <Bars3Icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </label>
              {isDrawerOpen && (
                <ul
                  tabIndex={0}
                  className="p-2 sm:p-4 mt-3 w-52 sm:w-60 shadow-lg backdrop-blur-lg menu menu-compact dropdown-content bg-indigo-100/90 dark:bg-gray-800/95 rounded-box z-[100] dark:text-gray-200 absolute right-0"
                  onClick={() => {
                    setIsDrawerOpen(false);
                  }}
                >
                  <HeaderMenuLinks />
                  <li className="mt-2 p-2">
                    <div className="flex items-center gap-2">
                      <SwitchTheme className="pointer-events-auto" />
                      <span className="text-lg font-medium">Switch Theme</span>
                    </div>
                  </li>
                </ul>
              )}
            </div>
            <div className={is3DPage ? "mr-2" : ""}>
              <CustomConnectButton is3DPage={is3DPage} />
            </div>
            {!is3DPage && (
              <div className="z-10">
                <SwitchTheme />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};