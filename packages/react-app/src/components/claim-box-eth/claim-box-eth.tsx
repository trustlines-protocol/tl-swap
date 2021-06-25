import React from "react";

import { LabeledInput } from "../labeled-input";
import { ConnectETHWalletButton } from "../connect-eth-wallet-button";
import { Button } from "../button";

import useWeb3Modal from "../../hooks/useWeb3Modal";
import { claim } from "../../utils/eth-swap";
import { getCommitment } from "../../api/local-storage";
import { useStore } from "../../store";

function ClaimBoxEth() {
  const [hashedSecret, setHashedSecret] = React.useState("");
  const [secret, setSecret] = React.useState("");
  const [claimTxHash, setClaimTxHash] = React.useState("");
  const [isClaiming, setIsClaiming] = React.useState(false);

  const { provider } = useWeb3Modal({ autoLoad: true });

  const connectedETHAddress = useStore((state) => state.connectedETHAddress);

  const handleClickClaim = async () => {
    try {
      setIsClaiming(true);

      if (!provider) {
        throw new Error("Wallet not connected");
      }

      if (!hashedSecret && !secret) {
        throw new Error("The hashed secret or secret need to be entered");
      }

      let plainSecret;

      if (hashedSecret) {
        const commitment = getCommitment(hashedSecret);

        if (!commitment || !commitment.secret) {
          throw new Error("No commitment found for given hash");
        }

        plainSecret = commitment.secret;
      } else {
        plainSecret = secret;
      }

      const txResponse = await claim(plainSecret, provider.getSigner());
      const txReceipt = await txResponse.wait();
      setClaimTxHash(txReceipt.transactionHash);
    } catch (error) {
      console.log(error);
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <>
      <LabeledInput
        id="hashedSecretInput"
        label="Hashed Secret"
        value={hashedSecret}
        onChangeInputValue={setHashedSecret}
      />
      <div className="mt-4 font-semibold">OR</div>
      <LabeledInput
        id="Secret"
        label="Secret"
        value={secret}
        onChangeInputValue={setSecret}
      />
      {connectedETHAddress ? (
        <Button
          buttonType="primary"
          onClick={handleClickClaim}
          fullWidth
          disabled={isClaiming}
        >
          {isClaiming ? "Claiming..." : "Claim"}
        </Button>
      ) : (
        <ConnectETHWalletButton />
      )}
      {claimTxHash && (
        <div className="bg-green-100 p-4 text-green-700 w-full text-center">
          Successfully claimed!{" "}
          <a
            className="underline"
            href={`https://goerli.etherscan.io/tx/${claimTxHash}`}
            target="_blank"
            rel="noreferrer"
          >
            View on Etherscan
          </a>
        </div>
      )}
    </>
  );
}

export { ClaimBoxEth };
