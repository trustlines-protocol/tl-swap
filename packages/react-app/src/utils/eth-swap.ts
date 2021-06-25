import { Contract } from "@ethersproject/contracts";
import { JsonRpcSigner, TransactionResponse } from "@ethersproject/providers";
// @ts-ignore
import { abis, addresses } from "@project/contracts";

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
  const txResponse: TransactionResponse = await ethSwapContract.secretLock(
    params.claimPeriodInSec,
    params.hashedSecret,
    params.initiatorEthAddress,
    {
      value: params.requestedEthAmount,
    }
  );

  return txResponse;
}

export async function claim(secret: string, signer: JsonRpcSigner) {
  const ethSwapContract = new Contract(addresses.ethSwap, abis.ethSwap, signer);
  const txResponse: TransactionResponse = await ethSwapContract.secretProof(
    secret
  );

  return txResponse;
}
