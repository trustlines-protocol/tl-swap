import { Contract } from "@ethersproject/contracts";
import { JsonRpcProvider } from "@ethersproject/providers";
// @ts-ignore
import { abis, addresses } from "@project/contracts";

import config from "../config";

export async function populateCommitTx(params: {
  yourTLAddress: string;
  counterpartyTLAddress: string;
  currencyNetworkAddress: string;
  parsedETHAmount: string;
  parsedTLAmount: string;
  claimPeriodInSec: string;
  yourETHAddress: string;
  hashedSecret: string;
}) {
  const tlSwapContract = new Contract(addresses.tlSwap, abis.tlSwap);
  const unsignedCommitTx = await tlSwapContract.populateTransaction.commit(
    params.yourTLAddress,
    params.counterpartyTLAddress,
    params.currencyNetworkAddress,
    params.parsedTLAmount,
    params.yourETHAddress,
    params.parsedETHAmount,
    params.claimPeriodInSec,
    params.hashedSecret
  );
  unsignedCommitTx.from = params.yourTLAddress;

  return unsignedCommitTx;
}

export async function getCommitment(hashedSecret: string) {
  const provider = new JsonRpcProvider(config.TLBC_JSON_RPC_URL);
  const tlSwapContract = new Contract(addresses.tlSwap, abis.tlSwap, provider);

  const commitment = await tlSwapContract.CommitmentsMap(hashedSecret);
  return commitment;
}
