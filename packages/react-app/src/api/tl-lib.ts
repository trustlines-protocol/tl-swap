import { TLNetwork } from "@trustlines/trustlines-clientlib";

const tlNetwork = new TLNetwork({
  relayUrl: "https://tlbc.relay.anyblock.tools/api/v1",
});

export async function getCurrencyNetworks() {
  return tlNetwork.currencyNetwork.getAll();
}
