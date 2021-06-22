import React from "react";

import { LabeledInput } from "../labeled-input";

function Step2(props: {
  tlAmount: string;
  onChangeTLAmount: (tlAmount: string) => void;
  ethAmount: string;
  onChangeETHAmount: (ethAmount: string) => void;
  claimPeriod: string;
  onChangeClaimPeriod: (claimPeriod: string) => void;
  onClickBack: () => void;
  onClickContinue: () => void;
}) {
  return (
    <>
      <LabeledInput
        id="tlAmount"
        label="Total TL Amount"
        value={props.tlAmount}
        onChangeInputValue={props.onChangeTLAmount}
        type="number"
        min={0}
      />
      <LabeledInput
        id="ethAmount"
        label="Total ETH Amount"
        value={props.ethAmount}
        onChangeInputValue={props.onChangeETHAmount}
        type="number"
        min={0}
      />
      <LabeledInput
        id="claimPeriod"
        label="Claim Period (sec)"
        value={props.claimPeriod}
        onChangeInputValue={props.onChangeClaimPeriod}
        type="number"
        min={0}
      />
      <div className="flex flex-row gap-x-2 w-full">
        <button
          className="border w-full px-4 py-2 flex-1"
          onClick={props.onClickBack}
        >
          Back
        </button>
        <button
          className="border w-full px-4 py-2 flex-1"
          onClick={props.onClickContinue}
        >
          Continue
        </button>
      </div>
    </>
  );
}

export { Step2 };
