import React from "react";

import { LabeledInput } from "../labeled-input";
import { ConnectETHWalletButton } from "../connect-eth-wallet-button";
import { Button } from "../button";

import useWeb3Modal from "../../hooks/useWeb3Modal";
import { getCommitment } from "../../utils/tl-swap";
import { commit } from "../../utils/eth-swap";
import { useStore } from "../../store";

function CommitBoxEthToTl() {
  const [initiatorETHAddress, setInitiatorETHAddress] = React.useState("");
  const [hashedSecret, setHashedSecret] = React.useState("");
  const [claimPeriodInSec, setClaimPeriodInSec] = React.useState("");
  const [isCommitting, setIsCommitting] = React.useState(false);
  const [commitTxHash, setCommitTxHash] = React.useState("");

  const { provider } = useWeb3Modal({ autoLoad: true });

  const connectedETHAddress = useStore((state) => state.connectedETHAddress);

  React.useEffect(() => {
    const url = new URL(window.location.href);

    const hashedSecret = url.searchParams.get("hashed-secret");
    if (hashedSecret) {
      setHashedSecret(hashedSecret);
    }

    const initiatorETHAddress = url.searchParams.get("eth-address");
    if (initiatorETHAddress) {
      setInitiatorETHAddress(initiatorETHAddress);
    }
  }, []);

  const handleClickCommit = async () => {
    try {
      setIsCommitting(true);

      if (!provider) {
        throw new Error("No wallet connected");
      }

      if (!hashedSecret) {
        throw new Error("Invalid hashed secret provided");
      }

      if (!initiatorETHAddress) {
        throw new Error("Invalid initiator address provided");
      }

      if (!claimPeriodInSec) {
        throw new Error("Invalid claim period provided");
      }

      const commitment = await getCommitment(hashedSecret);

      const requestedEthAmount = String(commitment.EthAmount);

      const txResponse = await commit(
        {
          claimPeriodInSec,
          hashedSecret,
          initiatorEthAddress: initiatorETHAddress,
          requestedEthAmount,
        },
        provider.getSigner()
      );
      const txReceipt = await txResponse.wait();
      setCommitTxHash(txReceipt.transactionHash);
      setClaimPeriodInSec("");
      setInitiatorETHAddress("");
      setHashedSecret("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsCommitting(false);
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
      <LabeledInput
        id="initiatorETHAddress"
        label="Initiator ETH Address"
        value={initiatorETHAddress}
        onChangeInputValue={setInitiatorETHAddress}
      />
      <LabeledInput
        id="claimPeriod"
        label="Claim Period (sec)"
        value={claimPeriodInSec}
        onChangeInputValue={setClaimPeriodInSec}
        type="number"
        min={0}
      />
      {connectedETHAddress ? (
        <Button
          buttonType="primary"
          onClick={handleClickCommit}
          disabled={isCommitting}
          fullWidth
        >
          {isCommitting ? "Committing..." : "Commit"}
        </Button>
      ) : (
        <ConnectETHWalletButton />
      )}
      {commitTxHash && (
        <div className="bg-green-100 p-4 text-green-700 w-full text-center">
          Successfully committed!{" "}
          <a
            className="underline"
            href={`https://goerli.etherscan.io/tx/${commitTxHash}`}
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

export { CommitBoxEthToTl };
