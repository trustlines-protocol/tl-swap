import React from "react";

import { Step1 } from "./step-1";
import { Step2 } from "./step-2";
import { Step3 } from "./step-3";
import { Step4 } from "./step-4";

import { useStore } from "../../store";

function CommitBoxTlToEth() {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);

  const [yourTLAddress, setYourTLAddress] = React.useState("");
  const [counterpartyTLAddress, setCounterpartyTLAddress] = React.useState("");
  const [selectedCurrencyNetwork, setSelectedCurrencyNetwork] = React.useState<
    string | null
  >(null);
  const [tlAmount, setTLAmount] = React.useState("");
  const [ethAmount, setETHAmount] = React.useState("");
  const [claimPeriod, setClaimPeriod] = React.useState("");
  const [txHash, setTxHash] = React.useState("")
  const [hashedSecret, setHashedSecret] = React.useState("")

  const connectedETHAddress = useStore((state) => state.connectedETHAddress);

  if (currentStepIndex === 0) {
    return (
      <Step1
        onClickContinue={() => {
          setCurrentStepIndex(1);
        }}
        yourTLAddress={yourTLAddress}
        onChangeYourTLAddress={setYourTLAddress}
        counterpartyTLAddress={counterpartyTLAddress}
        onChangeCounterpartyTLAddress={setCounterpartyTLAddress}
        onChangeNetwork={setSelectedCurrencyNetwork}
      />
    );
  }

  if (currentStepIndex === 1) {
    return (
      <Step2
        tlAmount={tlAmount}
        onChangeTLAmount={setTLAmount}
        ethAmount={ethAmount}
        onChangeETHAmount={setETHAmount}
        claimPeriod={claimPeriod}
        onChangeClaimPeriod={setClaimPeriod}
        onClickBack={() => setCurrentStepIndex(0)}
        onClickContinue={() => setCurrentStepIndex(2)}
      />
    );
  }

  if (currentStepIndex === 2) {
    return (
      <Step3
        yourTLAddress={yourTLAddress}
        counterpartyTLAddress={counterpartyTLAddress}
        currencyNetworkAddress={selectedCurrencyNetwork || ""}
        yourETHAddress={connectedETHAddress || ""}
        tlAmount={tlAmount}
        ethAmount={ethAmount}
        claimPeriodInSec={claimPeriod}
        onTxSigned={(txHash, hashedSecret) => {
          setTxHash(txHash)
          setHashedSecret(hashedSecret)
          setCurrentStepIndex(3)
        }}
      />
    );
  }

  if (currentStepIndex === 3) {
    return (
        <Step4
            yourTLAddress={yourTLAddress}
            counterpartyTLAddress={counterpartyTLAddress}
            currencyNetworkAddress={selectedCurrencyNetwork || ""}
            yourETHAddress={connectedETHAddress || ""}
            tlAmount={tlAmount}
            ethAmount={ethAmount}
            hashedSecret={hashedSecret}
            claimPeriodInSec={claimPeriod}
            txHash={txHash}
        />
    );
  }

  return null;

}

export { CommitBoxTlToEth };
