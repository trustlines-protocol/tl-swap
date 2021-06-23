import React from "react";
import { formatEther, parseEther } from "@ethersproject/units";

import { LabeledInput } from "../labeled-input";
import { ConnectETHWalletButton } from "../connect-eth-wallet-button";

import useWeb3Modal from "../../hooks/useWeb3Modal";
import { getCommitment } from "../../utils/tl-swap";
import { commit } from "../../utils/eth-swap";
import { useStore } from "../../store";

function CommitBoxEthToTl() {
  const [initiatorETHAddress, setInitiatorETHAddress] = React.useState("");
  const [hashedSecret, setHashedSecret] = React.useState("");
  const [claimPeriodInSec, setClaimPeriodInSec] = React.useState("");

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

      console.log(commitment);

      const requestedEthAmount = String(commitment.EthAmount);

      console.log(formatEther(requestedEthAmount));

      const txResponse = await commit(
        {
          claimPeriodInSec,
          hashedSecret,
          initiatorEthAddress: initiatorETHAddress,
          requestedEthAmount,
        },
        provider.getSigner()
      );

      console.log({ txResponse });
    } catch (error) {
      console.log(error);
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
        <button onClick={handleClickCommit}>Commit</button>
      ) : (
        <ConnectETHWalletButton />
      )}
    </>
  );
}

export { CommitBoxEthToTl };
