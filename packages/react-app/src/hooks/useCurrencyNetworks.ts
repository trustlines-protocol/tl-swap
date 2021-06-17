import { useQuery } from "react-query";

import { getCurrencyNetworks } from "../api/tl-lib";

export function useCurrencyNetworks() {
  return useQuery("currencyNetworks", getCurrencyNetworks);
}
