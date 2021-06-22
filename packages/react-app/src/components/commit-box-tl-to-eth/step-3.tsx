import React from "react";
import QRCode from "react-qr-code";
import { randomBytes } from "@ethersproject/random";
import { hexlify } from "@ethersproject/bytes";
import { parseEther } from "@ethersproject/units";
import { keccak256 } from "@ethersproject/keccak256";

import { getDecimals, parseValue } from "../../api/tl-lib";
import { setCommitment } from "../../api/local-storage";
import { populateClaimTx } from "../../utils/tl-swap";

function Step3(props: {
  yourTLAddress: string;
  counterpartyTLAddress: string;
  currencyNetworkAddress: string;
  tlAmount: string;
  ethAmount: string;
  claimPeriodInSec: string;
  yourETHAddress: string;
}) {
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    (async () => {
      const secret = hexlify(randomBytes(32));
      const hashedSecret = keccak256(secret);

      const currencyNetworkDecimals = await getDecimals(
        props.currencyNetworkAddress
      );
      const parsedTLAmount = parseValue(
        props.tlAmount,
        currencyNetworkDecimals.networkDecimals
      );
      const parsedETHAmount = parseEther(props.ethAmount);

      setCommitment({
        ...props,
        secret,
        hashedSecret,
      });

      const unsignedClaimTx = await populateClaimTx({
        ...props,
        parsedETHAmount: String(parsedETHAmount),
        parsedTLAmount: String(parsedTLAmount),
        hashedSecret,
      });

      const link = `https://link.trustlines.app/sign?from=${unsignedClaimTx.from}&to=${unsignedClaimTx.to}&data=${unsignedClaimTx.data}`;
      setLink(link);
    })();
  }, []);

  return (
    <div>
      <div className="w-full justify-center flex flex-row">
        {link === "" ? <div>Creating QR code...</div> : <QRCode value={link} />}
      </div>
      <div className="mt-4">Scan the QR code with the TL App to continue.</div>
    </div>
  );
}

export { Step3 };
