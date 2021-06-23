import React from "react";

type Props = {
  currencyNetworks: {
    name: string;
    address: string;
    abbreviation: string;
  }[];
  onChangeNetwork: (networkAddress: string) => void;
  isLoading: boolean;
};

function CurrencyNetworkSelect(props: Props) {
  return (
    <div className="flex flex-col w-full">
      <label className="mb-2" htmlFor="currency-network-select">
        Currency Network
      </label>
      <select
        id="currency-network-select"
        onChange={(event) => props.onChangeNetwork(event.target.value)}
        className="border py-2 px-4"
      >
        {props.isLoading ? (
          <option>Loading...</option>
        ) : (
          props.currencyNetworks.map((currencyNetwork) => (
            <option
              key={currencyNetwork.address}
              value={currencyNetwork.address}
            >
              {`${currencyNetwork.name} (${currencyNetwork.abbreviation})`}
            </option>
          ))
        )}
      </select>
    </div>
  );
}

export { CurrencyNetworkSelect };
