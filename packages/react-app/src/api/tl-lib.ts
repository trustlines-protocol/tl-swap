import { TLNetwork } from "@trustlines/trustlines-clientlib";
import { calcRaw } from "@trustlines/trustlines-clientlib/lib-esm/utils";

const tlNetwork = new TLNetwork({
  relayUrl: "https://tlbc.relay.anyblock.tools/api/v1",
});

export async function getCurrencyNetworks() {
  return tlNetwork.currencyNetwork.getAll();
}

export async function getDecimals(networkAddress: string) {
  return tlNetwork.currencyNetwork.getDecimals(networkAddress);
}

export function parseValue(value: string, decimals: number) {
  return calcRaw(value, decimals);
}
