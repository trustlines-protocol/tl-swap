import { render, screen } from "@testing-library/react";

import { CurrencyNetworkSelect } from "./currency-network-select";

test("render CurrencyNetworkSelect with networks", async () => {
  const networks = [
    {
      address: "0x1",
      name: "network1",
      abbreviation: "NET",
    },
    {
      address: "0x2",
      name: "network2",
      abbreviation: "NET",
    },
  ];

  render(
    <CurrencyNetworkSelect
      currencyNetworks={networks}
      onChangeNetwork={(changedNetworkAddress) =>
        console.log(changedNetworkAddress)
      }
      isLoading={false}
    />
  );

  await screen.findByLabelText(/currency network/i);
  const options = await screen.findAllByRole("option");

  expect(options).toHaveLength(2);
});
