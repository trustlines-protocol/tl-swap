import React from "react";

import { CommitBoxSwitchButtonBar } from "../commit-box-switch-button-bar";
import { CommitBoxTlToEth } from "../commit-box-tl-to-eth";

import { useStore } from "../../store";

function CommitBox() {
  const activeCommitBoxSwitchItem = useStore(
    (state) => state.activeCommitBoxSwitchItem
  );

  return (
    <div className="container mx-auto">
      <div
        className="
          max-w-md mx-auto flex flex-col items-center mt-10 rounded border-gray-200
          border p-2 shadow-md gap-y-4
        "
      >
        <CommitBoxSwitchButtonBar />
        {activeCommitBoxSwitchItem === "tlToEth" ? <CommitBoxTlToEth /> : null}
      </div>
    </div>
  );
}

export { CommitBox };
