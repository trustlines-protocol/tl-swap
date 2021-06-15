import { useCallback, useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { useStore } from "../store";
import config from "../config";

// Web3Modal also supports many other wallets.
// You can see other options at https://github.com/Web3Modal/web3modal
const web3Modal = new Web3Modal({
  network: config.NETWORK,
  cacheProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: config.INFURA_KEY,
      },
    },
  },
});

function useWeb3Modal(
  modalConfig: {
    autoLoad?: boolean;
  } = {}
) {
  const [provider, setProvider] = useState<null | Web3Provider>(null);

  const setConnectedETHAddress = useStore(
    (state) => state.setConnectedETHAddress
  );

  const [autoLoaded, setAutoLoaded] = useState(false);
  const { autoLoad = true } = modalConfig;

  // Open wallet selection modal.
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    const web3Provider = new Web3Provider(newProvider);
    setProvider(web3Provider);

    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
    setConnectedETHAddress(address);
  }, [setConnectedETHAddress]);

  const logoutOfWeb3Modal = useCallback(
    async function() {
      await web3Modal.clearCachedProvider();
      window.location.reload();
      setConnectedETHAddress(null);
    },
    [setConnectedETHAddress]
  );

  // If autoLoad is enabled and the the wallet had been loaded before, load it automatically now.
  useEffect(() => {
    if (autoLoad && !autoLoaded && web3Modal.cachedProvider) {
      loadWeb3Modal();
      setAutoLoaded(true);
    }
  }, [autoLoad, autoLoaded, loadWeb3Modal, setAutoLoaded]);

  return { provider, loadWeb3Modal, logoutOfWeb3Modal };
}

export default useWeb3Modal;
