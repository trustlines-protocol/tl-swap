import React from "react";

import { ConnectETHWalletButton } from "../connect-eth-wallet-button";
import { CurrencyNetworkSelect } from "../currency-network-select";
import { LabeledInput } from "../labeled-input";
import { QrCodeScannerModal } from "../qr-code-scanner-modal";
import { Button } from "../button";

import { useCurrencyNetworks } from "../../hooks/useCurrencyNetworks";
import { useStore } from "../../store";

function Step1(props: {
  yourTLAddress: string;
  onChangeYourTLAddress: (tlAddress: string) => void;
  counterpartyTLAddress: string;
  onChangeCounterpartyTLAddress: (tlAddress: string) => void;
  onChangeNetwork: (networkAddress: string) => void;
  onClickContinue: () => void;
}) {
  const [showQrCodeScanner, setShowQrCodeScanner] = React.useState<boolean>(
    false
  );
  const [qrCodeScannerContext, setQrCodeScannerContext] = React.useState<
    "yourTLAddress" | "counterpartyTLAddress"
  >("yourTLAddress");

  const connectedETHAddress = useStore((state) => state.connectedETHAddress);
  const { isLoading, data = [], status } = useCurrencyNetworks();

  React.useEffect(() => {
    if (status === "success") {
      props.onChangeNetwork(data[0].address);
    }
  }, [status, data]);

  const handleScannedData = (scannedData: string) => {
    const url = new URL(scannedData);

    if (url.pathname.startsWith("/contact")) {
      const splitPathname = url.pathname.split("/");
      const tlAddress = splitPathname[splitPathname.length - 1];

      if (qrCodeScannerContext === "yourTLAddress") {
        props.onChangeYourTLAddress(tlAddress);
      } else {
        props.onChangeCounterpartyTLAddress(tlAddress);
      }
    }
  };

  return (
    <>
      <QrCodeScannerModal
        isOpen={showQrCodeScanner}
        onError={(error) => console.log(error)}
        onRequestClose={() => setShowQrCodeScanner(false)}
        onScan={handleScannedData}
      />
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
        onChangeNetwork={props.onChangeNetwork}
      />
      <LabeledInput
        id="yourTLAddressInput"
        label="Your TL Address"
        value={props.yourTLAddress}
        onChangeInputValue={props.onChangeYourTLAddress}
        withScanButton
        onClickScanButton={() => {
          setShowQrCodeScanner(true);
          setQrCodeScannerContext("yourTLAddress");
        }}
      />
      <LabeledInput
        id="counterpartyTLAddressInput"
        label="Counterparty TL Address"
        value={props.counterpartyTLAddress}
        onChangeInputValue={props.onChangeCounterpartyTLAddress}
        withScanButton
        onClickScanButton={() => {
          setShowQrCodeScanner(true);
          setQrCodeScannerContext("counterpartyTLAddress");
        }}
      />
      <Button buttonType="primary" onClick={props.onClickContinue} fullWidth>
        Continue
      </Button>
    </>
  );
}

export { Step1 };
