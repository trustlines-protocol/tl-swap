import React from "react";
import {Button} from "../button";

import {getCommitment} from "../../api/local-storage";

function Step4(props: {
    yourTLAddress: string;
    counterpartyTLAddress: string;
    currencyNetworkAddress: string;
    tlAmount: string;
    ethAmount: string;
    claimPeriodInSec: string;
    yourETHAddress: string;
    hashedSecret: string,
    txHash: string
}) {
    const {hashedSecret, yourETHAddress} = props
    const [shareLink, setShareLink] = React.useState("");
    const [secret, setSecret] = React.useState("")

    React.useEffect(() => {
        (async () => {
            const localCommitment = await getCommitment(hashedSecret)

            setSecret(localCommitment.secret)


            const shareLink = `${process.env.PUBLIC_URL}/commit/ethToTl?hashed-secret=${hashedSecret}&eth-address=${yourETHAddress}`;
            setShareLink(shareLink);

        })();
    }, [hashedSecret, yourETHAddress]);

    const handleClickCopy = async () => {
        await navigator.clipboard.writeText(shareLink);
    };

    return (
        <>
            <div className="mt-4 text-center break-words" style={{wordBreak: "break-word"}}>
                Write down your secret: <strong>{secret}</strong>. You'll need it when you want to claim your Eth.
            </div>
            <>
                <div className="text-xs" style={{wordBreak: "break-word"}}>
                    The tx was signed. You can give the following link to the counterparty. <br/>
                    {shareLink}
                </div>
            </>
            <Button buttonType="primary" onClick={handleClickCopy} fullWidth>
                Copy Link
            </Button>
        </>
    );
}

export {Step4};
