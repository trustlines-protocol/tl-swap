import { Contract } from "@ethersproject/contracts";
import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
// @ts-ignore
import { abis, addresses } from "@project/contracts";

import config from "../config";

export async function commit(
  params: {
    claimPeriodInSec: string;
    hashedSecret: string;
    initiatorEthAddress: string;
    requestedEthAmount: string;
  },
  signer: JsonRpcSigner
) {
  const ethSwapContract = new Contract(addresses.ethSwap, abis.ethSwap, signer);
  console.log({ params });
  const txResponse = await ethSwapContract.secretLock(
    params.claimPeriodInSec,
    params.hashedSecret,
    params.initiatorEthAddress,
    {
      value: params.requestedEthAmount,
    }
  );

  return txResponse;
}
