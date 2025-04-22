import { defineChain } from "viem";

export const baseSepolia = defineChain({
  id: 84532,
  name: "Base Sepolia",
  network: "base-sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://base-sepolia-rpc.publicnode.com/89e4ff0f587fe2a94c7a2c12653f4c55d2bda1186cb6c1c95bd8d8408fbdc014"],
    },
    public: {
      http: ["https://base-sepolia-rpc.publicnode.com/89e4ff0f587fe2a94c7a2c12653f4c55d2bda1186cb6c1c95bd8d8408fbdc014"],
    },
  },
  blockExplorers: {
    default: {
      name: "Base Sepolia Explorer",
      url: "https://sepolia.basescan.org",
    },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1059647,
    },
  },
});

export const eduTestnet = defineChain({
  id: 656476,
  name: "EDU Testnet",
  network: "edu-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "EDU Token",
    symbol: "EDU",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.open-campus-codex.gelato.digital"],
    },
    public: {
      http: ["https://rpc.open-campus-codex.gelato.digital"],
    },
  },
  blockExplorers: {
    default: {
      name: "EDU Testnet Explorer",
      url: "https://opencampus-codex.blockscout.com",
    },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1,
    },
  },
  testnet: true,
  sourceId: 421614, // Arbitrum Sepolia as settlement layer
});
