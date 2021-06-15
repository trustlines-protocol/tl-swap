import React from "react";

import { NavBarSwitchButtonBar } from "../nav-bar-switch-button-bar";
import { ConnectETHWalletButton } from "../connect-eth-wallet-button";

function NavBar() {
  return (
    <nav className="container mx-auto h-10 flex flex-row items-center justify-between">
      <div className="font-semibold">TL SWAP</div>
      <NavBarSwitchButtonBar />
      <ConnectETHWalletButton />
    </nav>
  );
}

export { NavBar };
