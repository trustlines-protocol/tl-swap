import React from "react";

import { LabeledInput } from "../labeled-input";
import { Button } from "../button";

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
        <Button onClick={props.onClickBack} fullWidth>
          Back
        </Button>
        <Button buttonType="primary" onClick={props.onClickContinue} fullWidth>
          Continue
        </Button>
      </div>
    </>
  );
}

export { Step2 };
