import React from "react";

import { CommitBoxSwitchButtonBar } from "../commit-box-switch-button-bar";
import { ConnectETHWalletButton } from "../connect-eth-wallet-button";
import { CurrencyNetworkSelect } from "../currency-network-select";
import { LabeledInput } from "../labeled-input";

import { useCurrencyNetworks } from "../../hooks/useCurrencyNetworks";
import { useStore } from "../../store";

function CommitBox() {
  const [yourTLAddress, setYourTLAddress] = React.useState("");
  const [counterpartyTLAddress, setCounterpartyTLAddress] = React.useState("");
  const [selectedCurrencyNetwork, setSelectedCurrencyNetwork] = React.useState<
    string | null
  >(null);

  const connectedETHAddress = useStore((state) => state.connectedETHAddress);
  const { isLoading, data = [] } = useCurrencyNetworks();

  return (
    <div className="container mx-auto">
      <div
        className="
          max-w-md mx-auto flex flex-col items-center mt-10 rounded border-gray-200
          border p-2 shadow-md gap-y-4
        "
      >
        <CommitBoxSwitchButtonBar />
        <div className="flex flex-col w-full">
          <label className="mb-2" htmlFor="your-eth-address">
            Your ETH Address
          </label>
          <div id="your-eth-address">
            {connectedETHAddress ? (
              <div className="">{connectedETHAddress}</div>
            ) : (
              <ConnectETHWalletButton />
            )}
          </div>
        </div>
        <CurrencyNetworkSelect
          currencyNetworks={data}
          isLoading={isLoading}
          onChangeNetwork={setSelectedCurrencyNetwork}
        />
        <LabeledInput
          id="yourTLAddressInput"
          label="Your TL Address"
          value={yourTLAddress}
          onChangeInputValue={setYourTLAddress}
        />
        <LabeledInput
          id="counterpartyTLAddressInput"
          label="Counterparty TL Address"
          value={counterpartyTLAddress}
          onChangeInputValue={setCounterpartyTLAddress}
        />
      </div>
    </div>
  );
}

export { CommitBox };
