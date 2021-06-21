import React from "react";

import useWeb3Modal from "../../hooks/useWeb3Modal";
import { useStore } from "../../store";

function ConnectETHWalletButton() {
  const { provider, loadWeb3Modal, logoutOfWeb3Modal } = useWeb3Modal({
    autoLoad: true,
  });

  const connectedETHAddress = useStore((state) => state.connectedETHAddress);

  return (
    <button
      className="border px-4 py-2"
      onClick={async () => {
        if (provider) {
          await logoutOfWeb3Modal();
        } else {
          await loadWeb3Modal();
        }
      }}
    >
      {connectedETHAddress ? "Disconnect" : "Connect"} Wallet
    </button>
  );
}

export { ConnectETHWalletButton };
