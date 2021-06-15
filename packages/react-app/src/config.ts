export const config: {
  SUBGRAPH_URL: string;
  INFURA_KEY: string;
  NETWORK: string;
} = {
  SUBGRAPH_URL: process.env.SUBGRAPH_URL || "",
  INFURA_KEY: process.env.INFURA_KEY || "",
  NETWORK: process.env.NETWORK || "",
};

export default config;
