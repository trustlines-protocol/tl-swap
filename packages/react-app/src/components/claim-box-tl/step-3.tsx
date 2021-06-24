import React, {useState} from "react";
import QRCode from "react-qr-code";
import { randomBytes } from "@ethersproject/random";
import { hexlify } from "@ethersproject/bytes";
import { parseEther } from "@ethersproject/units";
import { keccak256 } from "@ethersproject/keccak256";

import {getDecimals, parseValue, relayTransaction} from "../../api/tl-lib";
import { setCommitment } from "../../api/local-storage";
import {generateClaimTx, populateCommitTx} from "../../utils/tl-swap";

function Step3(props: {
  path: Array<string>,
  secret: string,
}) {

  const [appLink, setAppLink] = useState("")

  React.useEffect(() => {
    (async () => {

      console.log('props', {
        path: props.path,
        maxFee: "100000000",
        extraData: "",
        proof: props.secret
      })
      const rawTransaction = await generateClaimTx({
        path: props.path,
        maxFee: "100000000",
        extraData: "",
        proof: props.secret
      })

      console.log('raw transaction', rawTransaction)
      // const transactionHash = await relayTransaction(rawTransaction)

      // console.log('transactionHash', transactionHash)



      const appLink = `https://link.trustlines.app/sign?from=${props.path[0]}&to=${rawTransaction.to}&data=${rawTransaction.data}`;
      setAppLink(appLink);
      // const secret = hexlify(randomBytes(32));
      // const hashedSecret = keccak256(secret);

      // const currencyNetworkDecimals = await getDecimals(
      //     props.currencyNetworkAddress
      // );
      // const parsedTLAmount = parseValue(
      //     props.tlAmount,
      //     currencyNetworkDecimals.networkDecimals
      // );
      // const parsedETHAmount = parseEther(props.ethAmount);
      //
      // setCommitment({
      //   ...props,
      //   secret,
      //   hashedSecret,
      // });
      //
      // const unsignedCommitTx = await populateCommitTx({
      //   ...props,
      //   parsedETHAmount: String(parsedETHAmount),
      //   parsedTLAmount: String(parsedTLAmount),
      //   hashedSecret,
      // });
      //
      // const appLink = `https://link.trustlines.app/sign?from=${unsignedCommitTx.from}&to=${unsignedCommitTx.to}&data=${unsignedCommitTx.data}`;
      // setAppLink(appLink);
      //
      // const shareLink = `${process.env.PUBLIC_URL}/commit?hashed-secret=${hashedSecret}&eth-address=${props.yourETHAddress}`;
      // setShareLink(shareLink);
    })();
  }, []);

  return (
      <div>
        {appLink === "" ? (
            <div>Creating QR code...</div>
        ) : (
            <QRCode value={appLink} />
        )}
      </div>

  )


}

export { Step3 };
