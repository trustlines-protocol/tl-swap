export const config: {
  SUBGRAPH_URL: string;
  INFURA_KEY: string;
  NETWORK: string;
  TLBC_JSON_RPC_URL: string;
  RELAY_URL: string;
} = {
  SUBGRAPH_URL: process.env.REACT_APP_SUBGRAPH_URL || "",
  INFURA_KEY: process.env.REACT_APP_INFURA_KEY || "",
  NETWORK: process.env.REACT_APP_NETWORK || "",
  TLBC_JSON_RPC_URL: process.env.REACT_APP_TLBC_JSON_RPC_URL || "",
  RELAY_URL: process.env.REACT_APP_RELAY_URL || "",
};

export default config;
