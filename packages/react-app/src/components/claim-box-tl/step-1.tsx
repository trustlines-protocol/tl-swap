import React from "react";

import { LabeledInput } from "../labeled-input";

function Step1(props: {
  hashedSecret: string,
  onChangeHashedSecret: (hashedSecret: string) => void;
  onClickContinue: () => void;
}) {

  return (
    <>
    <LabeledInput
        id="hashedSecretInput"
        label="Hashed Secret"
        value={props.hashedSecret}
        onChangeInputValue={props.onChangeHashedSecret}
    />
      <button
        className="border w-full px-4 py-2 bg-green-200"
        onClick={props.onClickContinue}
        disabled={!props.hashedSecret}
      >
        Continue
      </button>
    </>
  );
}

export { Step1 };
