import React from "react";
import QRCode from "react-qr-code";
import { randomBytes } from "@ethersproject/random";
import { hexlify } from "@ethersproject/bytes";
import { parseEther } from "@ethersproject/units";
import { keccak256 } from "@ethersproject/keccak256";

import { getDecimals, parseValue } from "../../api/tl-lib";
import { setCommitment } from "../../api/local-storage";
import { populateCommitTx } from "../../utils/tl-swap";
import {setDoc, getFirestore, doc, onSnapshot} from "firebase/firestore";
import {ICommitment} from "../../api/types";

async function addCommitmentToDB (hashedSecret: string, commitment: ICommitment) {

  const db = getFirestore();

  try {
    await setDoc(doc(db, "commitments", hashedSecret), {
      ...commitment,
      key: hashedSecret
    });
    console.log("Document written");
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}
function Step3(props: {
  yourTLAddress: string;
  counterpartyTLAddress: string;
  currencyNetworkAddress: string;
  tlAmount: string;
  ethAmount: string;
  claimPeriodInSec: string;
  yourETHAddress: string;
  onTxSigned: (txHash: string, hashedSecret: string) => void
}) {
  const [appLink, setAppLink] = React.useState("");

  React.useEffect(() => {
    (async () => {
      const db = getFirestore();
      const secret = hexlify(randomBytes(32));
      const hashedSecret = keccak256(secret);

      const unsub = onSnapshot(doc(db, "commitments", hashedSecret), (doc) => {
        const data = doc.data()
        if (data && data.txHash) {
          props.onTxSigned(data.txHash, hashedSecret)
        }
      });

      const currencyNetworkDecimals = await getDecimals(
        props.currencyNetworkAddress
      );
      const parsedTLAmount = parseValue(
        props.tlAmount,
        currencyNetworkDecimals.networkDecimals
      );
      const parsedETHAmount = parseEther(props.ethAmount);

      const commitment = {
        ...props,
        hashedSecret,
      }

      setCommitment({
        ...commitment,
        secret,
      });



      await addCommitmentToDB(hashedSecret, {
        EthAmount: parsedETHAmount.toString(),
        TLMoneyAmount: parsedTLAmount.toString(),
        TLNetwork: props.currencyNetworkAddress,
        endTimeStamp: props.claimPeriodInSec,
        initiator: props.yourTLAddress,
        initiatorEthAddress: props.yourETHAddress,
        recipient: props.counterpartyTLAddress,
      })

      const unsignedCommitTx = await populateCommitTx({
        ...props,
        parsedETHAmount: String(parsedETHAmount),
        parsedTLAmount: String(parsedTLAmount),
        hashedSecret,
      });

      const appLink = `https://link.trustlines.app/sign?from=${unsignedCommitTx.from}&to=${unsignedCommitTx.to}&data=${unsignedCommitTx.data}&hashedSecret=${hashedSecret}`;
      setAppLink(appLink);

      return () => unsub()
    })();
  }, [props]);

  return (
    <>
      {appLink === "" ? (
        <div>Creating QR code...</div>
      ) : (
        <QRCode value={appLink} />
      )}
      <div className="mt-4 text-center">
        Scan the QR code with the TL App to sign and send the commit
        transaction.
      </div>
    </>
  );
}

export { Step3 };
