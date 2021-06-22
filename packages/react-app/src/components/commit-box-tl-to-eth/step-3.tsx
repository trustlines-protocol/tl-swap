import React from "react";
import QRCode from "react-qr-code";
import { randomBytes } from "@ethersproject/random";
import { hexlify } from "@ethersproject/bytes";
import { parseEther } from "@ethersproject/units";
import { keccak256 } from "@ethersproject/keccak256";

import { getDecimals, parseValue } from "../../api/tl-lib";
import { setCommitment } from "../../api/local-storage";
import { populateCommitTx } from "../../utils/tl-swap";

function Step3(props: {
  yourTLAddress: string;
  counterpartyTLAddress: string;
  currencyNetworkAddress: string;
  tlAmount: string;
  ethAmount: string;
  claimPeriodInSec: string;
  yourETHAddress: string;
}) {
  const [appLink, setAppLink] = React.useState("");
  const [shareLink, setShareLink] = React.useState("");

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

      const unsignedCommitTx = await populateCommitTx({
        ...props,
        parsedETHAmount: String(parsedETHAmount),
        parsedTLAmount: String(parsedTLAmount),
        hashedSecret,
      });

      const appLink = `https://link.trustlines.app/sign?from=${unsignedCommitTx.from}&to=${unsignedCommitTx.to}&data=${unsignedCommitTx.data}`;
      setAppLink(appLink);

      const shareLink = `${process.env.PUBLIC_URL}/commit?hashed-secret=${hashedSecret}&eth-address=${props.yourETHAddress}`;
      setShareLink(shareLink);
    })();
  }, []);

  const handleClickCopy = async () => {
    await navigator.clipboard.writeText(shareLink);
  };

  return (
    <>
      {appLink === "" ? (
        <div>Creating QR code...</div>
      ) : (
        <QRCode value={appLink} />
      )}
      <div className="mt-4 text-center">
        Scan the QR code with the TL App to sign and send the commit
        transaction. You also need to share the link below with owner of the TL
        address{" "}
        <span className="font-semibold">{props.counterpartyTLAddress}</span>.
      </div>
      <>
        <div className="text-xs" style={{ wordBreak: "break-word" }}>
          {shareLink}
        </div>
      </>
      <button onClick={handleClickCopy}>Copy Link</button>
    </>
  );
}

export { Step3 };
