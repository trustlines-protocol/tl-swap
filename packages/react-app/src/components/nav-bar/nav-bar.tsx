import React from "react";

import { NavBarSwitchButtonBar } from "../nav-bar-switch-button-bar";
import { ConnectETHWalletButton } from "../connect-eth-wallet-button";

function NavBar() {
  return (
    <nav className="container mx-auto h-10 flex flex-row items-center justify-between">
      <div className="font-semibold flex-1">TL SWAP</div>
      <div className="flex-1 flex justify-center">
        <NavBarSwitchButtonBar />
      </div>
      <div className="flex-1 flex justify-end">
        <ConnectETHWalletButton />
      </div>
    </nav>
  );
}

export { NavBar };
