import { DebugContracts } from "./_components/DebugContracts";
import Link from "next/link";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Debug Contracts",
  description: "Debug your deployed 🏗 IdeaPulse contracts in an easy way",
});

const Debug: NextPage = () => {
  return (
    <>
      <DebugContracts />
      <div className="text-center mt-12 lg:mt-16 bg-secondary p-10">
        <h1 className="text-4xl my-0">Debug Contracts</h1>
        <p className="text-neutral">
          You can debug & interact with your deployed contracts here.
          <br /> Check{" "}
          <code className="italic bg-base-300 text-base font-bold [word-spacing:-0.5rem] px-1">
            packages / nextjs / app / debug / page.tsx
          </code>{" "}
        </p>
        <div className="mt-8">
          <Link href="/debug/diamond" className="btn btn-primary">
            Debug Diamond Contract
          </Link>
          <div className="mt-8 bg-base-300 p-4 rounded-lg">
            <p className="text-sm">
              <span className="font-bold">Note:</span> MockUSDC contract functionality has been integrated into the Diamond debug page, available under the &quot;MockUSDC&quot; category.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Debug;
