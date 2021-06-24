import React from "react";

import { ClaimBoxSwitchButtonBar } from "../claim-box-switch-button-bar";
import { ClaimBoxTl } from "../claim-box-tl";
import { ClaimBoxEthToTl } from "../claim-box-eth-to-tl";

import { useStore } from "../../store";

function ClaimBox() {
  const activeClaimBoxSwitchItem = useStore(
    (state) => state.activeClaimBoxSwitchItem
  );

  console.log('activeClaimBoxSwitchItem', activeClaimBoxSwitchItem)
  return (
    <div className="container mx-auto">
      <div
        className="
          max-w-md mx-auto flex flex-col items-center mt-10 rounded border-gray-200
          border p-2 shadow-md gap-y-4
        "
      >
        <ClaimBoxSwitchButtonBar />
        {activeClaimBoxSwitchItem === "TL" ? (
          <ClaimBoxTl />
        ) : (
          <ClaimBoxEthToTl />
        )}
      </div>
    </div>
  );
}

export { ClaimBox };
